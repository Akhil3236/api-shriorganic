import express from "express";

import { createAdmin, signInAdmin, signOutAdmin, getAdmin } from "../controllers/adminController.js";
import { adminAuthMiddelware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", createAdmin);
router.post("/signin", signInAdmin);
router.get("/", adminAuthMiddelware, getAdmin);
router.post("/signout", adminAuthMiddelware, signOutAdmin);

export default router;