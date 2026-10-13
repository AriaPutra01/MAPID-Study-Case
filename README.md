# Field Report Management

Aplikasi web pengelolaan laporan operasional lapangan berbasis Express.js (TypeScript) dan React 19 (Tailwind CSS v4).

- **Live Application**: [https://field-report.ariaputra.tech](https://field-report.ariaputra.tech)

---

## 🚀 Panduan Menjalankan Project

### 1. Prasyarat
- **Node.js**: versi 20+ LTS
- **PostgreSQL**: instance aktif (lokal atau cloud)

---

### 2. Konfigurasi Database
1. Buat database baru di PostgreSQL (misal: `report_field`).
2. Eksekusi skema database:
   ```bash
   psql -U postgres -d report_field -f server/schema.sql
   ```
3. Salin file environment backend:
   ```bash
   cp server/.env.example server/.env
   ```
4. Sesuaikan `DATABASE_URL` pada `server/.env`:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/report_field
   ```

---

### 3. Menjalankan Aplikasi

Jalankan perintah berikut dari direktori root:

```bash
# 1. Install seluruh dependensi (root, server, dan client)
npm run install:all

# 2. Jalankan server dan client secara bersamaan
npm run dev
```

- **Live Deployment**: `https://field-report.ariaputra.tech`
- **Frontend Client (Lokal)**: `http://localhost:5173`
- **Backend API (Lokal)**: `http://localhost:3000/api`

---

### 4. Menjalankan via Docker Compose (Produksi)

Jalankan seluruh stack aplikasi (PostgreSQL + Express API + Nginx Web) secara otomatis:

```bash
docker compose up -d --build
```

- Aplikasi dapat diakses di: `http://localhost` (Port 80)
- Skema PostgreSQL otomatis diinisialisasi dari `server/schema.sql`.

---

## 📡 REST API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/api/reports` | Mengambil daftar laporan (query: `status`, `search`) |
| `POST` | `/api/reports` | Menambahkan laporan baru (`name`, `description`) |
| `PATCH` | `/api/reports/:id/status` | Mengubah status laporan (`approved` / `rejected`) |

---

## 🧪 Build & Linting

```bash
# Build seluruh aplikasi
npm run build

# Typecheck server
npm run typecheck --prefix server

# Lint client
npm run lint --prefix client
```
