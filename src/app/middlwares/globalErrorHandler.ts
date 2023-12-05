/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSourses } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandeler: ErrorRequestHandler = ((error, req, res, next) => {

    //setting default vaules
    let statusCode = 500;
    let message =  "Something went wrong!";



    let errorSources: TErrorSourses = [
        {
            path: '',
            message: "Something went wrong!"
        }
    ];


    
    if (error instanceof ZodError) {
        const simplefiedError = handleZodError(error)
        statusCode = simplefiedError?.statusCode;
        message = simplefiedError?.message;
        errorSources = simplefiedError?.errorSources
    }


    else if( error.name === "ValidationError" ){
        const simplefiedError = handleValidationError(error);
        statusCode = simplefiedError?.statusCode;
        message = simplefiedError?.message;
        errorSources = simplefiedError?.errorSources
    }

    else if(error.name === "CastError"){
        const simplefiedError = handleCastError(error);
        statusCode = simplefiedError?.statusCode;
        message = simplefiedError?.message;
        errorSources = simplefiedError?.errorSources
    }

    else if(error.code === 11000){
        const simplefiedError = handleDuplicateError(error);
        statusCode = simplefiedError?.statusCode;
        message = simplefiedError?.message;
        errorSources = simplefiedError?.errorSources
    }

    else if(error instanceof AppError){

        statusCode = error?.statusCode;
        message = error?.message;
        errorSources = [{
            path:'',
            message: error.message
        }]
    }

    else if(error instanceof Error){
        message = error?.message;
        errorSources = [{
            path:'',
            message: error.message
        }]
    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error?.stack : null,
        
    })
}
);

export default globalErrorHandeler;