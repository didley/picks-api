export const truncStr = (
  string = "",
  limit = 0,
  opts = { ellipsis: false }
) => {
  if (!string) return undefined;
  if (typeof string !== "string") {
    console.error(
      `string argument must be of type string.\nSupplied arg:`,
      string
    );
    return undefined;
  }

  if (limit === 0) throw Error("Limit required");
  if (string.length < limit) return string;
  if (opts.ellipsis) return string.slice(0, limit - 3) + "...";
  return string.slice(0, limit);
};
