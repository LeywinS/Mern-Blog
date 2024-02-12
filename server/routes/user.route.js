import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router({ mergeParams: true });

router
  .get("/", test)
  .patch("/update/:user", verifyToken, updateUser)
  .delete("/delete/:user", verifyToken, deleteUser)
  .post("/signout", signout);

export default router;
