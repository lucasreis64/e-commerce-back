import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { accounts } from "./mongoDB.js";

export const Cart = {
    findCartProducts: async function (_id) {
        try {
            const account = await accounts.findOne({ _id });
            return account.cart;
        } catch (error) {
            console.log(`Error trying to find user ${_id} cart in database.`);
            console.log(`Operation returned: ${error}`);
            return false;
        }
    },
    pushCartProduct: async function (obj, _id) {
        try {
            const query = await accounts.updateOne(
                { _id: _id },
                {
                    $push: {
                        cart: {
                            _id: ObjectId(obj._id),
                            title: obj.title,
                            img: obj.img,
                            price: Number(obj.price).toFixed(2),
                            amount: obj.amount,
                        },
                    },
                }
            );
            return obj._id;
        } catch (error) {
            console.log(`Error trying to push ${obj.title} in the cart.`);
            console.log(`Operation returned: ${error}`);
            return false;
        }
    },
    updateCartProduct: async function (obj) {
        try {
            return await accounts.updateOne(
                { "cart._id": ObjectId(obj.id) },
                {
                    $set: {
                        "cart.$.amount": obj.amount,
                    },
                }
            );
        } catch (error) {
            console.log(`Error trying to update the amount.`);
            console.log(`Operation returned: ${error}`);
            return false;
        }
    },
    deleteCartProduct: async function (obj) {
        try {
            return await accounts.updateOne(
                { "cart._id": ObjectId(obj.id) },
                {
                    $pull: { cart: { _id: ObjectId(obj.id) } },
                }
            );
        } catch (error) {
            console.log(`Error trying to delete ${obj.id} in database.`);
            console.log(`Operation returned: ${error}`);
            return false;
        }
    },
    deleteCart: async function () {
        try {
            return await accounts.updateMany({}, { $unset: { cart: "" } });
        } catch (error) {
            console.log(`Error trying to delete cart in database.`);
            console.log(`Operation returned: ${error}`);
            return false;
        }
    },
};
