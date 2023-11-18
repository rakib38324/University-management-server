import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userGardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContactNum: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherContactNum: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});

const userLocalGardianSchema = new Schema<LocalGuardian>({
  relation: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNum: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },

  name: userNameSchema,

  gender: ['Male', 'Female', 'Other'],

  dateOfBirth: { type: String },

  email: {
    type: String,
    required: true,
  },

  contactNum: {
    type: String,
    required: true,
  },
  emergencyContactNum: {
    type: String,
    required: true,
  },

  bloodGroup: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],

  presentAddress: {
    type: String,
    required: true,
  },

  permanentAddress: {
    type: String,
    required: true,
  },

  guardian: userGardianSchema,

  localGuardian: userLocalGardianSchema,

  profileImage: { type: String },

  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
