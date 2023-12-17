import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

  //--->sent responce
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is Created Successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
};
