/**
 * Returns a express middleware to skip route if specified query string is not within request
 * @param {String} qs - Query String
 *
 * @example
 * const matchOnIdQS = useQSRouteMatcher("id");
 *
 * router.get("/", matchOnIdQS, controllers.getItemById);
 *
 * - Called if no id QS supplied within request
 * router.get("/", controllers.getAllItems);
 *
 */

export const useQSRouteMatcher = (qs) => (req, res, next) => {
  return next(req.query[qs] ? null : "route");
};
