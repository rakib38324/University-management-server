import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  //===================validation with Zod========================

  //   const zodParsedData = studentValidationZodSchema.parse(studentData);

  //========================== validation with joi ======================
  //call joi
  //data validation using Joi
  // const { error, value } = studentValidationJoiSchema.validate(studentData);

  //will call service function to send this data
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );

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
    message: 'Student Created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${role} is retrived succesfully`,
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Status is updated succesfully`,
    data: result,
  });
});

export const UserController = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
  changeStatus,
};
