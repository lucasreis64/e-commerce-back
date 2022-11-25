import { productsSchema } from "../models/productsSchema.js";
import { validateBySchema } from "./validateBySchema.js";

export async function checkIfEmpty(req, res, next) {
	if (!req.body) return res.status(400).send("No body was found!");
	next();
}

export async function validadeProduct(req, res, next) {
	const validation = validateBySchema(req.body, res, productsSchema);
	if (!validation) return;
	req.product = req.body;
	next();
}
