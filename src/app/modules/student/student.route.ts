import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';
import Auth from '../../middlwares/auth';

const router = express.Router();

//will call controller function

router.get('/', Auth('admin', 'faculty'), StudentController.getAllStudents);

router.get(
  '/:id',
  Auth('admin', 'faculty'),
  StudentController.getSingleStudent,
);

router.delete(
  '/:id',
  Auth('admin', 'faculty'),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  Auth('admin', 'faculty'),
  ValidateRequest(studentValidation.updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
