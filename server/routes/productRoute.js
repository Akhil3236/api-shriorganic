import express from "express";
import { addproduct ,getallproducts,updateproduct,deleteproduct,searchproduct,getproduct} from "../controllers/productContorollers.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/new",upload.array("images", 10), addproduct);
router.get("/",getallproducts);
router.put("/:id",updateproduct);
router.delete("/:id",deleteproduct);
router.get("/search/:keyword",searchproduct);   
router.get("/:id",getproduct);


export default router;
