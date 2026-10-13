import { z } from "zod";

export const listQuerySchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  search: z.string().trim().max(255).optional(),
});
export type ListQueryRequest = z.infer<typeof listQuerySchema>;

export const createReportSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(255, "Nama maksimal 255 karakter"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
});
export type CreateReportRequest = z.infer<typeof createReportSchema>;

export const updateStatusSchema = z.enum(["approved", "rejected"], {
  error: "Status harus 'approved' atau 'rejected'",
})
export type UpdateStatusRequest = z.infer<typeof updateStatusSchema>;

export const idSchema = z.number().int().positive()
export type IdRequest = z.infer<typeof idSchema>;
