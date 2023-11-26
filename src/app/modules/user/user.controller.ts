/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;

        //===================validation with Zod========================

        //   const zodParsedData = studentValidationZodSchema.parse(studentData);

        //========================== validation with joi ======================
        //call joi
        //data validation using Joi
        // const { error, value } = studentValidationJoiSchema.validate(studentData);

        //will call service function to send this data
        const result = await UserServices.createStudentIntoDB(password, studentData);

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something went wrong',
        //         error: error.details,
        //     });
        // }

        // console.log({error})
        // console.log({value})

        //sent responce
        res.status(200).json({
            success: true,
            message: 'student is created successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
};


export const UserController = {
    createStudent
}