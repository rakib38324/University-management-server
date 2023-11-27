import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const ValidateRequest = (scehema: AnyZodObject) => {
    return async (req: Request, response: Response, next: NextFunction) => {

        try {
            //====> validation
            // if everything is allright => next()=>
            await scehema.parseAsync({
                body: req.body
            })

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default ValidateRequest;