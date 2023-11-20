import { z } from 'zod';

const userNameValidationZodSchema = z.object({
  firstName: z.string().min(1).max(20),

  middleName: z.string().max(20).optional(),

  lastName: z.string().min(1).max(20),
});

const guardianValidationZodSchema = z.object({
  fatherName: z.string().min(1).max(50),

  fatherContactNum: z.string().min(1),

  fatherOccupation: z.string().min(1),

  motherName: z.string().min(1).max(50),

  motherContactNum: z.string().min(1),

  motherOccupation: z.string().min(1),
});

const localGuardianValidationZodSchema = z.object({
  relation: z.string().min(1),

  name: z.string().min(1).max(50),

  contactNum: z.string().min(1),

  occupation: z.string().min(1),

  address: z.string().min(1).max(200),
});

const studentValidationZodSchema = z.object({
  id: z.string(),

  password: z.string().max(20),

  name: userNameValidationZodSchema,

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

  guardian: guardianValidationZodSchema,

  localGuardian: localGuardianValidationZodSchema,

  profileImage: z.string().optional(),

  isActive: z.enum(['active', 'blocked']).default('active'),

  isDeleted: z.boolean(),
});

export default studentValidationZodSchema;
