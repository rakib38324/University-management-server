import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";



const createAcademicSemester = catchAsync(async (req, res) => {

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)

    //--->sent responce
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is Created Successfully",
        data: result
    });

});

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

    //===>sent responce
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semesters Data Fetched Successfully",
        data: result
    })
});

// const getSingleAcademicSemester = catchAsync(async (req, res) => {
//     const _id = req.params;

//     const result = AcademicSemesterServices.getSingleAcademicSemesterFromDB(_id)
//     //--->sent responce
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Semester Single Data Found Successfully",
//         data: result
//     })
// })


export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    // getSingleAcademicSemester
}