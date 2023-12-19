import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import Auth from '../../middlwares/auth';

const router = express.Router();

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:facultyId',
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:facultyId', FacultyControllers.deleteFaculty);

router.get('/', Auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
