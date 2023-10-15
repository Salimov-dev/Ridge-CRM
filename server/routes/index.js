import express from "express";
// company
import companyRoutes from "./company.routes.js";
// users
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
// objects
import objectsRoutes from "./objects.routes.js";
// meetings
import meetings from "./meetings.routes.js";
// tasks
import tasksRoutes from "./tasks.routes.js";
// uploads
import uploadRoutes from "./upload-avatar.routes.js";
// last contact
import lastContactRoutes from "./last-contact.routes.js";

const router = express.Router({ mergeParams: true });

// company
router.use("/company", companyRoutes);
// users
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
// objects
router.use("/objects", objectsRoutes);
// meetings
router.use("/meetings", meetings);
// tasks
router.use("/tasks", tasksRoutes);
// uploads
router.use("/upload", uploadRoutes);
// last contact
router.use("/lastContact", lastContactRoutes);

export default router;
