import express from "express";
import { register, login } from "../Controllers/authController.js";

// Khởi tạo một router mới từ express.Router()
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     description: "Đăng ký người dùng mới"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Người dùng đã được đăng ký thành công"
 *       400:
 *         description: "Yêu cầu không hợp lệ (ví dụ: thiếu thông tin)"
 *       409:
 *         description: "Tên người dùng hoặc email đã tồn tại"
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     description: "Đăng nhập người dùng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Đăng nhập thành công, trả về token"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: "Sai tên người dùng hoặc mật khẩu"
 *       400:
 *         description: "Yêu cầu không hợp lệ"
 */
router.post("/login", login);

export default router;
