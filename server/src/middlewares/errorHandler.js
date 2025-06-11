const errorHandler = (err, req, res, next) => {
  console.error(`[${req.method}] ${req.originalUrl} ::`, err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;