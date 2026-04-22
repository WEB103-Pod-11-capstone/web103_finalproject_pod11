import { Router } from "express";
import {
  addShippingAddress,
  createNewOrder,
} from "../controller/orderController.js";

const orderRouter = Router();

orderRouter.route("/shipping").patch(addShippingAddress);
orderRouter.route("/orders/checkout").post(createNewOrder);

export default orderRouter;
