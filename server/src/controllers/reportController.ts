import type { Request, Response } from "express";
import * as reportsService from "../services/reportService.ts";
import * as schema from "../schemas/reportSchema.ts";

export async function getReports(req: Request, res: Response) {
  const query = schema.listReportsQuerySchema.parse(req.query);
  const reports = await reportsService.listReports(query);
  res.status(200).json({ data: reports });
}

export async function createReport(req: Request, res: Response) {
  const body = schema.createReportBodySchema.parse(req.body);
  const report = await reportsService.createReport(body);
  res.status(201).json({ data: report });
}

export async function updateReportStatus(req: Request, res: Response) {
  const { id } = schema.reportIdParamSchema.parse(req.params);
  const { status } = schema.updateReportStatusBodySchema.parse(req.body);
  const report = await reportsService.updateReportStatus(id, status);
  res.status(200).json({ data: report });
}
