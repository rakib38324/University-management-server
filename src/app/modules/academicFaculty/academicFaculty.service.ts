import { AcademicFaculty } from "./academicFaculty.model";
import { TAcademicFaculty } from "./adademicFaculty.interface";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;

}

const getAllAcademicFacultiesFromDB = async () =>{
    const result = AcademicFaculty.find();
    return result;
}


const getSingleAcademicFacultyFromDB = async (id: string) =>{
    const result = await AcademicFaculty.findById(id);
    return result;
}


const updateAcademicFacultyIntoDB = async (id: string , payload: Partial<TAcademicFaculty>) => {

    const result = await AcademicFaculty.findByIdAndUpdate(id, payload,{new: true} );

    return result;

}


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}