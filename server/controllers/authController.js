const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken')

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
    
            const {login, password} = req.body;
    
            const candidate = await User.findOne({login});

            if(candidate){
                return res.status(400).json({message: `Пользователь с логином ${login} уже существует`})
            }
    
            const hashPassword = await bcrypt.hash(password, 7);
            console.log("hashPassword", hashPassword);
            const user = new User({login, password: hashPassword}); 
            console.log("user", user);
    
            await user.save()
            return res.json({message: `Пользователь создан`})
        } catch (e) {
            console.log("error", e);
        }
    }

    async login (req, res) {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({login})
            if(!user) {
                return res.status(404).json({ message: "Пользователь не найден"})
            }
    
            const isPassValid = bcrypt.compareSync(password, user.password);
            if(!isPassValid){
                return res.status(400).json({ message: "Неверный пароль"})
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
    }

}