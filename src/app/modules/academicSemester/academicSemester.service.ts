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


// const getSingleAcademicSemesterFromDB = async (id: any) =>{
//     const _id = toString(id)
//     const objectId = new ObjectId(id);

//     console.log("ObjwctId:",objectId)
//     const result = await AcademicSemester.findById(objectId);
//     console.log("result:",result)
//     return result;
// }


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    // getSingleAcademicSemesterFromDB
}