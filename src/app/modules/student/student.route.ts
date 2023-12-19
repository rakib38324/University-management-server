import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';
import Auth from '../../middlwares/auth';

const router = express.Router();

//will call controller function

router.get('/', Auth('admin', 'student'), StudentController.getAllStudents);

router.get(
  '/:id',
  Auth('admin', 'student'),
  StudentController.getSingleStudent,
);

router.delete(
  '/:id',
  Auth('admin', 'student'),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  Auth('admin', 'student'),
  ValidateRequest(studentValidation.updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
