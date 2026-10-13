import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import type { CreateReportInput } from "../types.ts";
import { getApiErrorMessage } from "../services/api.ts";

interface ReportFormProps {
  onSubmit: (data: CreateReportInput) => Promise<void>;
  isLoading: boolean;
}

const createReportFormSchema = z.object({
  name: z.string().trim().min(1, "Nama laporan wajib diisi").max(255, "Nama maksimal 255 karakter"),
  description: z.string().trim().min(1, "Deskripsi laporan wajib diisi"),
});

export function ReportForm({ onSubmit, isLoading }: ReportFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const result = createReportFormSchema.safeParse({ name, description });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Data laporan tidak valid");
      return;
    }

    setError(null);
    try {
      await onSubmit(result.data);
      setName("");
      setDescription("");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Gagal menambahkan laporan"));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">
        Buat Laporan Baru
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        Masukkan data laporan lapangan yang perlu ditinjau.
      </p>

      {error && (
        <div className="mb-4 p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Nama Laporan <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Inspeksi Saluran Irigasi Blok A"
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
            Deskripsi Laporan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan temuan kondisi lapangan secara ringkas..."
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-y"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isLoading ? "Menyimpan..." : "Kirim Laporan"}
          </button>
        </div>
      </form>
    </div>
  );
}
