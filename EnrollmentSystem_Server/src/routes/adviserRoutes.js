import express from 'express';
import {
  getAllAdvisers,
  getAdviserById,
  createAdviser,
  updateAdviser,
  deleteAdviser,
} from '../controllers/adviserController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, requiring authentication
router.use(protect);

router.get('/', authorize('registrar'), getAllAdvisers);

router.get('/:id', authorize('registrar', 'adviser'), getAdviserById);

router.post('/', authorize('registrar'), createAdviser);

router.put('/:id', authorize('registrar', 'adviser'), updateAdviser);

router.delete('/:id', authorize('registrar'), deleteAdviser);

export default router;
