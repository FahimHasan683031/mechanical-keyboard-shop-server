import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";
import slugify from "slugify";

// Define Product schema with field validation
const productSchema = new Schema<TProduct>({
  image: { type: String, required: [true, 'Product image is required'] },
  title: { type: String, required: [true, 'Product title is required'] },
  brand: { type: String, required: [true, 'Product brand is required'] },
  price: { type: Number, required: [true, 'Product price is required'] },
  rating: { type: Number, required: [true, 'Product rating is required'] },
  description: { type: String, required: [true, 'Product description is required'] },
  category: { type: String, required: [true, 'Product category is required'] },
  availableQuantity: { type: Number, required: [true, 'Product stock quantity is required'] },
});

//* Middleware: Generates a slug for each product before saving
productSchema.pre('save', async function (next) {
  const slug = slugify(`${this.description}-${this.price}`, { lower: true });
  this.set('slug', slug);
  next();
});

//* Static method: Checks if a product exists by its ID
productSchema.statics.isProductExists = async function (id: string) {
  return await this.findById(id);
};

// Create and export Product model
export const Product = model<TProduct>('Product', productSchema);

