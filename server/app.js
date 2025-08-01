import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbconnection.js";
import { errorMiddleware } from "./middleware/error.js";

export const app = express();

// Load environment variables
config({ path: "./config.env" });

// CORS setup
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
connection();

app.use(errorMiddleware);
