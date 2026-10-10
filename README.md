# Perpustakaan Peminjaman API

**Nama:** Farrel Satya Lukito

## Deskripsi Proyek

Perpustakaan Peminjaman API merupakan layanan REST API yang dikembangkan untuk mengelola informasi peminjaman buku di perpustakaan. Aplikasi ini dibangun menggunakan Node.js dan Express.js, dengan Supabase sebagai layanan database untuk menyimpan data.

API ini menyediakan beberapa fungsi utama, yaitu:

- Menampilkan seluruh catatan peminjaman buku.
- Mengakses informasi peminjaman berdasarkan ID.
- Menambahkan catatan peminjaman baru.
- Mengubah informasi peminjaman yang sudah tersimpan.
- Menghapus catatan peminjaman.
- Menampilkan data berdasarkan status peminjaman tertentu.

## Teknologi yang Digunakan

- **Node.js** — lingkungan untuk menjalankan JavaScript di sisi server.
- **Express.js** — framework untuk membangun endpoint API.
- **Supabase** — layanan database berbasis PostgreSQL.
- **JavaScript ES Modules** — sistem modul yang digunakan dalam kode aplikasi.

## Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan Node.js dan npm telah terpasang pada komputer.

## Instalasi dan Menjalankan Aplikasi

### 1. Mengunduh repositori

```bash
git clone https://github.com/farrrrrel/perpustakaan-peminjaman-api
```

### 2. Masuk ke direktori proyek

```bash
cd perpustakaan-peminjaman-api
```

### 3. Memasang dependensi

```bash
npm install
```

### 4. Mengatur konfigurasi lingkungan

Buat file `.env` pada direktori utama proyek, kemudian tambahkan konfigurasi berikut:

```env
SUPABASE_URL=URL_PROYEK_SUPABASE
SUPABASE_KEY=SUPABASE_PUBLISHABLE_KEY
PORT=3000
```

Sesuaikan nilai URL dan API key dengan konfigurasi proyek Supabase yang digunakan. Pastikan file `.env` tidak ikut diunggah ke repositori publik.

### 5. Menjalankan server

```bash
npm run dev
```

Perintah tersebut menjalankan server dalam mode pengembangan.

### 6. Memeriksa API

Buka alamat berikut melalui browser atau aplikasi pengujian API:

`http://localhost:3000`

Jika server berjalan dengan baik, endpoint utama akan memberikan respons dari aplikasi.

## Daftar Endpoint API

| Metode | Endpoint | Kegunaan |
|---|---|---|
| GET | `/` | Memeriksa API dan melihat daftar endpoint |
| GET | `/peminjaman` | Mengambil seluruh data peminjaman |
| GET | `/peminjaman/:id` | Mengambil detail peminjaman berdasarkan ID |
| POST | `/peminjaman` | Membuat data peminjaman baru |
| PUT | `/peminjaman/:id` | Memperbarui data peminjaman |
| DELETE | `/peminjaman/:id` | Menghapus data peminjaman |

### Filter Status Peminjaman

Data dapat disaring berdasarkan status melalui query parameter `status` pada endpoint GET.

Contoh permintaan:

```http
GET /peminjaman?status=Dipinjam
GET /peminjaman?status=Dikembalikan
GET /peminjaman?status=Terlambat
```

Status peminjaman yang digunakan dalam aplikasi meliputi:

- `Dipinjam`
- `Dikembalikan`
- `Terlambat`

## Contoh Penggunaan API

### 1. Menambahkan Data Peminjaman

**Metode:** `POST /peminjaman`

Contoh request body:

```json
{
  "nama_peminjam": "Budi",
  "judul_buku": "Belajar Node.js",
  "tanggal_jatuh_tempo": "2026-10-20",
  "status": "Dipinjam"
}
```

Contoh respons dengan status `201 Created`:

```json
{
  "success": true,
  "message": "Data peminjaman berhasil ditambahkan.",
  "data": {
    "id": "9f34367c-e978-434f-bb9f-5eb27b86c73c",
    "nama_peminjam": "Budi",
    "judul_buku": "Belajar Node.js",
    "tanggal_pinjam": "2026-10-10",
    "tanggal_jatuh_tempo": "2026-10-20",
    "tanggal_kembali": null,
    "status": "Dipinjam",
    "created_at": "2026-10-10T10:58:36.110735+00:00"
  }
}
```

### 2. Menampilkan Seluruh Data Peminjaman

**Metode:** `GET /peminjaman`

Endpoint ini digunakan untuk memperoleh daftar catatan peminjaman yang tersimpan di database.

Contoh respons dengan status `200 OK`:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "9f34367c-e978-434f-bb9f-5eb27b86c73c",
      "nama_peminjam": "Budi",
      "judul_buku": "Belajar Node.js",
      "tanggal_pinjam": "2026-10-10",
      "tanggal_jatuh_tempo": "2026-10-20",
      "tanggal_kembali": null,
      "status": "Dipinjam",
      "created_at": "2026-10-10T10:58:36.110735+00:00"
    },
    {
      "id": "676f55ed-32d3-458e-8842-a77e8ffa58ef",
      "nama_peminjam": "Sari",
      "judul_buku": "Basis Data",
      "tanggal_pinjam": "2026-10-10",
      "tanggal_jatuh_tempo": "2026-10-05",
      "tanggal_kembali": null,
      "status": "Terlambat",
      "created_at": "2026-10-10T10:58:35.547925+00:00"
    }
  ]
}
```

### 3. Memperbarui Data Peminjaman

**Metode:** `PUT /peminjaman/:id`

Endpoint ini memungkinkan perubahan informasi peminjaman berdasarkan ID data yang ingin diperbarui.

Contoh request body untuk mencatat pengembalian:

```json
{
  "tanggal_kembali": "2026-10-15",
  "status": "Dikembalikan"
}
```

Contoh respons dengan status `200 OK`:

```json
{
  "success": true,
  "message": "Data peminjaman berhasil diperbarui.",
  "data": {
    "id": "9f34367c-e978-434f-bb9f-5eb27b86c73c",
    "nama_peminjam": "Budi",
    "judul_buku": "Belajar Node.js",
    "tanggal_pinjam": "2026-10-10",
    "tanggal_jatuh_tempo": "2026-10-20",
    "tanggal_kembali": "2026-10-15",
    "status": "Dikembalikan",
    "created_at": "2026-10-10T10:58:36.110735+00:00"
  }
}
```

### 4. Menghapus Data Peminjaman

**Metode:** `DELETE /peminjaman/:id`

Endpoint ini digunakan untuk menghapus catatan peminjaman berdasarkan ID yang diberikan.

Contoh respons dengan status `200 OK`:

```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus.",
  "data": {
    "id": "9f34367c-e978-434f-bb9f-5eb27b86c73c",
    "nama_peminjam": "Budi",
    "judul_buku": "Belajar Node.js",
    "tanggal_pinjam": "2026-10-10",
    "tanggal_jatuh_tempo": "2026-10-20",
    "tanggal_kembali": null,
    "status": "Dipinjam",
    "created_at": "2026-10-10T10:58:36.110735+00:00"
  }
}
```

### 5. Menangani Data yang Tidak Ditemukan

**Metode:** `GET /peminjaman/:id`

Apabila ID yang diminta tidak ditemukan dalam database, API mengembalikan respons `404 Not Found`.

```json
{
  "success": false,
  "message": "Data peminjaman tidak ditemukan."
}
```

### 6. Menangani ID yang Tidak Valid

**Metode:** `PUT /peminjaman/:id`

Jika ID yang dikirim tidak sesuai dengan format UUID yang dibutuhkan database, proses pembaruan dapat gagal.

Contoh respons `400 Bad Request`:

```json
{
  "success": false,
  "message": "Gagal memperbarui data peminjaman.",
  "error": "invalid input syntax for type uuid: \"ID_KAMU\""
}
```

## Struktur Database

Aplikasi menggunakan tabel `loans` pada Supabase yang berbasis PostgreSQL untuk menyimpan informasi peminjaman buku.

| Kolom | Tipe Data | Nilai Default | Keterangan |
|---|---|---|---|
| `id` | UUID | `gen_random_uuid()` | ID unik sekaligus primary key |
| `nama_peminjam` | TEXT | Tidak ada | Nama orang yang meminjam buku |
| `judul_buku` | TEXT | Tidak ada | Judul buku yang dipinjam |
| `tanggal_pinjam` | DATE | `CURRENT_DATE` | Tanggal peminjaman |
| `tanggal_jatuh_tempo` | DATE | Tidak ada | Batas waktu pengembalian buku |
| `tanggal_kembali` | DATE | `NULL` | Tanggal buku dikembalikan |
| `status` | TEXT | `'Dipinjam'` | Kondisi peminjaman |
| `created_at` | TIMESTAMPTZ | `now()` | Waktu pencatatan data |

Pada proses penambahan data melalui `POST /peminjaman`, field yang wajib diberikan adalah `nama_peminjam`, `judul_buku`, dan `tanggal_jatuh_tempo`. Kolom lainnya dapat menggunakan nilai default atau dikosongkan sesuai ketentuan database.

## Deployment

Aplikasi tersedia secara online melalui Vercel pada alamat berikut:

https://perpustakaan-peminjaman-api.vercel.app/
