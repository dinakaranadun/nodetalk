class AppError extends Error{
    constructor(message, statusCode) {
    super(message);
    success:false;
    this.statusCode = statusCode;
    this.isOperational = true; 
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;