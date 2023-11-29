import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utilis";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // if (await Student.isUserExists(studentData.id)) {
    //   throw new Error('User already exists!!!!!!');
    // }


    //------> create a user object
    const userData: Partial<TUser> = {};

    //------> if password can not given, use default password
    userData.password = password || (config.default_password as string);


    //------> set student role
    userData.role = 'student';



    //----> find academic semester info
    const admissionSmester = await AcademicSemester.findById(payload.admissionSemester)


    if (admissionSmester) {
        //------> set generate id
        userData.id = await generateStudentId(admissionSmester)
    }

    //-----> create a user
    const result = await User.create(userData); //built instatic method

    //-----> create a student
    if (Object.keys(result).length) {
        //----> set id, _id as user
        payload.id = result.id;
        payload.user = result._id //reference id

        const newStudent = await Student.create(payload);
        return newStudent;
    }


    // const student = new Student(studentData); // create an instance

    // if(await  student.isUserExists(studentData.id)){
    //     throw new Error("User already exists!!!");

    // }

    // const result = await student.save() //built in instrance method from mongoose
};

export const UserServices = {
    createStudentIntoDB
}