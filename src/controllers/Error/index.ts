import type { Response } from 'express';

class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: 400 | 401 | 404 | 403 | 500, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

export { ErrorHandler, handleError };
