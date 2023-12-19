import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const Auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(
    async (req: Request, response: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      //===> check the if the token valid
      // verify a token symmetric
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not Authorized',
            );
          }

          req.user = decoded as JwtPayload;

          const role = (decoded as JwtPayload).role;

          if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not Authorized',
            );
          }

          next();
        },
      );
    },
  );
};

export default Auth;
