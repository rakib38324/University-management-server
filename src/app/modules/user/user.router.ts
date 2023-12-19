import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  Auth(USER_ROLE.admin),
  ValidateRequest(createStudentValidationZodSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  Auth(USER_ROLE.admin),
  ValidateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // Auth(USER_ROLE.admin),
  ValidateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

export const User_Routers = router;
