import Joi from "joi";

export const productsSchema = Joi.object({
	category: Joi.string().required(),
	title: Joi.string().max(40).required(),
	img: Joi.string()
<<<<<<< HEAD
		.pattern(new RegExp(/products\/[\w]+.png/))
=======
		.uri()
>>>>>>> 7d68442 (feat: img by url, change max length)
		.required(),
	description: Joi.string().max(120).min(20).required(),
	price: Joi.number().required(),
	inStock: Joi.number().min(1).required(),
});
