import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getcomments,
} from "../controllers/comment.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .post("/create", verifyToken, createComment)
  .get("/getPostComments/:postId", getPostComments)
  .put("/likeComment/:commentId", verifyToken, likeComment)
  .put("/editComment/:commentId", verifyToken, editComment)
  .delete("/deleteComment/:commentId", verifyToken, deleteComment)
  .get("/getcomments", verifyToken, getcomments);

export default router;
