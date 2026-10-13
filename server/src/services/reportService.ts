import {
  type Report,
  type ReportStatus,
  type UpdateReportStatus,
  REPORT_STATUS,
} from "../types/report.ts";
import { pool } from "../db/pool.ts";
import { HttpError } from "../utils/error.ts";

export interface ListReportsFilter {
  status?: ReportStatus;
  search?: string;
}

export interface CreateReportInput {
  name: string;
  description: string;
}

export async function listReports(filter: ListReportsFilter): Promise<Report[]> {
  const { status, search } = filter;
  const { rows } = await pool.query<Report>(
    `SELECT * FROM reports
      WHERE ($1::text IS NULL OR status = $1)
        AND ($2::text IS NULL OR name ILIKE '%' || $2 || '%')
      ORDER BY created_at DESC, id DESC`,
    [status ?? null, search ?? null],
  );
  return rows;
}

export async function createReport(input: CreateReportInput): Promise<Report> {
  const { rows } = await pool.query<Report>(
    "INSERT INTO reports (name, description) VALUES ($1, $2) RETURNING *",
    [input.name, input.description],
  );
  return rows[0];
}

export async function updateReportStatus(
  id: number,
  status: UpdateReportStatus
): Promise<Report> {
  const existing = await pool.query(
    "SELECT id, status FROM reports WHERE id = $1",
    [id],
  );
  if (existing.rowCount === 0) {
    throw new HttpError(404, "Laporan tidak ditemukan");
  }
  if (existing.rows[0].status !== REPORT_STATUS.PENDING) {
    throw new HttpError(409, "Laporan sudah diproses");
  }

  const { rows } = await pool.query<Report>(
    `UPDATE reports
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *`,
    [status, id],
  );

  return rows[0];
}
