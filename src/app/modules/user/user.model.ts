import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";


const User_Schema = new Schema<TUser>({
    id: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    needsPasswordChange:{
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum:['admin' , 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
},
{
    timestamps: true,
}
);


export const User = model<TUser>('User', User_Schema);