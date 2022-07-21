const UserModel = require('../models/user-model.js');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dto.js');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`User with email ${email} has been registred`)
        }
        const hashPass = await bcryptjs.hash(password, 7)
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPass, activationLink})
        await mailService.sendActivationMail(email, activationLink)
        
        const userDto = new UserDto(user);  // id, email, isActivated
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService