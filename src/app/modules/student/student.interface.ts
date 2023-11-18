// import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNum: string;
  motherName: string;
  motherOccupation: string;
  motherContactNum: string;
};

export type LocalGuardian = {
  relation: string;
  name: string;
  occupation: string;
  contactNum: string;
  address: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  contactNum: string;
  emergencyContactNum: string;
  email: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
