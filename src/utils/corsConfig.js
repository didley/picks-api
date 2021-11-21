import cors from "cors";

export const corsConfig = () => {
  const ENV = process.env.NODE_ENV;
  const allowedOrigins = [process.env.CLIENT_URL];

  const origin = ENV === "development" ? "*" : allowedOrigins;

  return cors({ origin, optionsSuccessStatus: 200 });
};
