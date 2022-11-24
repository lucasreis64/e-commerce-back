import { Router } from "express";
import {
	getProducts,
	postProducts,
	putProducts,
} from "../controllers/ProductsControllers/productsControllers.js";
import {
	checkIfEmpty,
	validadeProduct,
} from "../middlewares/validadeProducts.js";

const router = Router();

router.post("/products", checkIfEmpty, validadeProduct, postProducts);
router.get("/products", getProducts);
router.put("/products/:id", putProducts);

export default router;
