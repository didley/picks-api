import cors from "cors";

export const corsConfig = () => {
  const ENV = process.env.NODE_ENV;
  const allowedOrigin = process.env.CLIENT_URL;

  const origin = ENV === "development" ? "*" : allowedOrigin;

  return cors({ origin, optionsSuccessStatus: 200 });
};
