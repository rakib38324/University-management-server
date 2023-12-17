import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBulider from '../../builder/QueryBuilder';

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

const getAllSemisterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBulider(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemisterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemisterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

export const SemesterRegistrationServices = {
  createSemisterRegistrationIntoDB,
  getAllSemisterRegistrationFromDB,
  getSingleSemisterRegistrationFromDB,
  updateSemisterRegistrationIntoDB,
};
