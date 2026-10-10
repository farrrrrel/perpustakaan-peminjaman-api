import express from 'express';
import peminjamanRoutes from './routes/peminjamanRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'perpustakaan peminjaman API is running.',
    endpoints: {
      getAllPeminjaman: 'GET /peminjaman',
      getPeminjamanById: 'GET /peminjaman/:id',
      createPeminjaman: 'POST /peminjaman',
      updatePeminjaman: 'PUT /peminjaman/:id',
      deletePeminjaman: 'DELETE /peminjaman/:id',
      filterByStatus: 'GET /peminjaman?status=Terlambat',
    },
  });
});

app.use('/peminjaman', peminjamanRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan.',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
  });
});

export default app;