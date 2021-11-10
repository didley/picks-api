import { Router } from "express";
import controllers from "./pick.controller";
import { protectRoute } from "../../utils/auth";

const router = Router();

router.get("/preview", protectRoute, controllers.getLinkPreview);

export default router;
