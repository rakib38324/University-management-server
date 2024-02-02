import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import Auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/create-academic-department',
  Auth('admin', 'superAdmin'),
  ValidateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/',
  Auth('admin', 'faculty', 'student'),
  AcademicDepartmentControllers.getAllAcademicDepartemnts,
);

router.get(
  '/:departmentId',
  Auth('admin', 'faculty', 'student'),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  Auth('admin'),
  ValidateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartemntRoutes = router;
