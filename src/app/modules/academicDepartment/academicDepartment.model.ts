import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      require: [true, 'name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const departmentExist = await AcademicDepartment.findOne({ name: this.name });
  if (departmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Department is already exist!',
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isdepartmentExist = await AcademicDepartment.findOne(query);
  if (!isdepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Department does not exist!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
