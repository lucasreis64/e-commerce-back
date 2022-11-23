import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
        .required(),
    password: Joi.string()
        .pattern(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[.?!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$"
            )
        )
        .required(),
    repeatPassword: Joi.ref("password"),
});
