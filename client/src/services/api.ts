import axios from "axios";
import type { CreateReportInput, Report } from "../types.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

export async function fetchReports(filters?: { status?: string; search?: string }): Promise<Report[]> {
  const params: Record<string, string> = {};
  if (filters?.status && filters.status !== "all") {
    params.status = filters.status;
  }
  if (filters?.search?.trim()) {
    params.search = filters.search.trim();
  }

  const response = await api.get<{ data: Report[] }>("/reports", { params });
  return response.data.data;
}

export async function createReport(payload: CreateReportInput): Promise<Report> {
  const response = await api.post<{ data: Report }>("/reports", payload);
  return response.data.data;
}

export async function updateReportStatus(id: number, status: "approved" | "rejected"): Promise<Report> {
  const response = await api.patch<{ data: Report }>(`/reports/${id}/status`, { status });
  return response.data.data;
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error || err.message || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}
