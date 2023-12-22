import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  Auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createStudentValidationZodSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  Auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // Auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

router.get(
  '/me',
  Auth(USER_ROLE.admin, 'student', 'faculty'),
  UserController.getMe,
);

router.post(
  '/change-status/:id',
  Auth(USER_ROLE.admin),
  ValidateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const User_Routers = router;
