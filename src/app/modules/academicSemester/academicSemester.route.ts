import express from 'express';
import ValidateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';


const router = express.Router();


router.post(
    '/create-academic-semester',
    ValidateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemester);

// router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)


export const AcademicSemesterRoutes = router;
