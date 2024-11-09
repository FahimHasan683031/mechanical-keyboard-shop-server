import { z } from "zod";

// Schema to validate the details of an individual ordered product
const TOrderedSchema = z.object({
  product: z.string(), 
  quantity: z.number().min(1), 
});

// Main schema to validate the full order data
const OrderZodSchema = z.object({
  name: z.string(), 
  email: z.string().email(), 
  phoneNumber: z.string(), 
  address: z.string(), 
  products: z.array(TOrderedSchema), 
  payment: z.enum(["cashOnDelivery", "stripe"]),
});

// Export the validation schema for order
export default OrderZodSchema;

