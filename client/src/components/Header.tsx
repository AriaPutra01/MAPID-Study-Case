interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function Header({ onRefresh, isLoading }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              Field Report Management
            </h1>
            <p className="text-xs text-slate-500">Dashboard Pengelolaan Laporan Lapangan</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-xs font-medium px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
        >
          {isLoading ? "Menyegarkan..." : "Segarkan Data"}
        </button>
      </div>
    </header>
  );
}
