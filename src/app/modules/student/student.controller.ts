import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res) => {
  // console.log(req.query)

  const result = await StudentServices.getAllStudentFromDB(req.query);

  //===>sent responce
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Data Found Successfully",
    data: result
  })

});

const getSingleStudent = catchAsync(async (req, res) => {

  const { student_id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(student_id);

  //--->sent responce
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Single Data Found Successfully",
    data: result
  })
});

const deleteStudent = catchAsync(async (req, res) => {

  const { student_id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(student_id);

  //--> sent responce
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student deleted successfully",
    data: result
  })
});



const updateStudent = catchAsync(async (req, res) => {

  const { student_id } = req.params;
  const{ student} = req.body;
  const result = await StudentServices.updateStudentFromDB(student_id, student);

  //--> sent responce
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student Updated successfully",
    data: result
  })
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
