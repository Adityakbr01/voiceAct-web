export function AppError(message: string, statusCode: number) {
  const err = new Error(message) as Error & { statusCode: number; isOperational: boolean };
  err.statusCode = statusCode;
  err.isOperational = true;
  Error.captureStackTrace(err, AppError);
  return err;
}
