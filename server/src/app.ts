import express from 'express';
import cors from 'cors';
import flashcardsRouter from './routes/flashcards';
import quizRouter from './routes/quiz';
import feedbackRouter from './routes/feedback';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/flashcards', flashcardsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/feedback', feedbackRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Gamify Learn API is running' });
});

app.use(errorHandler);

export default app;

