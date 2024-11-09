import { Schema, model } from "mongoose";
import { TOrderInfo } from "./order.interface";

// Schema for individual ordered product with reference to the Product model
const orderSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  }
});

// Main order schema containing customer details, products, and payment method
const orderInfoSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  products: { 
    type: [orderSchema], 
    required: true 
  },
  payment: { 
    type: String, 
    enum: ['cashOnDelivery', 'stripe'], 
    required: true 
  }
});

// Create and export the Order model
export const OrderModel = model<TOrderInfo>("Order", orderInfoSchema);
