import express from "express";
import { subscribeToNewsletter, unsubscribeFromNewsletter } from "../controllers/notifyController.js";

const router = express.Router();

router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);

export default router;  