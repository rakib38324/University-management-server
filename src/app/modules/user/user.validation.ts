import z from 'zod'

const UserValidationSchema = z.object({
    password: z
    .string({
        invalid_type_error: "Password must e string"
    })
    .max(30,{message: "password can not more than 30 characters"})
    .optional(),

});


export const UserValidation = {
    UserValidationSchema
}