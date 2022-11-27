import { Products } from "../../database/productsConnectionDB.js";

export async function postProducts(req, res) {
	const { _id, query } = await Products.createProduct(req.product);
	if (!query.acknowledged) {
		return res.sendStatus(500);
	}
	res.status(201).send({ id: _id });
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
		const queryById = await Products.findProductById({ id });
		if (queryById.length === 0)
			return res.status(500).send(`id:${id} doesn't exist in database`);
		const objProduct = queryById[0].products[0];
		return res.status(200).send(objProduct);
	}
	const query = await Products.findAllProducts();
	if (!query) {
		return res.sendStatus(500);
	}
	res.status(200).send(query);
}

export async function putProducts(req, res) {
	const id = req.params.id;
	const query = Products.updateProduct({ id, ...req.body });
	if (!query) {
		return res.sendStatus(500);
	}
	res.sendStatus(200);
}

export async function deleteProducts(req, res) {
	const id = req.params.id;
	const query = Products.deleteProduct({ id });
	if (!query) {
		return res.sendStatus(500);
	}
	res.sendStatus(200);
}
