import Joi from "joi";

export const cartSchema = Joi.object({
    title: Joi.string().max(40).required(),
    img: Joi.string().uri().required(),
    price: Joi.number().required(),
    _id: Joi.string().required(),
    amount: Joi.number().min(0).required(),
});

export const ammountSchema = Joi.object({
    amount: Joi.number().min(0).required()
});