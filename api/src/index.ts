import userRouter from "@/routes/user.route";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { authenticate } from './middleware/authenticate';
import authRouter from "./routes/auth.route";
import listingRouter from "./routes/listing.route";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// health route
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "Server up" })
})

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", authenticate, listingRouter);

// 404 error handler
app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// global error handler
app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ success: false, message: message, statusCode });
});

const port = process.env.PORT || 4000;
const service_name = process.env.SERVICE_NAME || 'Real estate'

// connect to mongodb
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`${service_name} is running on http://localhost:${port}`));
    })
    .catch((err) => console.log("cannot connect"))


