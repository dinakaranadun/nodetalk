const requestTimeout = (req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).json({ 
        success: false,
        error: 'Request timeout' 
      });
    }
  });
  
  res.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(503).json({ 
        success: false,
        error: 'Response timeout' 
      });
    }
  });
  
  next();
};

export default requestTimeout;