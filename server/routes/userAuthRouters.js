import  express  from "express";
import { dashBoard, requestOtp,verifyOtp, signin, signout, signup,shareReferCode } from "../controllers/user_authController.js";
import { authMiddelware } from "../middlewares/auth.js";


const router=express.Router();


router.post("/signin",signin);
router.post("/signup",signup);
router.get("/dashboard",authMiddelware,dashBoard);
router.post("/signout",authMiddelware,signout);
router.post("/OTP",requestOtp);
router.post("/verifyOTP",verifyOtp);
router.post("/shareReferCode",authMiddelware,shareReferCode);
export default router;


