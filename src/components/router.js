import { Router } from "express";
import userRoutes from "./user/user.router";
import cardRoutes from "./card/card.router";
import picksRoutes from "./pick/pick.router";

const router = Router();

router.use("/user", userRoutes);
router.use("/cards", cardRoutes);
router.use("/picks", picksRoutes);

router.use("/test", (req, res) => {
  res.json({ msg: "it worked" });
});

export { router };
