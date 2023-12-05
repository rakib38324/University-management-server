import { ZodError, ZodIssue } from "zod";
import { TErrorSourses, TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSourses = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path?.length - 1],
            message: issue.message
        }
    })
    const statusCode = 400;

    return {
        statusCode,
        message: "Validation Error",
        errorSources
    }
}


export default handleZodError;