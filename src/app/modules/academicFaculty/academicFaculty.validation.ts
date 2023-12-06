import { z } from 'zod';
const createAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string.',
    }),
  }),
});

const UpdateAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string.',
    }),
  }),
});
export const AcademicFacultyValidation = {
  createAcademicFacultyZodValidationSchema,
  UpdateAcademicFacultyZodValidationSchema,
};
