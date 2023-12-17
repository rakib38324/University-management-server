import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferCourse } from './offeredCourse.interface';
import { OfferCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //====> if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found!!',
    );
  }

  //====> if the semester registration exists, then we find the academic semester id is exists
  const isAcademicSemester = isSemesterRegistrationExists.academicSemester;

  //====> if the academic DEPARTMENT id is exists
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found!!',
    );
  }

  //====> if the academic faculty id is exists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found!!');
  }

  //====> if the course id is exists
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!!');
  }

  //====> if the faculty id is exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!!');
  }

  const result = await OfferCourse.create({ ...payload, isAcademicSemester });

  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
