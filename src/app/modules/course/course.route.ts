import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import Auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  Auth(USER_ROLE.admin, 'superAdmin'),
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/',
  Auth('admin', 'faculty', 'student', 'superAdmin'),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  Auth('admin', 'faculty', 'student', 'superAdmin'),
  CourseControllers.getSingleCourse,
);

router.delete(
  '/:id',
  Auth('admin', 'superAdmin'),
  CourseControllers.deleteCourse,
);

router.patch(
  '/:id',
  Auth('admin', 'superAdmin'),
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  Auth('admin', 'superAdmin'),
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  Auth('admin', 'superAdmin', 'faculty', 'student'),
  CourseControllers.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  Auth('admin', 'superAdmin'),
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
