import  express  from "express";
import { login } from "../controllers/user_authController.js";


const router=express.Router();


router.post("/login",login);
export default router;


