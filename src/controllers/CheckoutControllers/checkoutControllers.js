import { Cart } from "../../database/cartConnectionDB.js";
import { checkOut } from "../../database/checkoutConnectionDB.js";
import { Products } from "../../database/productsConnectionDB.js";
import { validateBySchema } from "../../middlewares/validateBySchema.js";
import { cartSchema } from "../../models/cartSchema.js";

export async function postCheckout(req, res) {
    const { _id } = res.locals.account;

    const id = await checkOut.pushCheckoutProducts(req.body, _id);

    await Cart.deleteCart()

    res.status(201).send(id);
}