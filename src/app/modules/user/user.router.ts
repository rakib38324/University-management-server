import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  ValidateRequest(createStudentValidationZodSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  ValidateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  ValidateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

export const User_Routers = router;
