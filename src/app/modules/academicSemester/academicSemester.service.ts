/* eslint-disable @typescript-eslint/no-explicit-any */
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Types;

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    //semester name ==> semester code

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid Semester Code!!!")
    }

    const result = await AcademicSemester.create(payload);

    return result;

}

const getAllAcademicSemesterFromDB = async () =>{
    const result = AcademicSemester.find();
    return result;
}


const getSingleAcademicSemesterFromDB = async (id: string) =>{
    const result = await AcademicSemester.findById(id);
    return result;
}


const updateAcademicSemesterIntoDB = async (id: string , payload: Partial<TAcademicSemester>) => {
    

    if(
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid Semester Code!!!")
    }


    const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload,{new: true} );

    return result;

}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}