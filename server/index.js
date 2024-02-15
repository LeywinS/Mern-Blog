import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((e) => {
    console.log("Error !!", e.message);
  });

const __dirname = path.resolve();
const app = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  next();
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
