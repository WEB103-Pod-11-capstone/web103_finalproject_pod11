import { client } from "../config/database.js";
import {
  isNameValid,
  isProductNameValid,
  isUrlValid,
} from "../utils/validators.js";

const FALLBACK_IMAGE_URL = "https://placehold.co/400x500?";

export const addNewProduct = async (req, res) => {
  const { name, price, current_quantity, category, description, image_url } = req.body;
  const descriptionText = description && description.trim() ? description.trim() : "No description available.";
  const imageUrl = image_url && isUrlValid(image_url)
    ? image_url
    : FALLBACK_IMAGE_URL + `text=${encodeURIComponent(name || 'Product')}`;

  try {
    //All fields validation || Passed ✅
    if (
      !name ||
      !price ||
      !current_quantity ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Product name validation || Passed ✅
    if (!isProductNameValid(name)) {
      return res.status(400).json({ message: "Enter a valid product name" });
    }

    //Product name length validation || Passed ✅
    if (name.length < 2) {
      return res.status(400).json({ message: "Product name too short" });
    }

    //Product price validation || Passed ✅
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive numerical value" });
    }

    //Current stock validation || Passed ✅
    if (isNaN(current_quantity) || current_quantity < 0) {
      return res.status(400).json({
        message: "Stock quantity must be a non-negative numerical value",
      });
    }
    
    const newProduct = await client.query(
      `
      INSERT INTO products(name, price, current_quantity, category, description, image_url)
      VALUES($1, $2, $3, $4, $5, $6)
      `,
      [name, price, current_quantity, category, description, imageUrl],
    );

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await client.query(`
        SELECT * FROM products
        `);

    if (result.rowCount === 0)
      return res.status(400).json({ message: "No products available" });

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
        SELECT * FROM products
        WHERE id=$1
        `,
      [id],
    );

    if (result.rowCount === 0)
      return res.status(400).json({ message: "Product not found" });

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    current_quantity,
    category,
    description,
    image_url,
  } = req.body;

  try {
    if (
      !id ||
      !name ||
      !price ||
      !current_quantity ||
      !category ||
      !description ||
      !image_url
    ) {
      return res.status(400).json({ message: "Data not provided" });
    }

    const product = await client.query(
      `
        SELECT current_quantity
        FROM products
        WHERE id=$1
        `,
      [id],
    );

    if (product.rowCount === 0)
      return res.status(400).json({ message: "Product not available" });

    await client.query(
      `
        UPDATE products
        SET name=$1, price=$2, current_quantity=$3, category=$4, description=$5, image_url=$6
        WHERE id=$7
        `,
      [name, price, current_quantity, category, description, image_url, id],
    );

    return res.status(200).json({ message: "Product updated" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStockByProductId = async (req, res) => {
  const { productId, current_quantity } = req.body;

  try {
    if (!productId)
      return res.status(400).json({ message: "Data not provided" });

    if (isNaN(current_quantity) || current_quantity < 0) {
      return res.status(400).json({
        message: "Current Quantity must be a numerical value greater than 0",
      });
    }

    const result = await client.query(
      `
        UPDATE products
        SET current_quantity=$1
        WHERE id=$2
        `,
      [current_quantity, productId],
    );

    return res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `
        SELECT id FROM products
        WHERE id=$1
        `,
      [id],
    );

    //Checks if products exists before deletion || Passed ✅
    if (result.rowCount === 0)
      return res.status(400).json({ message: "Product not available" });

    await client.query(
      `
        DELETE FROM products
        WHERE id=$1
        `,
      [id],
    );

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
