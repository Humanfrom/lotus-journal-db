const Router = require('express');
const studentsController = require('../controllers/studentsController');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post('/create_student', authMiddleware, studentsController.createStudent);
router.get('/get_all_students', authMiddleware, studentsController.getStudents);
router.get('/get_one_student', authMiddleware, studentsController.getOneStudent);
router.put('/update_student', authMiddleware, studentsController.updateStudent);
router.delete('/delete_student', authMiddleware, studentsController.deleteStudent);

module.exports = router;