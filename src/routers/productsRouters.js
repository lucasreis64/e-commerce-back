import { Router } from "express";
import {
	getProducts,
	postProducts,
} from "../controllers/ProductsControllers/productsControllers.js";

const router = Router();

router.post("/products", postProducts);
router.get("/products", getProducts);

export default router;
