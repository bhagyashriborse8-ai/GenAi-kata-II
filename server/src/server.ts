import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import { createServer } from 'http';
import app from './app';

const PORT = process.env.PORT || 3001;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Gamify Learn server running on http://localhost:${PORT}`);
});

