import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import Auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  Auth('admin', 'superAdmin'),
  ValidateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/',
  Auth('admin', 'faculty', 'student'),
  AcademicSemesterController.getAllAcademicSemester,
);

router.get(
  '/:id',
  Auth('admin', 'faculty', 'student'),
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/:id',
  Auth('admin'),
  ValidateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
