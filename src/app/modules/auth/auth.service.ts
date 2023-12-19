import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //===>check if the user is exists

  const isUserExists = await User.isUserExistsByCustomId(payload.id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
  }

  //===>check if the user is already deleted
  const isUserDeleted = isUserExists?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  //===>check if the user is blocked
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked!');
  }

  ///====> checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    isUserExists?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not match!!');
  }

  //-====> access granted: send accessToken, RefreshToken
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  //===========> create token and sent to the client
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: isUserExists.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //===>check if the user is exists

  const isUserExists = await User.isUserExistsByCustomId(userData.userId);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
  }

  //===>check if the user is already deleted
  const isUserDeleted = isUserExists?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  //===>check if the user is blocked
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked!');
  }

  ///====> checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.oldPassword,
    isUserExists?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not match!!');
  }

  ///===> hash new password
  const newHasedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHasedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};
export const AuthServices = {
  loginUser,
  changePassword,
};
