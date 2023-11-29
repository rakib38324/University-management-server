import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne({
        role: 'student'
    },
        {
            id: 1,
            _id: 0,
        }
    )
        .sort({
            createdAt: -1
        })
        .lean();

    return lastStudent?.id ? lastStudent.id : undefined
}



//-----> ganerate student id
export const generateStudentId = async (payload: TAcademicSemester) => {

    //first time 000
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentyear = payload.year;

    if (
        lastStudentId &&
        currentSemesterCode === lastStudentSemesterCode &&
        lastStudentYear === currentyear
    ) {
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
}