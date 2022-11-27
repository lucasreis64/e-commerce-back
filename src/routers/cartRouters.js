import { Router } from "express";
import {
    deleteCart,
    getCart,
    postCart,
    putCart,
} from "../controllers/cartControllers/cartControllers.js";
import { validateToken } from "../middlewares/validateToken.js";
import {
    checkIfEmpty,
    validadeProduct,
} from "../middlewares/validadeProducts.js";

const router = Router();

router.use(validateToken);

router.post("/cart", postCart);
router.get("/cart", getCart);
router.put("/cart/:id", putCart);
router.delete("/cart/:id", deleteCart);

export default router;
