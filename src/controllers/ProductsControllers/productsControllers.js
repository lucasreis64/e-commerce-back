import { Products } from "../../models/productsModel.js";

export async function postProducts(req, res) {
	const { _id, query } = await Products.createProduct(req.body);
	if (!query.acknowledged) {
		return res.sendStatus(500);
	}
	res.status(201).send(_id);
}

export async function getProducts(req, res) {
	const { category, id } = req.query;
	if (category) {
		const queryByCategory = await Products.findProductsByCategory({ category });
		if (!queryByCategory) {
			return res.sendStatus(500);
		}
		return res.status(200).send(queryByCategory);
	}
	if (id) {
		const queryById = await Products.findProductById({ id, category });
		if (!queryById) return res.sendStatus(500);
		return res.status(200).send(queryById);
	}
	const query = await Products.findAllProducts();
	if (!query) {
		return res.sendStatus(500);
	}
	res.status(200).send(query);
}
