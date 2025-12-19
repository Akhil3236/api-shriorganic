import express from "express";
import {
    addproduct, getallproducts, updateproduct, deleteproduct, searchproduct, getproduct,
    deleteHardDeletedProducts, softDeleteProduct, getBestSellingProducts, changeProductStatus,
    getActiveProducts, bulkDeleteProduct, addCertifiedProduct
} from "../controllers/productContorollers.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", upload.array("images", 10), addproduct);
router.get("/", getallproducts);
router.put("/:id", updateproduct);
router.delete("/bulk-delete", bulkDeleteProduct);
router.delete("/:id", deleteproduct);
router.get("/best-selling-products", getBestSellingProducts);
router.get("/active-products", getActiveProducts);
router.get("/search/:keyword", searchproduct);
router.get("/:id", getproduct);
router.delete("/hard-delete/:id", deleteHardDeletedProducts);
router.get("/soft-delete/:id", softDeleteProduct);
router.put("/change-status/:id", changeProductStatus);
router.put("/certified/:id", addCertifiedProduct);
export default router;
