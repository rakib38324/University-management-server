/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSourses, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extrated_msg = match && match[1];

  const errorSources: TErrorSourses = [
    {
      path: '',
      message: `${extrated_msg} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Information',
    errorSources,
  };
};

export default handleDuplicateError;
