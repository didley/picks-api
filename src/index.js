import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { router } from "./components/router";
import { db } from "./utils/db";
import { handle404, handleErrors } from "./utils/middleware";

mongoose.set("debug", process.env.MONGOOSE_DEBUG === "true" || false);

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", router);

app.use(handle404);
app.use(handleErrors);

const initializeApp = async () => {
  try {
    await db.connect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀   Backend running on PORT ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

initializeApp();
