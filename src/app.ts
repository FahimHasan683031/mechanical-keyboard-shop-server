/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
// import { ProductRoutes } from "./app/modules/Products/product.route";
// import { OrderRoutes } from "./app/modules/order/order.route";
import cors from "cors";
const app = express();

//parsers
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));


// app.use("/api/products", ProductRoutes);
// app.use("/api/orders", OrderRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('ClickCraft is running...!')
})

export default app;