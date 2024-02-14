import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .post("/create", verifyToken, createComment)
  .get("/getPostComments/:postId", getPostComments)
  .put("/likeComment/:commentId", verifyToken, likeComment);

export default router;
