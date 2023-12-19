import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import {
  SemesterRegistrationValidations,
  createSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import Auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  Auth('admin'),
  ValidateRequest(createSemesterRegistrationValidationSchema),
  semesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/',
  Auth('admin'),
  semesterRegistrationControllers.getAllSemesterRegistration,
);
router.get(
  '/:id',
  Auth('admin'),
  semesterRegistrationControllers.getSignleSemesterRegistration,
);

router.patch(
  '/:id',
  Auth('admin'),
  ValidateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRouters = router;
