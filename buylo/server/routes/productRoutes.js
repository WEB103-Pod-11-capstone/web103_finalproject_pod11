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

productRouter.route("/products").get(getAllProducts);
productRouter
  .route("/products/:id")
  .get(getProductById)
  .put(authMiddleware, isManager, updateProductById)
  .delete(deleteProductById);
productRouter
  .route("/products/stock/:id")
  .put(authMiddleware, isManager, updateStockByProductId);
productRouter
  .route("/products/add")
  .post(authMiddleware, isManager, addNewProduct);

export default productRouter;
