import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((e) => {
    console.log("Error !!", e.message);
  });
const app = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
