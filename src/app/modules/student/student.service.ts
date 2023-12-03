/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
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
