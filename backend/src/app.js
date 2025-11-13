import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

//MiddlewARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Basit health-check route (sonra silinecek)
app.get("/api/health",(req,res)=>{
    res.json({status:"ok",message:"E-PhaRmacy Dashboard API is running"});
});

//Bıraya ilerde routes eklenecek
// örn: app.use("/api/user", authRouter);
// örn: app.use("/api/dashboard", dashboardRouter);


export default app;