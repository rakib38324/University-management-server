import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { createSemesterRegistrationValidationSchema } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  ValidateRequest(createSemesterRegistrationValidationSchema),
  semesterRegistrationControllers.createSemesterRegistration,
);

export const SemesterRouters = router;
