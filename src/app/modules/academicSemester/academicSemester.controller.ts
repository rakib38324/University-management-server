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

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)
    //--->sent responce
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Single SemesterData Found Successfully",
        data: result
    })
})


const updateAcademicSemester = catchAsync(async (req, res) => {

    const {id} = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(id, req.body)

    //--->sent responce
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is Updated Successfully",
        data: result
    });

});

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}