import { z } from 'zod';

const createUserNameValidationZodSchema = z.object({
  firstName: z.string().min(1).max(20),

  middleName: z.string().max(20).optional(),

  lastName: z.string().min(1).max(20),
});

const createGuardianValidationZodSchema = z.object({
  fatherName: z.string().min(1).max(50),

  fatherContactNum: z.string().min(1),

  fatherOccupation: z.string().min(1),

  motherName: z.string().min(1).max(50),

  motherContactNum: z.string().min(1),

  motherOccupation: z.string().min(1),
});

const createLocalGuardianValidationZodSchema = z.object({
  relation: z.string().min(1),

  name: z.string().min(1).max(50),

  contactNum: z.string().min(1),

  occupation: z.string().min(1),

  address: z.string().min(1).max(200),
});

const createStudentValidationZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),

    student: z.object({
      name: createUserNameValidationZodSchema,

      gender: z.enum(['Male', 'Female', 'Other']),

      dateOfBirth: z.string().optional(),

      email: z.string().email(),

      contactNum: z.string().min(1),

      emergencyContactNum: z.string().min(1),

      bloodGroup: z
        .enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'])
        .optional(),

      presentAddress: z.string().min(1),

      permanentAddress: z.string().min(1),

      guardian: createGuardianValidationZodSchema,

      localGuardian: createLocalGuardianValidationZodSchema,

      admissionSemester: z.string(),
      academicDepartment: z.string(),

      profileImage: z.string().optional(),
    })

  })
});




const updateUserNameValidationZodSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),

  middleName: z.string().max(20).optional().optional(),

  lastName: z.string().min(1).max(20).optional(),
}).optional();

const updateGuardianValidationZodSchema = z.object({
  fatherName: z.string().min(1).max(50).optional(),

  fatherContactNum: z.string().min(1).optional(),

  fatherOccupation: z.string().min(1).optional(),

  motherName: z.string().min(1).max(50).optional(),

  motherContactNum: z.string().min(1).optional(),

  motherOccupation: z.string().min(1).optional(),
}).optional();

const updateLocalGuardianValidationZodSchema = z.object({
  relation: z.string().min(1).optional(),

  name: z.string().min(1).max(50).optional(),

  contactNum: z.string().min(1).optional(),

  occupation: z.string().min(1).optional(),

  address: z.string().min(1).max(200).optional(),
}).optional();

const updateStudentValidationZodSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),

    student: z.object({
      name: updateUserNameValidationZodSchema,

      gender: z.enum(['Male', 'Female', 'Other']).optional(),

      dateOfBirth: z.string().optional(),

      email: z.string().email().optional(),

      contactNum: z.string().min(1).optional(),

      emergencyContactNum: z.string().min(1).optional(),

      bloodGroup: z
        .enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'])
        .optional(),

      presentAddress: z.string().min(1).optional(),

      permanentAddress: z.string().min(1).optional(),

      guardian: updateGuardianValidationZodSchema,

      localGuardian: updateLocalGuardianValidationZodSchema,

      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),

      profileImage: z.string().optional(),
    })

  })
});

export const studentValidation = {
 createStudentValidationZodSchema,
 updateStudentValidationZodSchema
};
