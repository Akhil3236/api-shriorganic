import express from "express";
import { authMiddelware } from "../middlewares/auth.js";
import { addproducttocart, getcart, clearCart,removeproduct, addquantity, removequantity, updateCartItemSize } from "../controllers/CartController.js";


const router = express.Router();

router.post("/add/:productId", authMiddelware, addproducttocart);
router.get("/", authMiddelware, getcart);
router.delete("/remove/:productId", authMiddelware, removeproduct)
router.put("/addquantity/:productId", authMiddelware, addquantity)
router.put("/removequantity/:productId", authMiddelware, removequantity)
router.put("/update-size/:productId", authMiddelware, updateCartItemSize)
router.delete("/clear", authMiddelware, clearCart)
export default router;