import { ObjectId } from "mongodb";
import { products } from "../database/mongoDB";

export const Products = {
	findProduct: async function (obj) {
		try {
			return await products.findOne({
				category: obj.category,
				"products._id": ObjectId(obj._id),
			});
		} catch (error) {
			console.log(`Error trying to find ${obj._id} in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
	filterProductsByCategory: async function (obj) {
		try {
			return await products.findOne({ category: obj.category });
		} catch (error) {
			console.log(`Error trying to find all ${obj.category} in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
	findAllProducts: async function (obj) {
		try {
			return await products.findOne({});
		} catch (error) {
			console.log(`Error trying to find all products in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
};

// {
//     _id: "",
//     category: "",
//     products: [
//         {
//             _id: "",
//             title: "",
//             img: "",
//             description: "",
//             price: "",
//             views: "",
//             inStock: "",
//             dateAdded: "",
//         }
//     ]
// }
