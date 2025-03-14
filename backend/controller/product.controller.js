import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error occured while get all products : ${error.message}`);
    res.status(404).json({
      success: false,
      message: "Server Error 404 not found",
    });
  }
};

export const CreateProduct = async (req, res) => {
  const prodcut = req.body;

  const newProduct = new Product(prodcut);

  try {
    await newProduct.save();
    res.status(201).json({ succcess: true, data: newProduct });
  } catch (error) {
    console.log(`Error in creating new product : ${error.message}`);
    res.status(400).json({ success: false, message: "SERVER ERROR" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(`Error ocured while updating the product : ${product}`);
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }

  try {
    const deleteProduct = await Product.findById(id);
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Succesfully deleted the product id :${deleteProduct}`,
    });
  } catch (error) {
    console.log(`Error occured while deleting : ${error.message}`);
    res.status(404).json({
      success: false,
      message: "Server Error",
    });
  }
};
