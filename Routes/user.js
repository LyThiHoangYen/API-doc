import express from "express"; // Import thư viện Express để tạo router
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js"; // Import các controller xử lý logic liên quan đến user.
import { authenticate, restrict } from "../auth/verifyToken.js"; // Import middleware xác thực và kiểm tra quyền.

const router = express.Router(); // Tạo một router mới của Express.

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Lấy thông tin chi tiết của một user dựa trên ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của user cần lấy thông tin
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin user
 *         content:
 *           application/json:
 *             example: { "id": "1", "name": "John Doe", "role": "patient" }
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: User không tìm thấy
 */
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);

/**
 * @swagger
 * /users:
 *   get:
 *     description: Lấy danh sách tất cả user (chỉ dành cho admin)
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách user
 *         content:
 *           application/json:
 *             example: [{ "id": "1", "name": "John Doe", "role": "admin" }]
 *       401:
 *         description: Không có quyền truy cập
 */
router.get("/", authenticate, restrict(["admin"]), getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Cập nhật thông tin user dựa trên ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của user cần cập nhật
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Thông tin user cần cập nhật
 *       required: true
 *       content:
 *         application/json:
 *           example: { "name": "New Name", "email": "newemail@example.com" }
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin user đã cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: User không tìm thấy
 */
router.put("/:id", authenticate, restrict(["patient"]), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Xóa user dựa trên ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của user cần xóa
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, user đã bị xóa
 *       404:
 *         description: User không tìm thấy
 */
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     description: Lấy thông tin hồ sơ của người dùng hiện tại (dành cho patient)
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin hồ sơ của người dùng
 *         content:
 *           application/json:
 *             example: { "id": "1", "name": "John Doe", "role": "patient" }
 *       401:
 *         description: Không có quyền truy cập
 */
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);

/**
 * @swagger
 * /users/appointments/my-appointments:
 *   get:
 *     description: Lấy danh sách các cuộc hẹn của người dùng hiện tại (dành cho patient)
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách các cuộc hẹn
 *         content:
 *           application/json:
 *             example: [{ "appointmentId": "1", "date": "2024-12-01", "status": "confirmed" }]
 *       401:
 *         description: Không có quyền truy cập
 */
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router; // Xuất router để sử dụng ở file khác
