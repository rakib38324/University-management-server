import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { OfferCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import Auth from '../../middlwares/auth';
const router = express.Router();

router.get(
  '/',
  Auth('admin', 'faculty', 'student', 'superAdmin'),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/my-offered-courses',
  Auth('student'),
  OfferedCourseControllers.getMyOfferedCourses,
);

router.get(
  '/:id',
  Auth('admin', 'faculty', 'student', 'superAdmin'),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  Auth('admin', 'superAdmin'),
  ValidateRequest(OfferCourseValidations.CreateOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  Auth('admin', 'superAdmin'),
  ValidateRequest(OfferCourseValidations.UpdateOfferCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  Auth('admin', 'superAdmin'),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
