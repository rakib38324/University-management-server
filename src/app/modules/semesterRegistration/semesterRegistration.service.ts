import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemisterRegistrationIntoDB = async (
  payload: TsemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //===> checkif the semester is exist

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not found!',
    );
  }

  //==> check if the semester is akready registred
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester already registred!!',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

export const SemesterRegistrationServices = {
  createSemisterRegistrationIntoDB,
};
