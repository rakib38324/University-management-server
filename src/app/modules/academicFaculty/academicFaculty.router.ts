import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  Auth(USER_ROLE.superAdmin, 'admin'),
  ValidateRequest(
    AcademicFacultyValidation.createAcademicFacultyZodValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/',
  Auth('admin', 'faculty', 'student'),
  AcademicFacultyControllers.getAllAcademicFaculties,
);

router.get(
  '/:facultyId',
  Auth('admin', 'faculty', 'student'),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  '/:facultyId',
  Auth('admin'),
  ValidateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyZodValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
