import {
  getAllpeminjaman,
  getpeminjamanById as findpeminjamanById,
  createpeminjaman as insertpeminjaman,
  updatepeminjaman as editpeminjaman,
  deletepeminjaman as removepeminjaman,
} from '../models/peminjamanModel.js';

const VALID_STATUSES = ['Dipinjam', 'Dikembalikan', 'Terlambat'];

const ALLOWED_FIELDS = [
  'nama_peminjam',
  'judul_buku',
  'tanggal_pinjam',
  'tanggal_jatuh_tempo',
  'tanggal_kembali',
  'status',
];

// Mengambil semua data peminjaman
export async function getPeminjaman(req, res) {
  try {
    const { status } = req.query;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const { data, error } = await getAllpeminjaman(status);

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

// Mengambil satu data peminjaman berdasarkan ID
export async function getPeminjamanById(req, res) {
  try {
    const { data, error } = await findpeminjamanById(req.params.id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data peminjaman.',
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data peminjaman tidak ditemukan.',
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

// Menambahkan data peminjaman
export async function createPeminjaman(req, res) {
  try {
    const {
      nama_peminjam,
      judul_buku,
      tanggal_pinjam,
      tanggal_jatuh_tempo,
      tanggal_kembali,
      status,
    } = req.body;

    if (!nama_peminjam || !judul_buku || !tanggal_jatuh_tempo) {
      return res.status(400).json({
        success: false,
        message:
          'nama_peminjam, judul_buku, dan tanggal_jatuh_tempo wajib diisi.',
      });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const peminjamanData = {
      nama_peminjam,
      judul_buku,
      tanggal_jatuh_tempo,
    };

    if (tanggal_pinjam !== undefined) {
      peminjamanData.tanggal_pinjam = tanggal_pinjam;
    }

    if (tanggal_kembali !== undefined) {
      peminjamanData.tanggal_kembali = tanggal_kembali;
    }

    if (status !== undefined) {
      peminjamanData.status = status;
    }

    const { data, error } = await insertpeminjaman(peminjamanData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Gagal menambahkan data peminjaman.',
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Data peminjaman berhasil ditambahkan.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

// Memperbarui data peminjaman
export async function updatePeminjaman(req, res) {
  try {
    const peminjamanData = {};

    for (const field of ALLOWED_FIELDS) {
      if (req.body[field] !== undefined) {
        peminjamanData[field] = req.body[field];
      }
    }

    if (Object.keys(peminjamanData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Isi setidaknya satu field yang ingin diperbarui.',
      });
    }

    if (
      peminjamanData.status !== undefined &&
      !VALID_STATUSES.includes(peminjamanData.status)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const { data, error } = await editpeminjaman(
      req.params.id,
      peminjamanData
    );

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Data peminjaman tidak ditemukan.',
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Gagal memperbarui data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil diperbarui.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

// Menghapus data peminjaman
export async function deletePeminjaman(req, res) {
  try {
    const { data, error } = await removepeminjaman(req.params.id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Data peminjaman tidak ditemukan.',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil dihapus.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}