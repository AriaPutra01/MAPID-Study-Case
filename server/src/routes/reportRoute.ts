import { Router } from "express";
import * as controller from "../controllers/ReportController.ts";

const router = Router();

router.get("/", controller.getReports);
router.post("/", controller.createReport);
router.patch("/:id/status", controller.updateReportStatus);

export default router;
