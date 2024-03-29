import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';
import Auth from '../../middlwares/auth';

const router = express.Router();

//will call controller function

router.get(
  '/',
  Auth('superAdmin', 'admin', 'faculty'),
  StudentController.getAllStudents,
);

router.get(
  '/:id',
  Auth('superAdmin', 'admin', 'faculty'),
  StudentController.getSingleStudent,
);

router.delete(
  '/:id',
  Auth('superAdmin', 'admin', 'faculty'),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  Auth('superAdmin', 'admin', 'faculty'),
  ValidateRequest(studentValidation.updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
