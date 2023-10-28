const Router = require('express');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const studentsController = require('../controllers/studentsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/create_student', authMiddleware, studentsController.createStudent);
router.get('/get_all_student', authMiddleware, studentsController.getStudents);
router.get('/get_one_student', authMiddleware, studentsController.getOneStudent);
router.put('/update_student', authMiddleware, studentsController.updateStudent);
router.delete('/delete_student', authMiddleware, studentsController.deleteStudent);

module.exports = router;