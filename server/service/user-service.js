const UserModel = require('../models/user-model.js');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dto.js');
const ApiError = require('../exceptions/api-error.js');
const userModel = require('../models/user-model.js');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} has been registred`)
        }
        const hashPass = await bcryptjs.hash(password, 7)
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPass, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`).catch(console.error)
        
        const userDto = new UserDto(user);  // id, email, isActivated
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest('not user');
        }
        user.isActivated = true;
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.BadRequest('NOT any users')
        }
        const isPassEquats = await bcryptjs.compare(password, user.password);
        if(!isPassEquats) {
            throw ApiError.BadRequest('Password is wrong')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async getUsers() {
        const users = await userModel.find()
        return users;
    }
}

module.exports = new UserService