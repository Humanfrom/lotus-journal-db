const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken')


const router = new Router();

router.post('/registration', [
    check('login', 'Uncorrect login').isString(),
    check('password', 'Uncorrect password - min: 3 chars, max: 12 chars').isLength({min: 3, max: 12})
], 
async (req, res) => {
    console.log("req");
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: `Uncorrect request`, errors})
        }

        const {login, password} = req.body;

        const candidate = await User.findOne({login});
        console.log("candidate", candidate);

        if(candidate){
            return res.status(400).json({message: `User with login ${login} is already exist`})
        }

        const hashPassword = await bcrypt.hash(password, 7);
        console.log("hashPassword", hashPassword);
        const user = new User({login, password: hashPassword}); 
        console.log("user", user);

        await user.save()
        return res.json({message: `User was created`})
    } catch (e) {
        console.log("error", e);
    }
})

router.post('/login',
async (req, res) => {
    try {
        const {login, password} = req.body;
        const user = await User.findOne({login})
        if(!user) {
            return res.status(404).json({ message: "User not found"})
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if(!isPassValid){
            return res.status(400).json({ message: "Invalid password"})
        }

        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                login: user.login,
                info: user.info || "",    
            }
        })
    } catch (e) {
        console.log("error", e);
    }
})


module.exports = router;