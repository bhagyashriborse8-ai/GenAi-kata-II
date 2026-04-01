import { Router } from 'express';
import { generateFlashCards } from '../controllers/flashcardController';
import rateLimit from 'express-rate-limit';

const router = Router();
const limiter = rateLimit({ windowMs: 60_000, max: 20, message: 'Too many requests, please slow down.' });

router.post('/generate', limiter, generateFlashCards);

export default router;

