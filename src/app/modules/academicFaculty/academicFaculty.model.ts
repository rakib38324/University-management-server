import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./adademicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        require: [true,"Name is required"],
        unique: true,
    }
},
{
    timestamps: true,
});

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);

