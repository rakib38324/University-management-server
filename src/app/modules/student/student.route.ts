import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

//will call controller function
router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);

router.get('/:student_id', StudentController.getSingleStudent);

router.delete('/:student_id', StudentController.deleteStudent);

export const StudentRoutes = router;
