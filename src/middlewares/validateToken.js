import { accounts, sessions } from "../database/mongoDB.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("missing token");
    }

    try {
        const session = await sessions.findOne({ token: token });
        const user = await accounts.findOne({ _id: session?.userId });

        if(!user){
            res.status(422).send('invalid token')
            return
        }

        delete user.password;

        res.locals.account = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
