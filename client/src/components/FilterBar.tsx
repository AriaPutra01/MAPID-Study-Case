import { REPORT_STATUS } from "../types.ts";

const STATUS_FILTER_TABS = [
  { key: "all", label: "Semua" },
  { key: REPORT_STATUS.PENDING, label: "Pending" },
  { key: REPORT_STATUS.APPROVED, label: "Approved" },
  { key: REPORT_STATUS.REJECTED, label: "Rejected" },
] as const;

interface FilterBarProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function FilterBar({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      {/* Status Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-xl gap-1 text-xs font-medium self-start sm:self-auto">
        {STATUS_FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onStatusFilterChange(tab.key)}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              statusFilter === tab.key
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="w-full sm:w-72">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Cari nama laporan..."
          className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
}
