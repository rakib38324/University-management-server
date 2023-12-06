/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TGender = 'Male' | 'Female' | 'Other';
export type TBloodgroup =
  | 'A+'
  | 'B+'
  | 'AB+'
  | 'O+'
  | 'A-'
  | 'B-'
  | 'AB-'
  | 'O-';
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodgroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
}
