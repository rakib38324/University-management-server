import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req, res) => {

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

    //--->sent responce
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student Created Successfully",
        data: result
    });

});


export const UserController = {
    createStudent
}