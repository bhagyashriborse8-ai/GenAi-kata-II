# 🎮 Gamify Learn

An AI-powered flashcard and quiz web application. Select a topic, study AI-generated flashcards, mark what you know, and test yourself in quiz mode — with personalised feedback powered by GPT-4.

---

## 📋 Prerequisites

- **Node.js** v18+ — [Download here](https://nodejs.org/en/download)
- **npm** v9+

---

## ⚙️ Setup

### 1. Clone & Install

```bash
# Install all dependencies (root + client + server)
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Environment Variables

The `.env` file at the root is already pre-configured with the EPAM AI API key:

```
EPAM_AI_ENDPOINT=https://ai-proxy.lab.epam.com/openai/deployments/gpt-4/chat/completions?api-version=2023-08-01-preview
EPAM_AI_KEY=dial-u10g43vnsunzhpkde182z738jli
PORT=3001
```

### 3. Run the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Then open → **http://localhost:5173**

---

## 🏗️ Project Structure

```
GenAi-kata-II/
├── client/               # React + TypeScript + Vite + Tailwind CSS
│   └── src/
│       ├── pages/        # HomePage, FlashCardPage, QuizPage, ResultsPage
│       ├── components/   # UI, flashcard, quiz, progress components
│       ├── context/      # SessionContext (global state)
│       ├── hooks/        # useFlashCards, useCardTracking, useQuiz, useProgress
│       └── services/     # API calls to backend
│
├── server/               # Express + TypeScript
│   └── src/
│       ├── routes/       # /api/flashcards, /api/quiz, /api/feedback
│       ├── controllers/  # Request handlers
│       ├── services/     # OpenAI service + prompt builders
│       └── middleware/   # Error handler, rate limiter
│
└── shared/
    └── types.ts          # Shared TypeScript interfaces
```

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Topic Selection** | Pick from 15 preset tech topics or enter any custom topic |
| **AI Flashcards** | GPT-4 generates keyword/answer cards with difficulty tags |
| **Card Flip** | 3D CSS flip animation — keyword front, answer back |
| **Track Progress** | Mark each card as ✅ Known or 🔁 Still Learning |
| **Quiz Mode** | Multiple-choice OR short-answer — your choice |
| **AI Evaluation** | Short answers evaluated by GPT-4 with explanations |
| **Recommendations** | AI feedback: weak areas, study tips, next topics |
| **Session Summary** | Mastery %, quiz score, full results dashboard |

---

## 🔌 API Endpoints

| Method | URL | Description |
|---|---|---|
| `POST` | `/api/flashcards/generate` | Generate flashcards for a topic |
| `POST` | `/api/quiz/generate` | Generate quiz questions |
| `POST` | `/api/quiz/evaluate` | AI-evaluate a short answer |
| `POST` | `/api/feedback/recommendations` | Get personalised study recommendations |

---

## 🤖 AI Integration

This app uses the **EPAM AI Proxy** — an enterprise Azure OpenAI gateway:

- **Endpoint:** `https://ai-proxy.lab.epam.com/openai/deployments/gpt-4/...`
- **Model:** GPT-4
- **Auth:** `api-key` header
- All AI calls are made server-side to keep the API key secure

