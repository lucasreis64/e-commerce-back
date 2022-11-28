import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { validadeProduct } from "../middlewares/validadeProducts.js";
import { accounts } from "./mongoDB.js";

export const checkOut = {
    pushCheckoutProducts: async function (obj, _id) {
        const id = new ObjectId();
        try {
            const query = await accounts.updateOne(
                { _id: _id },
                {
                    $push: {
                        checkOut: {
                            _id: id,
                            products: obj.products,
                            dateAdded: dayjs().format("DD/MM/YYYY"),
                            value: obj.value,
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
};
