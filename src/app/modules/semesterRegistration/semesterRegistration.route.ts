import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import {
  SemesterRegistrationValidations,
  createSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  ValidateRequest(createSemesterRegistrationValidationSchema),
  semesterRegistrationControllers.createSemesterRegistration,
);
router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationControllers.getSignleSemesterRegistration,
);

router.patch(
  '/:id',
  ValidateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRouters = router;
