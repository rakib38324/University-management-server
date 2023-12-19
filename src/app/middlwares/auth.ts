import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const Auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(
    async (req: Request, response: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      // invalid token - synchronous
      //===> check the if the token valid

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId, iat } = decoded;

      //===>check if the user is exists

      const isUserExists = await User.isUserExistsByCustomId(userId);

      if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
      }

      //===>check if the user is already deleted
      const isUserDeleted = isUserExists?.isDeleted;

      if (isUserDeleted) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'This user is already deleted!',
        );
      }

      //===>check if the user is blocked
      const userStatus = isUserExists?.status;

      if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked!');
      }

      if (
        isUserExists.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(
          isUserExists.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      if (requiredRole && !requiredRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      req.user = decoded;

      next();
    },
  );
};

export default Auth;
