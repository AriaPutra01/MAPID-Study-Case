import { REPORT_STATUS, STATUS_META, type Report } from "../types.ts";

interface SummaryCardsProps {
  reports: Report[];
}

export function SummaryCards({ reports }: SummaryCardsProps) {
  const cards = [
    { label: "Total Ditampilkan", count: reports.length, color: "text-slate-900" },
    {
      label: `Menunggu (${STATUS_META[REPORT_STATUS.PENDING].label})`,
      count: reports.filter((r) => r.status === REPORT_STATUS.PENDING).length,
      color: STATUS_META[REPORT_STATUS.PENDING].colorClass,
    },
    {
      label: `Disetujui (${STATUS_META[REPORT_STATUS.APPROVED].label})`,
      count: reports.filter((r) => r.status === REPORT_STATUS.APPROVED).length,
      color: STATUS_META[REPORT_STATUS.APPROVED].colorClass,
    },
    {
      label: `Ditolak (${STATUS_META[REPORT_STATUS.REJECTED].label})`,
      count: reports.filter((r) => r.status === REPORT_STATUS.REJECTED).length,
      color: STATUS_META[REPORT_STATUS.REJECTED].colorClass,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className={`text-xs font-medium ${card.color}`}>{card.label}</span>
          <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.count}</p>
        </div>
      ))}
    </div>
  );
}
