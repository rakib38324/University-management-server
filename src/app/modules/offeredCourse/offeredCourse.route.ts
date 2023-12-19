import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { OfferCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import Auth from '../../middlwares/auth';
const router = express.Router();

router.get(
  '/',
  Auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/:id',
  Auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  Auth('admin'),
  ValidateRequest(OfferCourseValidations.CreateOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  Auth('admin'),
  ValidateRequest(OfferCourseValidations.UpdateOfferCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  Auth('admin'),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
