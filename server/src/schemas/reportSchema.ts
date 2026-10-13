import { z } from "zod";
import { REPORT_STATUSES, UPDATE_STATUSES } from "../types/report.ts";

/**
 * 1. GET /api/reports
 * Validasi query parameter untuk pencarian dan filter status
 */
export const listReportsQuerySchema = z.object({
  status: z.enum(REPORT_STATUSES).optional(),
  search: z.string().trim().max(255).optional(),
});
export type ListReportsQuery = z.infer<typeof listReportsQuerySchema>;

/**
 * 2. POST /api/reports
 * Validasi body JSON saat membuat laporan baru
 */
export const createReportBodySchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(255, "Nama maksimal 255 karakter"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
});
export type CreateReportBody = z.infer<typeof createReportBodySchema>;

/**
 * 3. PATCH /api/reports/:id/status
 * Validasi parameter route :id dan body JSON status
 */
export const reportIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID harus bilangan bulat positif"),
});

export const updateReportStatusBodySchema = z.object({
  status: z.enum(UPDATE_STATUSES),
});
export type UpdateReportStatusBody = z.infer<typeof updateReportStatusBodySchema>;
