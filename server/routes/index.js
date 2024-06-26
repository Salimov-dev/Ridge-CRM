import express from "express";
// routes
import authRoutes from "./auth.routes.js";
import emailActivateRoutes from "./email-activate.routes.js";
import passwordRoutes from "./password.routes.js";
import userRoutes from "./user.routes.js";
import paymentRoutes from "./payment.routes.js";
import objectsRoutes from "./objects.routes.js";
import meetings from "./meetings.routes.js";
import tasksRoutes from "./tasks.routes.js";
import avatarRoutes from "./avatar.routes.js";
import lastContactRoutes from "./last-contact.routes.js";
import presentationsRoutes from "./presentations.routes.js";
import userLicenseRoutes from "./user-license.routes.js";
import companyRoutes from "./company.routes.js";
import contactRoutes from "./contacts.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/activate", emailActivateRoutes);
router.use("/payment", paymentRoutes);
router.use("/password", passwordRoutes);
router.use("/user", userRoutes);
router.use("/objects", objectsRoutes);
router.use("/meetings", meetings);
router.use("/tasks", tasksRoutes);
router.use("/avatar", avatarRoutes);
router.use("/lastContact", lastContactRoutes);
router.use("/presentations", presentationsRoutes);
router.use("/userLicense", userLicenseRoutes);
router.use("/company", companyRoutes);
router.use("/contact", contactRoutes);

export default router;
