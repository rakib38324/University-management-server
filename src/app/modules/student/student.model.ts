import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters.'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize formet',
    // }
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name can not be more than 20 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last name can not be more than 20 characters.'],
    // validate:{
    //   validator: (value: string)=> validator.isAlpha(value),
    //   message: '{VALUE} is not valid'
    // }
  },
});

const userGardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.'],
  },
  fatherContactNum: {
    type: String,
    required: [true, 'Father Contact number is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.'],
  },
  motherContactNum: {
    type: String,
    required: [true, 'Mother Contact number is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
});

const userLocalGardianSchema = new Schema<TLocalGuardian>({
  relation: {
    type: String,
    required: [true, 'Relation is required'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.'],
  },
  contactNum: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address can not be more than 200 characters.'],
  },
});

// Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: true,
    },

    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message:
          '{VALUE} is not valid. The gender fild can only be one of the following: Male or Female or Other.',
      },
      required: true,
    },

    dateOfBirth: { type: Date },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    contactNum: {
      type: String,
      required: true,
    },
    emergencyContactNum: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
    },

    presentAddress: {
      type: String,
      required: true,
    },

    permanentAddress: {
      type: String,
      required: true,
    },

    guardian: {
      type: userGardianSchema,
      required: true,
    },

    localGuardian: {
      type: userLocalGardianSchema,
      required: true,
    },

    profileImage: { type: String, default: '' },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },

    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//==================== virtual============
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

studentSchema.pre('findOne', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } });

  next();
});

//=========== query meddleware==================
studentSchema.pre('find', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//======================= creating a custom static method ======================
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findById({ _id: id });

  return existingUser;
};

//====================== creating a custom instance method ===================
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id: id});

//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
