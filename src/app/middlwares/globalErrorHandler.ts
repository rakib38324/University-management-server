/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

const globalErrorHandeler = ((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = error.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
}
);

export default globalErrorHandeler;