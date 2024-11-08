import { z } from "zod";

// Schema for validating product creation input
const ProductZodSchema = z.object({
  image: z.string().min(1, "Product image is required."),
  title: z.string().min(1, "Product title is required.").max(30, "Product title should not exceed 30 characters."),
  brand: z.string().min(1, "Brand name is required."),
  price: z.number().positive("Product price must be a positive number."),
  rating: z.number().min(0, "Rating must be at least 0.").max(5, "Rating cannot exceed 5."),
  description: z.string().min(1, "Product description is required.").max(350, "Description cannot exceed 350 characters."),
  category: z.string().min(1, "Category is required."),
  availableQuantity: z.number().positive("Stock quantity must be a positive number."),
});

// Schema for validating product update input (fields are optional)
const UpdateProductZodSchema = z.object({
  image: z.string().optional(),
  title: z.string().max(30, "Product title should not exceed 30 characters.").optional(),
  brand: z.string().optional(),
  price: z.number().positive("Product price must be a positive number.").optional(),
  rating: z.number().max(5, "Rating cannot exceed 5.").optional(),
  description: z.string().max(350, "Description cannot exceed 350 characters.").optional(),
  category: z.string().optional(),
  availableQuantity: z.number().positive("Stock quantity must be a positive number.").optional(),
});

// Export validation schemas for use in product validation
export const ProductValidation = { ProductZodSchema, UpdateProductZodSchema };

