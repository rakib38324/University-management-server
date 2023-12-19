import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  ValidateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  ValidateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRouters = router;
