import { useCallback, useEffect, useState } from "react";
import { STATUS_META, type CreateReportInput, type Report } from "./types.ts";
import * as api from "./services/api.ts";
import { useDebounce } from "./hooks/useDebounce.ts";
import { Header } from "./components/Header.tsx";
import { AlertBanner, type AlertState } from "./components/AlertBanner.tsx";
import { SummaryCards } from "./components/SummaryCards.tsx";
import { ReportForm } from "./components/ReportForm.tsx";
import { FilterBar } from "./components/FilterBar.tsx";
import { ReportTable } from "./components/ReportTable.tsx";

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const reloadReports = useCallback(() => {
    setIsLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    api
      .fetchReports({ status: statusFilter, search: debouncedSearch })
      .then((data) => {
        if (!ignore) {
          setReports(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setAlert({
            type: "error",
            message: api.getApiErrorMessage(err, "Gagal memuat data laporan"),
          });
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [statusFilter, debouncedSearch, refreshTrigger]);

  const handleCreateReport = async (payload: CreateReportInput) => {
    setIsSubmitting(true);
    try {
      await api.createReport(payload);
      setAlert({ type: "success", message: "Laporan baru berhasil ditambahkan!" });
      reloadReports();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: "approved" | "rejected") => {
    setActionLoadingId(id);
    try {
      await api.updateReportStatus(id, status);
      const actionLabel = STATUS_META[status]?.label.toLowerCase() ?? status;
      setAlert({
        type: "success",
        message: `Laporan #${id} berhasil di-${actionLabel}.`,
      });
      reloadReports();
    } catch (err: unknown) {
      setAlert({
        type: "error",
        message: api.getApiErrorMessage(err, "Gagal memperbarui status"),
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onRefresh={reloadReports} isLoading={isLoading} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AlertBanner alert={alert} onClose={() => setAlert(null)} />
        <SummaryCards reports={reports} />
        <ReportForm onSubmit={handleCreateReport} isLoading={isSubmitting} />
        <FilterBar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <ReportTable
          reports={reports}
          isLoading={isLoading}
          actionLoadingId={actionLoadingId}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
    </div>
  );
}
