import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password.');
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

export const AuthServices = {
  loginUser,
};
