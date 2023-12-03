/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utilis";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {




    //------> create a user object
    const userData: Partial<TUser> = {};

    //------> if password can not given, use default password
    userData.password = password || (config.default_password as string);


    //------> set student role
    userData.role = 'student';



    //----> find academic semester info
    const admissionSmester = await AcademicSemester.findById(payload.admissionSemester)


    const session = await mongoose.startSession()

    try {
        session.startTransaction();

        if (admissionSmester) {
            //------> set generate id
            userData.id = await generateStudentId(admissionSmester)
        }

        //-----> create a user (transaction-1)
        const newUser = await User.create([userData], { session }); //array

        //-----> create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
        }
        //----> set id, _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id //reference id

        //-----> create a student (transaction-2)
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent[0];


    } catch (error:any) {
        // console.log(error);
        throw new AppError(httpStatus.NOT_IMPLEMENTED, error.message)
        await session.abortTransaction();
        await session.endSession();
    }





};

export const UserServices = {
    createStudentIntoDB
}