export const handle404 = (_req, res, _next) =>
  res.status(404).json({ message: `404: request not found` });
