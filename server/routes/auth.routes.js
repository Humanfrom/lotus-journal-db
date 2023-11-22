const Router = require('express');
const {check} = require('express-validator');
const authController = require('../controllers/authController');

const router = new Router();

router.post('/registration', [
    check('login', 'Uncorrect login').isString(),
    check('password', 'Uncorrect password - min: 3 chars, max: 12 chars').isLength({min: 3, max: 12})
], authController.registration)

router.post('/login', authController.login)


module.exports = router;