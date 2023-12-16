import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

//will call controller function

router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getSingleStudent);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  ValidateRequest(studentValidation.updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
