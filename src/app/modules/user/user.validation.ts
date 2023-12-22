import z from 'zod';
import { userStatus } from './user.constant';

const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must e string',
    })
    .max(30, { message: 'password can not more than 30 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  changeStatusValidationSchema,
};
