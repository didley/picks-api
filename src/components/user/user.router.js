import { Router } from "express";
import { protectRoute } from "../../utils/auth";

import controllers from "./user.controllers";

const router = Router();

//api/user
router
  .route("/")
  .get(protectRoute, controllers.getUser)
  .put(protectRoute, controllers.updateUser);
// .delete(controllers.removeOne);

router.post("/login", controllers.loginUser);
router.post("/signup", controllers.createUser);
// router.post("/logout");

router.get("/profile", controllers.getPublicProfileSummary); // "un" query string with display username

export default router;
