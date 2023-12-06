import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  ValidateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartemnts);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  ValidateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartemntRoutes = router;
