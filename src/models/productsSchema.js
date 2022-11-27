import Joi from "joi";

export const productsSchema = Joi.object({
	category: Joi.string().required(),
	title: Joi.string().max(40).required(),
	img: Joi.string().uri().required(),
<<<<<<< HEAD
	description: Joi.string().max(120).min(20).required(),
=======
	description: Joi.string().max(100).min(20).required(),
>>>>>>> 179d98f (fix: added more characters to description product schema)
	price: Joi.number().required(),
	inStock: Joi.number().min(1).required(),
});
