import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', CourseControllers.deleteCourse);

router.patch(
  '/:id',
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
