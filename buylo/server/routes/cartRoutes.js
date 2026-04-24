import { Router } from "express";
import {
  addToCart,
  decreaseItemQuantity,
  getCartByUser,
  increaseItemQuantity,
} from "../controller/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.route("/add").post(authMiddleware, addToCart);
cartRouter.route("/items").get(authMiddleware, getCartByUser);
cartRouter.route("/increase").patch(increaseItemQuantity);
cartRouter.route("/decrease").patch(decreaseItemQuantity);

export default cartRouter;
