import express from "express";
import { postCheckout } from "../controllers/CheckoutControllers/checkoutControllers.js";

const router = express.Router();

router.post("/checkout", postCheckout);

export default router;
