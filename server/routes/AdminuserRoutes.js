import express from "express";
import { getUserById, getusers, updateUser, deleteUser, softDeleteUser, makeUserActive, bulkDeleteUser } from "../controllers/ADMINuserControlles.js"
import { adminAuthMiddelware } from "../middlewares/auth.js";


const router = express.Router();

router.get("/", adminAuthMiddelware,getusers);
router.get("/:userId", adminAuthMiddelware,getUserById);
// router.put("/:userId", adminAuthMiddelware,updateUser);
router.delete("/:userId", adminAuthMiddelware,deleteUser);
router.delete("/soft/:userId", adminAuthMiddelware,softDeleteUser);
router.put("/active/:userId", adminAuthMiddelware,makeUserActive);
router.delete("/bulk", adminAuthMiddelware,bulkDeleteUser);

export default router;

