export interface AlertState {
  type: "success" | "error";
  message: string;
}

interface AlertBannerProps {
  alert: AlertState | null;
  onClose: () => void;
}

export function AlertBanner({ alert, onClose }: AlertBannerProps) {
  if (!alert) return null;

  const isSuccess = alert.type === "success";

  return (
    <div
      className={`mb-6 p-4 rounded-xl border flex items-center justify-between text-sm ${
        isSuccess
          ? "bg-status-approved-bg border-status-approved-border text-status-approved"
          : "bg-status-rejected-bg border-status-rejected-border text-status-rejected"
      }`}
    >
      <span>{alert.message}</span>
      <button
        type="button"
        onClick={onClose}
        className="font-semibold text-xs ml-4 cursor-pointer hover:underline"
      >
        Tutup
      </button>
    </div>
  );
}
