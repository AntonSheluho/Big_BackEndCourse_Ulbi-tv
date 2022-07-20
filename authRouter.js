const Router = require('express');
const controller = require('./authController.js')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware.js');
const roleMiddleware = require('./middleware/roleMiddleware.js');

const router = new Router();

router.post('/registration', [
    check('username', 'Input username has not be empty').notEmpty(),
    check('password', 'Password has be biger 4 numbers and less 10 numbers').isLength({max: 10, min: 4})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router