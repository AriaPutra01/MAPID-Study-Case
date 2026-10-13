import type { Request, Response } from "express";
import * as reportsService from "../services/reportService.ts";
import * as schema from "../schemas/reportSchema.ts";

export async function getReports(req: Request, res: Response) {
  const input = schema.listQuerySchema.parse(req.params);
  const reports = await reportsService.listReports(input);
  res.status(200).json({ data: reports });
}

export async function createReport(req: Request, res: Response) {
  const input = schema.createReportSchema.parse(req.body);
  const report = await reportsService.createReport(input);
  res.status(201).json({ data: report });
}

export async function updateReportStatus(req: Request, res: Response) {
  const id = schema.idSchema.parse(req.params);
  const status = schema.updateStatusSchema.parse(req.body);
  const report = await reportsService.updateReportStatus(id, status);
  res.status(200).json({ data: report });
}
