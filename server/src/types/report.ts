export type ReportStatus = "pending" | "approved" | "rejected";

export interface Report {
  id: number;
  name: string;
  description: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}