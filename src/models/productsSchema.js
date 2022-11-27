import Joi from "joi";

export const productsSchema = Joi.object({
	category: Joi.string().required(),
	title: Joi.string().max(20).required(),
	img: Joi.string()
		.pattern(new RegExp(/products\/[\w]+.png/))
		.required(),
	description: Joi.string().max(60).min(20).required(),
	price: Joi.number().required(),
	inStock: Joi.number().min(1).required(),
});
