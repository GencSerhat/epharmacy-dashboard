import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

//MiddlewARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Basit health-check route (sonra silinecek)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "E-PhaRmacy Dashboard API is running" });
});

app.use("/api/user", userRoutes);
app.use("/api",dashboardRoutes);
//Bıraya ilerde routes eklenecek
// örn: app.use("/api/user", authRouter);
// örn: app.use("/api/dashboard", dashboardRouter);

export default app;
