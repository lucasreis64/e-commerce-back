import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouters from "./routers/authRouters.js";
import productsRouters from "./routers/productsRouters.js";
import cartRouters from "./routers/cartRouters.js";
import checkOutRouters from "./routers/checkoutRouters.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use("/auth", authRouters);
app.use(productsRouters);
app.use(cartRouters);
app.use(checkOutRouters)

app.listen(process.env.PORT, () => {
	console.log("Running on port " + process.env.PORT);
});
