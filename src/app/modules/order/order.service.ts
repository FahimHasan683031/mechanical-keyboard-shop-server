import { TOrderInfo } from "./order.interface";
import { OrderModel } from "./order.model";

// Service function to create a new order in the database
const createOrder = async (orderData: TOrderInfo) => {
  // Create and save the order to the database
  const result = await OrderModel.create(orderData);
  return result;
};

// Export the OrderServices object with the createOrder function
export const OrderServices = {
  createOrder,
};
