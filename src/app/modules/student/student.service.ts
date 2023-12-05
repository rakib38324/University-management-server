/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBulider from '../../builder/QueryBuilder';
import { studentsSearchableFields } from './students.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }// copoy


  // const studentsSearchableFields = ['email', 'id', 'name.firstName', 'name.lastName', 'presentAddress']
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentsSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   }))
  // })

  // //--> filtering
  // const excludeFileds = ['searchTerm', 'sort', 'limit','page','fields'];

  // excludeFileds.forEach((el) => delete queryObj[el]);
  // // console.log({ query, queryObj })


  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });


  // let sort = '-createAt'
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);


  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if(query?.limit){
  //   limit = Number(query.limit);
  // }

  // if(query?.page){
  //   page = Number(query.page);
  //   skip = (page-1)*limit;
  // }

  // const paginateQuery = sortQuery.skip(skip)


  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ');
  // }


  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  const studentQuery = new QueryBulider(Student.find()
    .populate("admissionSemester")
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }), query)
    .search(studentsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery

  return result;
};

const getSingleStudentFromDB = async (id: string) => {

  if (await Student.isUserExists(id)) {
    const result = await Student.findOne({ id: id })
      .populate("admissionSemester")
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });

    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
};

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();
  try {

    session.startTransaction();
    if (await Student.isUserExists(id)) {


      const deletedStudent = await Student.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session }
      );

      if (!deletedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
      }

      const deletedUser = await User.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session }
      )

      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user!");
      }

      await session.commitTransaction();
      await session.endSession();

      return deletedStudent;
    }
    else {
      throw new AppError(httpStatus.NOT_FOUND, "User not Exists!");
    }

  } catch (error: any) {

    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }


};


const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

  if (await Student.isUserExists(id)) {

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData, };

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }

    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value;
      }
    }



    const result = await Student.findOneAndUpdate(
      { id },
      modifiedUpdatedData,
      { new: true, runValidators: true }
    )

    return result;

  }
  else {
    throw new AppError(httpStatus.NOT_FOUND, "User not Exists!");
  }


};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB
};
