import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";
import { ProductValidation } from "./product.validation";

// Controller for creating a new product entry in the database
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;

    // Parse and validate the product data from the request using Zod schema validation
    const zodParsedData = ProductValidation.ProductZodSchema.parse(productData);

    // Invoke service to create the product and return result
    const result = await ProductServices.createProduct(zodParsedData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    // Handle errors during product creation
    res.status(500).json({
      success: false,
      message: "Could not create product!",
      error: err,
    });
  }
};

// Controller to retrieve all products, with optional search by product name
const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    if (searchTerm) {
      // If a search term is provided, perform search for products matching the name
      const productData = await ProductServices.searchProductsByName(searchTerm);
      const message =
        productData.length > 0
          ? `Products found with name matching: ${searchTerm}`
          : `No products found with name matching: ${searchTerm}`;

      res.status(200).json({
        success: true,
        message,
        data: productData,
      });
    } else {
      // Otherwise, retrieve the entire list of products
      const productData = await ProductServices.getAllProducts();
      const message = productData.length > 0 ? "Products fetched successfully!" : "No products found.";

      res.status(200).json({
        success: true,
        message,
        data: productData,
      });
    }
  } catch (err) {
    // Handle errors during product retrieval
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

// Controller to retrieve a single product by its unique ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Retrieve the specified product based on its ID
    const result = await ProductServices.getSingleProduct(productId);

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  } catch (err) {
    // Handle errors during single product retrieval
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: err,
    });
  }
};

// Controller to update an existing product by its ID
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Update product details in the database based on the provided ID and new data
    const result = await ProductServices.updateProductDB(productId, updateData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err) {
    // Handle errors during product update
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err,
    });
  }
};

// Controller to delete a product by its ID from the database
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    // Delete the specified product from the database
    const deletedProduct = await ProductServices.deleteProductDB(productId);
    console.log(deletedProduct); // Optional: log the deletion details for debugging

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null, // No data to return for delete operation
    });
  } catch (error) {
    // Handle errors during product deletion
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not delete product",
    });
  }
};

// Exporting all product controller methods for use in routes
export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
