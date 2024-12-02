import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

const router = express.Router();

/**
 * @swagger
 * /checkout-session/{doctorId}:
 *   post:
 *     description: Create a checkout session for booking a doctor
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully created checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                 url:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid token)
 *       400:
 *         description: Bad request (Invalid doctor ID or other input)
 *       404:
 *         description: Doctor not found
 */
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
