import { z } from 'zod'
const createAcademicDepartmentZodValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be string.",
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic Department must be string." ,
            required_error: "Academic Department is required" 
        })
    })
});


const UpdateAcademicDepartmentZodValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be string.",
            required_error: "Name is required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Department must be string." ,
            required_error: "Academic Department is required" 
        }).optional()
    })
});

export const AcademicDepartmentValidation = {
    createAcademicDepartmentZodValidationSchema,
    UpdateAcademicDepartmentZodValidationSchema
}