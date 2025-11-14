import  express from "express";
import {getUserById, getusers} from "../controllers/useControlles.js"


const router=express.Router();

router.get("/",getusers);
router.get("/:userId",getUserById);

export default router;

