import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// Định tuyến lồng để xử lý các đánh giá liên quan đến bác sĩ
router.use("/:doctorId/reviews", reviewRouter);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     description: Get a single doctor by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctorId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 specialization:
 *                   type: string
 *                 experience:
 *                   type: string
 *       404:
 *         description: Doctor not found
 */
router.get("/:id", getSingleDoctor);

/**
 * @swagger
 * /doctors:
 *   get:
 *     description: Get all doctors
 *     responses:
 *       200:
 *         description: Successfully retrieved all doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   doctorId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   specialization:
 *                     type: string
 *                   experience:
 *                     type: string
 */
router.get("/", getAllDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     description: Update doctor information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated doctor
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Doctor not found
 */
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     description: Delete doctor information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted doctor
 *       404:
 *         description: Doctor not found
 */
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

/**
 * @swagger
 * /doctors/profile/me:
 *   get:
 *     description: Get the current logged-in doctor's profile
 *     security:
 *       - bearerAuth: []  # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully retrieved doctor profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctorId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 specialization:
 *                   type: string
 *                 experience:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid token)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
