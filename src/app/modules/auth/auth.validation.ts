import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required.' }),
    newPassword: z.string({ required_error: 'New password is required.' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is requird.' }),
  }),
});

const forgetPasswprdValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is requird.' }),
  }),
});

const resetPasswprdValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is requird.' }),
    newPassword: z.string({ required_error: 'New Password is requird.' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswprdValidationSchema,
  resetPasswprdValidationSchema,
};
