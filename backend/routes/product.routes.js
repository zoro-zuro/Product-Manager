import express from "express";
import {
  CreateProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

export const router = express.Router();

router.get("/", getProducts);

router.post("/", CreateProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);
