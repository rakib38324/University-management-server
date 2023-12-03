import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

//will call controller function

router.get('/', StudentController.getAllStudents);

router.get('/:student_id', StudentController.getSingleStudent);

router.delete('/:student_id', StudentController.deleteStudent);

router.patch('/:student_id', 
ValidateRequest(studentValidation.updateStudentValidationZodSchema),
StudentController.updateStudent);

export const StudentRoutes = router;
