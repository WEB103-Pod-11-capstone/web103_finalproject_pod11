import { Router } from "express";
import { addToCart, getCartByUser } from "../controller/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.route("/add").post(authMiddleware, addToCart);
cartRouter.route("/items").get(authMiddleware, getCartByUser);

export default cartRouter;
