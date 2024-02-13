import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controllers.js";
const router = express.Router();

router
  .post("/create", verifyToken, create)
  .get("/getposts", getPosts)
  .delete("/deletepost/:postId/:userId", verifyToken, deletePost)
  .put("/updatepost/:postId/:userId", verifyToken, updatePost);

export default router;
