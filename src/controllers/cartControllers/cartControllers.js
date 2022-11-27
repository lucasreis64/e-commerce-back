import { Cart } from "../../database/cartConnectionDB.js";
import { Products } from "../../database/productsConnectionDB.js";
import { validateBySchema } from "../../middlewares/validateBySchema.js";
import { ammountSchema, cartSchema } from "../../models/cartSchema.js";

export async function postCart(req, res) {
    const { _id } = res.locals.account;

    if (!validateBySchema(req.body, res, cartSchema)) return;

    const id = await Cart.pushCartProduct(req.body, _id);

    res.status(201).send(id);
}

export async function getCart(req, res) {
    const { _id } = res.locals.account;
    const query = await Cart.findCartProducts(_id)

    res.status(200).send(query);
}

export async function putCart(req, res) {
    const id = req.params.id;

    if (!validateBySchema(req.body, res, ammountSchema)) return;

    const query = Cart.updateCartProduct({ id, ...req.body });
    if (!query) {
        return res.sendStatus(500);
    }
    res.sendStatus(200);
}

export async function deleteCart(req, res) {
    const id = req.params.id;
    const query = Cart.deleteCartProduct({ id });
    if (!query) {
        return res.sendStatus(500);
    }
    res.sendStatus(200);
}
