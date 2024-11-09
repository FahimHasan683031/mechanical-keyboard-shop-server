import { Request, Response } from "express";
import { TOrderInfo } from "./order.interface";
import { OrderServices } from "./order.service";
import { Product } from "../Products/product.model";
import OrderZodSchema from "./order.validation";
import { z } from "zod";

// Controller to create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrderInfo = req.body;

    //! Validate request body using Zod
    const validatedOrderData = OrderZodSchema.parse(orderData);

    // Check product existence and quantity availability
    for (const orderedItem of validatedOrderData.products) {
      const product = await Product.findById(orderedItem.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${orderedItem.product} not found`,
        });
      }
      if (orderedItem.quantity > product.availableQuantity) {
        return res.status(400).json({
          success: false,
          message: `Requested quantity for product ${product._id} exceeds available stock`,
        });
      }
    }

    //! Deduct stock from products
    for (const orderedItem of validatedOrderData.products) {
      const product = await Product.findById(orderedItem.product);
      if (product) {
        product.availableQuantity -= orderedItem.quantity;
        await product.save();
      }
    }

    //! Create the order in the database
    const result = await OrderServices.createOrder(validatedOrderData);

    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    //! Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }

    //! Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: errorMessage,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
