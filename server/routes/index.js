import express from "express";
// company
import companyRoutes from "./company.routes.js";
// users
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import userStatusRoutes from "./user-status.routes.js";
// objects
import objectsRoutes from "./objects.routes.js";
import objectStatusRoutes from "./object-status.routes.js";
import objectTypeRoutes from "./object-type.routes.js";
import objectConditionsRoutes from "./object-conditions.routes.js";
// objects params
import districtsRoutes from "./districts.routes.js";
import metroRoutes from "./metro.routes.js";
import workingPositionRoutes from "./working-position.routes.js";
import currentRenterRoutes from "./current-renter.routes.js";
import rentTypeRoutes from "./rent-type.routes.js";
import estateTypeRoutes from "./estate-type.routes.js";
// meetings
import meetings from "./meetings.routes.js";
import meetingStatus from "./meeting-status.routes.js";
import meetingType from "./meeting-type.routes.js";
// tasks
import tasksRoutes from "./tasks.routes.js";
import ridgeTasksRoutes from "./ridge-tasks.routes.js";
// ridge
import ridgeObjectsRoutes from "./ridge-objects.routes.js";
import ridgeObjectStatusRoutes from "./ridge-object-status.routes.js";
// uploads
import uploadRoutes from "./upload-avatar.routes.js";

const router = express.Router({ mergeParams: true });

// company
router.use("/company", companyRoutes);
// users
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/userStatus", userStatusRoutes);
// objects
router.use("/objects", objectsRoutes);
router.use("/objectStatus", objectStatusRoutes);
router.use("/objectConditions", objectConditionsRoutes);
router.use("/objectType", objectTypeRoutes);
// objects params
router.use("/districts", districtsRoutes);
router.use("/metro", metroRoutes);
router.use("/workingPosition", workingPositionRoutes);
router.use("/currentRenter", currentRenterRoutes);
router.use("/rentType", rentTypeRoutes);
router.use("/estateType", estateTypeRoutes);
// meetings
router.use("/meetings", meetings);
router.use("/meetingStatus", meetingStatus);
router.use("/meetingType", meetingType);
// tasks
router.use("/tasks", tasksRoutes);
// ridge
router.use("/ridge", ridgeObjectsRoutes);
router.use("/ridgeTasks", ridgeTasksRoutes);
router.use("/ridgeObjectStatus", ridgeObjectStatusRoutes);
// uploads
router.use("/upload", uploadRoutes);

export default router;
