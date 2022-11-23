import { validateBySchema } from "../../middlewares/validateBySchema.js";
import { v4 as uuidV4 } from "uuid";
import { accounts, sessions } from "../../database/mongoDB.js";
import { signInSchema } from "../../models/signInSchema.js";
import bcrypt from "bcrypt";

export async function postSignIn(req, res) {
    const { email, password } = req.body;
    const token = uuidV4();

    if (!validateBySchema(req.body, res, signInSchema)) return;
    try {
        const user = await accounts.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            await sessions.insertOne({
                token,
                userId: user._id,
            });
            res.send({ token });
        } else {
            res.status(401).send("incorrect email or password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
