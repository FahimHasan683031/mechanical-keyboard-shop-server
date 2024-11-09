// order.interface.ts

// Defines a single ordered product with its ID and quantity
export type TOrdered = {
  product: string;   // Product ID
  quantity: number;  // Quantity of the product
};

// Defines the structure for order information
export type TOrderInfo = {
  name: string;             // Customer's name
  email: string;            // Customer's email
  phoneNumber: string;      // Customer's phone number
  address: string;          // Shipping address
  products: TOrdered[];     // List of products with quantity
  payment: "cashOnDelivery" | "stripe"; // Payment method (Cash on Delivery or Stripe)
};
