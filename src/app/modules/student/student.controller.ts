import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationJoiSchema from './student.validation';

import studentValidationZodSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //===================validation with Zod========================

    const zodParsedData = studentValidationZodSchema.parse(studentData);

    //========================== validation with joi ======================
    //call joi
    //data validation using Joi
    // const { error, value } = studentValidationJoiSchema.validate(studentData);

    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    //sent responce
    res.status(200).json({
      success: true,
      message: 'student data found successfully',
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

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(student_id);

    //sent responce
    res.status(200).json({
      success: true,
      message: 'student single data found successfully',
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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(student_id);

    //sent responce
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
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

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
