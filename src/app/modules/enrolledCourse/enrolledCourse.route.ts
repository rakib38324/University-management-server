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

router.get(
  '/my-enrolled-courses',
  Auth('student'),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  Auth('faculty', 'admin', 'superAdmin'),
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
