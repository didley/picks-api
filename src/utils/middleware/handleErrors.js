export const handleErrors = (err, _req, res, next) => {
  if (!err) return next();

  let stackResponse = null;
  if (process.env.NODE_ENV === "development")
    stackResponse = { stack: err.stack };

  const statusCode = err?.code || 500;
  const errorMessage = err?.message || "Something went wrong.";
  res
    .status(statusCode)
    .json({ status: statusCode, message: errorMessage, ...stackResponse });
};
