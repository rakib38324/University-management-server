import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBulider from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemisterRegistrationIntoDB = async (
  payload: TsemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //====> check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcmingOrOngingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });

  if (isThereAnyUpcmingOrOngingSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `There is already an ${isThereAnyUpcmingOrOngingSemester.status} register semeter!`,
    );
  }

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

const updateSemisterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TsemesterRegistration>,
) => {
  //====> check if the requested registerd semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!');
  }

  //===> if the requested semester registration is ended, we will not update anything
  const currentSemeterStatus = isSemesterRegistrationExists.status;
  const requestedStastus = payload.status;

  //=====> ENDED --> UPCOMING/ONGOING  ====>   NOT POSSIBLE
  if (currentSemeterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemeterStatus}.`,
    );
  }

  //=====> UPCOMING  --> ENDED ====>   NOT POSSIBLE
  if (
    currentSemeterStatus === RegistrationStatus.UPCOMING &&
    requestedStastus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemeterStatus} to ${requestedStastus}`,
    );
  }

  //=====>  ONGOING --> UPCOMING  ====>   NOT POSSIBLE
  if (
    currentSemeterStatus === RegistrationStatus.ONGOING &&
    requestedStastus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemeterStatus} to ${requestedStastus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemisterRegistrationIntoDB,
  getAllSemisterRegistrationFromDB,
  getSingleSemisterRegistrationFromDB,
  updateSemisterRegistrationIntoDB,
};
