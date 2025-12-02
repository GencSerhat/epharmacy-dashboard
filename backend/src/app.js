import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import suppliersRouter from "./routes/suppliersRoutes.js";


const app = express();

//MiddlewARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());




app.use("/api/user", userRoutes);
app.use("/api",dashboardRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/suppliers", suppliersRouter);



export default app;
