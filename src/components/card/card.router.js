import { Router } from "express";
import controllers from "./card.controller";
import { useQSRouteMatcher } from "../../utils/useQSRouteMatcher";
import { protectRoute } from "../../utils/auth";

const router = Router();

const matchOnIdQS = useQSRouteMatcher("id");
const matchOnUnQS = useQSRouteMatcher("un");

//api/cards
router.get("/", matchOnIdQS, controllers.getCardById);
router.get("/", matchOnUnQS, controllers.getCardsByUsername);
router.delete("/", protectRoute, controllers.deleteCardById);
router.post("/", protectRoute, controllers.createCard);
router.put("/", protectRoute, controllers.updateCard);

export default router;
