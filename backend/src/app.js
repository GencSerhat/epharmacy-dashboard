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


const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5000", 
  "https://SENIN-UYGULAMAN.vercel.app", // 🔴 BURAYI kendi Vercel domaininle değiştir
];


const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
 
  credentials: true,
};

app.use(cors(corsOptions));


app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/suppliers", suppliersRouter);

export default app;
