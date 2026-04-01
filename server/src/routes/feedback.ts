import { Router } from 'express';
import { getRecommendations } from '../controllers/feedbackController';
import rateLimit from 'express-rate-limit';

const router = Router();
const limiter = rateLimit({ windowMs: 60_000, max: 10, message: 'Too many requests, please slow down.' });

router.post('/recommendations', limiter, getRecommendations);

export default router;

