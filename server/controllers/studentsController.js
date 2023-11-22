const Student = require("../models/Student");
const md5 = require("md5");

const {validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

class studentsController {
    async createStudent(req, res) {
        console.log('try_to_create');
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
            
            const { data } = req.body;
            const { first_name, last_name, birthday } = data;
            const studentHash = md5(first_name + last_name + birthday);

            const isExist = await Student.findOne({hash: studentHash});
            if(isExist){
                return res.status(400).json({message: `Ученик ${first_name} ${last_name} с этими данными уже существует`})
            }

            const student = new Student({...data, hash: studentHash});

            await student.save()
            return res.json(student)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getOneStudent(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
            
            const {studentHash} = req.query;
            const student = await Student.findOne({hash: studentHash});
            
            if(!student){
                return res.status(400).json({message: `Ученик не найден`})
            }
            
            return res.json(student)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getStudents(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
            
            const { field, value, limit } = req.query;
            let data = {};
            if(field && value){
                data[field] = value;
            }
            const students = limit ? await Student.find(data).limit(limit) : await Student.find(data);
            
            
            if(!students){
                return res.status(400).json({message: `Отсутствуют ученики по Вашему запросу`})
            }
            
            return res.json(students)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async updateStudent(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
            
            const { studentHash, data } = req.body;
            const student = await Student.updateOne({ hash: studentHash }, { $set: { ...data } });
            if(!student.modifiedCount){
                return res.status(400).json({message: `Ученик не найден`})
            }
            
            return res.json(student)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async deleteStudent(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: `Некорректный запрос`, errors})
            }
            
            const { studentHash } = req.body;
            const student = await Student.deleteOne({ hash: studentHash });
            if(!student.deletedCount){
                return res.status(400).json({ message: `Не удалось удалить` })
            }
            
            return res.json(student)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }


}

module.exports = new studentsController()