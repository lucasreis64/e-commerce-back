import { accounts } from "../../database/mongoDB.js";
import { signUpSchema } from "../../models/signUpSchema.js";
import { validateBySchema } from "../../middlewares/validateBySchema.js";
import bcrypt from "bcrypt";

export async function postSignUp(req, res) {
    const newUser = req.body;
    console.log(newUser);
    try {
        if (!validateBySchema(newUser, res, signUpSchema)) return;
        const isExistent = await accounts.findOne({ email: newUser.email });

        if (isExistent) {
            return res.status(409).send("this email adress is already in use!");
        }

        delete newUser.repeatPassword;

        newUser.cart = [];

        const passwordHash = bcrypt.hashSync(newUser.password, 10);

        await accounts.insertOne({ ...newUser, password: passwordHash });

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
