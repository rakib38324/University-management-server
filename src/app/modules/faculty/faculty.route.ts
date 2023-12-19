import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/:facultyId',
  Auth('admin', 'faculty'),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:facultyId',
  Auth('admin', 'faculty'),
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:facultyId',
  Auth('admin', 'faculty'),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
