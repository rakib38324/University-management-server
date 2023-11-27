import express from 'express';
import { UserController } from './user.controller';
import { studentValidation } from '../student/student.validation';
import ValidateRequest from '../../middlwares/validateRequest';

const router = express.Router();


router.post(
    '/create-student',
    ValidateRequest(studentValidation.createStudentValidationZodSchema),
    UserController.createStudent
);


export const User_Routers = router;
