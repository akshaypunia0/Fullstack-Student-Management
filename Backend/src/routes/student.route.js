import express from 'express';
import { addStudent, getAllStudents, getStudentByEmail, deleteStudent, updateStudent } from '../controllers/student.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', userAuth, addStudent);
router.get('/all', userAuth, getAllStudents);
router.post('/search', userAuth, getStudentByEmail);
router.delete('/delete/:id', userAuth, deleteStudent);
router.patch('/update/:id', userAuth, updateStudent);

export default router;