import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { OfferCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
const router = express.Router();

router.post(
  '/create-offered-course',
  ValidateRequest(OfferCourseValidations.CreateOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

export const OfferedCourseRoutes = router;
