export const notFound = (req, res, next) => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};


export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
