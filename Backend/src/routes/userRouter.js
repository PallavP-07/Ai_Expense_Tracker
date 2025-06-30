import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.delete("/me", protect, deleteUser);

export default router;
