import  express from "express";
import { getallusers } from "../controllers/useControlles.js";

const router=express.Router();

router.get("/alluser",getallusers)

export default router;

