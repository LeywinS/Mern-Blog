import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
