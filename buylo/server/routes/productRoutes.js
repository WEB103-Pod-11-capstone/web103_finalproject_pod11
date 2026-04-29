import { Router } from "express";
import {
  addNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
  updateStockByProductId,
} from "../controller/productController.js";
import authMiddleware from "../middleware/auth.js";
import isManager from "../middleware/isManager.js";

const productRouter = Router();

productRouter.route("/").get(getAllProducts).post(addNewProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(authMiddleware, isManager, updateProductById)
  .delete(deleteProductById);
productRouter
  .route("/stock/:id")
  .put(authMiddleware, isManager, updateStockByProductId);

export default productRouter;
