import { Router } from 'express';

import {
  getPeminjaman,
  getPeminjamanById,
  createPeminjaman,
  updatePeminjaman,
  deletePeminjaman,
} from '../controllers/peminjamanController.js';

const router = Router();

router.get('/', getPeminjaman);
router.get('/:id', getPeminjamanById);
router.post('/', createPeminjaman);
router.put('/:id', updatePeminjaman);
router.delete('/:id', deletePeminjaman);

export default router;