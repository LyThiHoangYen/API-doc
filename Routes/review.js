import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

// Định nghĩa các route cho tài nguyên review

/**
 * @swagger
 * /reviews:
 *   get:
 *     description: Get all reviews
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reviewId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *   post:
 *     description: Create a new review
 *     security:
 *       - bearerAuth: []  # Token xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       401:
 *         description: Unauthorized (Invalid token)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router
  .route("/")
  .get(getAllReviews)  // Lấy tất cả các đánh giá
  .post(authenticate, restrict(["patient"]), createReview); // Tạo đánh giá mới

export default router;
