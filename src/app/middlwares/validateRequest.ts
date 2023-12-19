import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const ValidateRequest = (scehema: AnyZodObject) => {
  return catchAsync(
    async (req: Request, response: Response, next: NextFunction) => {
      //====> validation
      // if everything is allright => next()=>
      await scehema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    },
  );
};

export default ValidateRequest;
