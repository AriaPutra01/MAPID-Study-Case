import { REPORT_STATUS, STATUS_META, type Report, type ReportStatus } from "../types.ts";

interface ReportTableProps {
  reports: Report[];
  isLoading: boolean;
  actionLoadingId: number | null;
  onUpdateStatus: (id: number, status: "approved" | "rejected") => Promise<void>;
}

function StatusBadge({ status }: { status: ReportStatus }) {
  const meta = STATUS_META[status];
  if (!meta) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${meta.badgeClass}`}>
      {meta.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateStr;
  }
}

export function ReportTable({
  reports,
  isLoading,
  actionLoadingId,
  onUpdateStatus,
}: ReportTableProps) {
  if (isLoading && reports.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600 mb-3" />
        <p className="text-sm">Memuat data laporan...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        <svg
          className="mx-auto h-12 w-12 text-slate-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-base font-medium text-slate-700">Belum ada laporan</p>
        <p className="text-sm text-slate-500 mt-1">
          Gunakan formulir di atas untuk membuat laporan lapangan pertama.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3.5 w-16">ID</th>
              <th scope="col" className="px-6 py-3.5">Nama Laporan</th>
              <th scope="col" className="px-6 py-3.5">Deskripsi</th>
              <th scope="col" className="px-6 py-3.5 w-32">Status</th>
              <th scope="col" className="px-6 py-3.5 w-40">Tanggal Dibuat</th>
              <th scope="col" className="px-6 py-3.5 w-40">Terakhir Diperbarui</th>
              <th scope="col" className="px-6 py-3.5 w-48 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reports.map((report) => {
              const isProcessing = actionLoadingId === report.id;
              const isPending = report.status === REPORT_STATUS.PENDING;

              return (
                <tr key={report.id} className="hover:bg-slate-50/75 transition">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    #{report.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-slate-600" title={report.description}>
                    {report.description}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(report.created_at)}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(report.updated_at)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {isPending ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => onUpdateStatus(report.id, REPORT_STATUS.APPROVED)}
                          className="px-3 py-1.5 text-xs font-medium text-status-approved bg-status-approved-bg hover:opacity-80 border border-status-approved-border rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isProcessing ? "..." : "Approve"}
                        </button>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => onUpdateStatus(report.id, REPORT_STATUS.REJECTED)}
                          className="px-3 py-1.5 text-xs font-medium text-status-rejected bg-status-rejected-bg hover:opacity-80 border border-status-rejected-border rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isProcessing ? "..." : "Reject"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Selesai diproses
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
