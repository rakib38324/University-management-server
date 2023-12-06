import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExistis = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExistis) {
    throw new AppError(httpStatus.FOUND, 'Semester is already existis!!!');
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
