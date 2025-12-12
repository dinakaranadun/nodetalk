import AppError from "../utils/apperror";

const requestTimeout = (req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      throw new AppError('Request time out',408)
    }
    req.destroy();
  });
  
  res.setTimeout(30000, () => {
    if (!res.headersSent) {
      throw new AppError('Response timeout',503)
    }
    req.destroy();
  });
  
  next();
};

export default requestTimeout;