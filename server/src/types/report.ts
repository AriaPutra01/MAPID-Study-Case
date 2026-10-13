export const REPORT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];

export const REPORT_STATUSES = [
  REPORT_STATUS.PENDING,
  REPORT_STATUS.APPROVED,
  REPORT_STATUS.REJECTED,
] as const;

export const UPDATE_STATUSES = [
  REPORT_STATUS.APPROVED,
  REPORT_STATUS.REJECTED,
] as const;

export type UpdateReportStatus = (typeof UPDATE_STATUSES)[number];

export interface Report {
  id: number;
  name: string;
  description: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}