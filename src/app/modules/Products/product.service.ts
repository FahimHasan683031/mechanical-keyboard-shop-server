import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// Create a new product in the database
const createProduct = async (productData: TProduct) => {
  const result = await Product.create(productData);
  console.log(result);
  return result;
};

// Retrieve all products from the database
const getAllProducts = async (): Promise<TProduct[]> => {
  const products = await Product.find();
  return products;
};

// Search products by name using a case-insensitive regex
const searchProductsByName = async (searchTerm: string): Promise<TProduct[]> => {
  const regex = new RegExp(searchTerm, 'i');
  const products = await Product.find({ name: { $regex: regex } });
  return products;
};

// Retrieve a single product by its ID
const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// Update a product by ID with new data, returning the updated document
const updateProductDB = async (productId: string, updateData: TProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  if (!updatedProduct) {
    throw new Error("Product not found");
  }
  return updatedProduct;
};

// Delete a product by its ID
const deleteProductDB = async (id: string): Promise<TProduct | null> => {
  const deletedProduct = await Product.findByIdAndDelete(id).exec();
  return deletedProduct;
};

// Export Product service functions
export const ProductServices = {
  createProduct,
  getAllProducts,
  searchProductsByName,
  getSingleProduct,
  updateProductDB,
  deleteProductDB,
};
