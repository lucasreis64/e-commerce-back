import dayjs from "dayjs";
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
	findProductsByCategory: async function (obj) {
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
			return await products.findMany({});
		} catch (error) {
			console.log(`Error trying to find all products in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
	createProduct: async function (obj) {
		try {
			const query = await this.findProductsByCategory(obj);
			if (!query) {
				return await products.insertOne({
					category: obj.category,
					products: [
						{
							_id: new ObjectId(),
							title: obj.title,
							img: obj.img,
							description: obj.description,
							price: obj.price,
							views: 0,
							inStock: obj.inStock,
							dateAdded: dayjs().format("DD/MM/YYYY"),
						},
					],
				});
			}
			return this.pushProduct(obj);
		} catch (error) {
			console.log(`Error trying to create ${obj.title} in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
	pushProduct: async function (obj) {
		try {
			const _id = new ObjectId();
			const query = await products.updateOne(
				{ category: obj.category },
				{
					$push: {
						products: {
							_id,
							title: obj.title,
							img: obj.img,
							description: obj.description,
							price: obj.price,
							views: 0,
							inStock: obj.inStock,
							dateAdded: dayjs().format("DD/MM/YYYY"),
						},
					},
				}
			);
			return { _id, query };
		} catch (error) {
			console.log(`Error trying to create ${obj.title} in database.`);
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
