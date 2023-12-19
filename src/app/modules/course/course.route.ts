import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  Auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/',
  Auth('admin', 'faculty', 'student'),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  Auth('admin', 'faculty', 'student'),
  CourseControllers.getSingleCourse,
);

router.delete('/:id', Auth('admin'), CourseControllers.deleteCourse);

router.patch(
  '/:id',
  Auth('admin'),
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  Auth('admin'),
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  Auth('admin'),
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
