export const REPORT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];

export const STATUS_META = {
  [REPORT_STATUS.PENDING]: {
    label: "Menunggu",
    colorClass: "text-status-pending",
    badgeClass: "bg-status-pending-bg text-status-pending border-status-pending-border",
  },
  [REPORT_STATUS.APPROVED]: {
    label: "Disetujui",
    colorClass: "text-status-approved",
    badgeClass: "bg-status-approved-bg text-status-approved border-status-approved-border",
  },
  [REPORT_STATUS.REJECTED]: {
    label: "Ditolak",
    colorClass: "text-status-rejected",
    badgeClass: "bg-status-rejected-bg text-status-rejected border-status-rejected-border",
  },
} as const;

export interface Report {
  id: number;
  name: string;
  description: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateReportInput {
  name: string;
  description: string;
}
