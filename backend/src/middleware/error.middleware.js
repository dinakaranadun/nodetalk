// 404 Not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (process.env.NODE_ENV === "development") {
    console.error("Error:", { message: err.message, stack: err.stack });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    ...(err.code && { code: err.code }),
  });
};
