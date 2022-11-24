import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { products } from "../database/mongoDB.js";

export const Products = {
	findProductById: async function (obj) {
		try {
			return await products
				.aggregate([
					{ $match: { "products._id": ObjectId(obj.id) } },
					{
						$project: {
							products: {
								$filter: {
									input: "$products",
									as: "product",
									cond: { $eq: ["$$product._id", ObjectId(obj.id)] },
								},
							},
						},
					},
				])
				.toArray();
		} catch (error) {
			console.log(`Error trying to find ${obj.id} in database.`);
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
			return await products.find({}).toArray();
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
				const _id = new ObjectId();
				const query = await products.insertOne({
					category: obj.category,
					products: [
						{
							_id,
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
				return { _id, query };
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
			console.log(`Error trying to push ${obj.title} in database.`);
			console.log(`Operation returned: ${error}`);
			return false;
		}
	},
	updateProduct: async function (obj) {
		try {
			console.log(obj);
			return await products.updateOne(
				{ "products._id": ObjectId(obj.id) },
				{
					$set: {
						"products.$.title": obj.title,
						"products.$.img": obj.img,
						"products.$.description": obj.description,
						"products.$.price": obj.price,
						"products.$.inStock": obj.inStock,
					},
				}
			);
		} catch (error) {
			console.log(`Error trying to update ${obj.id} in database.`);
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
