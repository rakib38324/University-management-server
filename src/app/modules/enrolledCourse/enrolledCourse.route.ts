import express from 'express';
import Auth from '../../middlwares/auth';
import ValidateRequest from '../../middlwares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validaton';
import { EnrolledCourseControllers } from './enrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  Auth('student'),
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  Auth('faculty'),
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
