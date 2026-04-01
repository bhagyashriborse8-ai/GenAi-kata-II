import { Router } from 'express';
import { generateQuiz, evaluateAnswer } from '../controllers/quizController';
import rateLimit from 'express-rate-limit';

const router = Router();
const limiter = rateLimit({ windowMs: 60_000, max: 30, message: 'Too many requests, please slow down.' });

router.post('/generate', limiter, generateQuiz);
router.post('/evaluate', limiter, evaluateAnswer);

export default router;

