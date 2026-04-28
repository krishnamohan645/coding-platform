# CodeMaster - Coding Learning Platform

CodeMaster is a full-stack coding education platform for learning programming languages, following structured roadmaps, reading concept content, solving practice problems, tracking progress, and getting AI-powered coding help.

The project is built with a React/Vite frontend, an Express.js backend, PostgreSQL with Sequelize, JWT cookie authentication, Google OAuth, email OTP login, Judge0 code execution, and Groq-powered AI assistance.

## Features

- Language learning dashboard with progress cards and recent activity.
- Programming language catalog with topics, subtopics, concept content, and practice problems.
- Global coding problems list with difficulty, tags, examples, constraints, and templates.
- Monaco-based interactive code editor.
- Code run and submit flow through a Judge0-compatible execution server.
- User activity tracking for attempted and solved problems.
- Learning roadmap with topic completion tracking.
- Profile and statistics pages for solved problems, streak, rank, progress, and activity.
- Email OTP authentication with secure HTTP-only cookies.
- Google OAuth login.
- AI coding assistant chat and AI-generated problem hints.
- REST API for languages, topics, subtopics, content, problems, practice problems, users, activity, authentication, and AI.

## Tech Stack

**Frontend**

- React 18
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Material UI
- Monaco Editor
- Axios
- Google OAuth

**Backend**

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- Cookie Parser
- Nodemailer
- Express Rate Limit
- Google Auth Library
- Groq SDK

**External Services**

- PostgreSQL database
- Gmail SMTP or Gmail app password for OTP email
- Google OAuth Client ID
- Groq API key
- Judge0-compatible code execution API

## Project Structure

```text
Code-Compiler/
|-- Client/                  # React/Vite frontend
|   |-- src/
|   |   |-- components/      # Shared UI, layout, login, editor, AI chat
|   |   |-- pages/           # Dashboard, languages, problems, roadmap, profile
|   |   |-- store/           # Redux store
|   |   `-- config/          # API configuration
|   `-- package.json
|-- Server/                  # Express backend
|   |-- api/
|   |   |-- controllers/     # Request handlers
|   |   |-- middlewares/     # Auth, validation, rate limit, error handling
|   |   |-- models/          # Sequelize models
|   |   |-- routes/          # API route definitions
|   |   `-- utils/           # Email, OTP, cookie helpers
|   |-- config/              # Database and JWT config
|   |-- seed.js              # Development seed script
|   `-- package.json
`-- README.md
```

## Getting Started

### Prerequisites

Install these before running the project:

- Node.js 18 or newer
- npm
- PostgreSQL database
- Google OAuth credentials
- Gmail app password or SMTP-compatible Gmail credentials
- Groq API key
- Judge0-compatible execution server

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd Code-Compiler
```

Install backend dependencies:

```bash
cd Server
npm install
```

Install frontend dependencies:

```bash
cd ../Client
npm install
```

## Environment Variables

Create a `.env` file inside `Server/`:

```env
PORT=5000
NODE_ENV=development

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432

JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GROQ_API_KEY=your_groq_api_key
```

Create a `.env` file inside `Client/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

> Note: The server database config currently enables PostgreSQL SSL. If you use a local PostgreSQL database without SSL, update `Server/config/database.js` for your local setup.

## Running Locally

Start the backend server:

```bash
cd Server
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

Start the frontend:

```bash
cd Client
npm run dev
```

The app will run on:

```text
http://localhost:5173
```

Health check:

```text
GET http://localhost:5000/health
```

## Database Seeding

The backend includes a seed script that creates sample languages, topics, subtopics, content, practice problems, global problems, and a test user.

Run it from the `Server/` directory:

```bash
node seed.js
```

Important: `seed.js` uses `sequelize.sync({ force: true })`, which wipes existing database tables before inserting seed data. Use it only on a development database.

Sample test user created by the seed script:

```text
Email: test@example.com
Password: password123
```

## Available Scripts

Backend scripts:

```bash
npm run dev      # Start server with nodemon
npm start        # Start server with node
npm test         # Placeholder test command
```

Frontend scripts:

```bash
npm run dev      # Start Vite development server
npm run build    # Build production frontend
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Overview

Base URL:

```text
http://localhost:5000/api
```

| Module | Routes |
| --- | --- |
| Auth | `/auth/send-otp`, `/auth/verify-otp`, `/auth/google-login`, `/auth/logout` |
| Users | `/user/me`, `/user/get-users`, `/user/get-users/:id` |
| Languages | `/languages/get-languages`, `/languages/get-languages/:id`, `/languages/roadmap` |
| Topics | `/topics/get-topics`, `/topics/get-topics/:id` |
| Subtopics | `/subtopics/get-subtopics`, `/subtopics/get-subtopics/:id` |
| Content | `/contents/get-content`, `/contents/:id`, `/contents/get-content-by-subtopic/:id` |
| Problems | `/problem/getProblems`, `/problem/:id` |
| Practice Problems | `/practiceProblems/get-practice-problems`, `/practiceProblems/get-practice-problems/:id` |
| User Activity | `/userActivity/activity/init`, `/userActivity/activity/run`, `/userActivity/activity/submit`, `/userActivity/activity/reset`, `/userActivity/stats` |
| AI | `/ai/hint`, `/ai/chat` |

Some routes require authentication through the `token` HTTP-only cookie.

## Authentication Flow

CodeMaster supports two login methods:

- Email OTP login: the backend sends a one-time password through Gmail using Nodemailer.
- Google login: the frontend receives a Google credential and the backend verifies it using `google-auth-library`.

After successful login, the backend stores a JWT in an HTTP-only cookie named `token`.

## Code Execution

The editor uses Monaco Editor on the frontend and sends code to a Judge0-compatible submissions API. The current code points to:

```text
http://3.110.143.167:2358/submissions
```

If you deploy your own Judge0 server, update `JUDGE0_URL` in:

```text
Client/src/components/InteractiveCodeEditor.jsx
```

## AI Assistant

The AI endpoints are implemented in the backend using Groq:

- `POST /api/ai/chat` for conversational coding help.
- `POST /api/ai/hint` for problem-specific hints.

Set `GROQ_API_KEY` in `Server/.env` before using these features.

## Deployment Notes

The frontend can be deployed to Vercel or any static hosting provider after running:

```bash
cd Client
npm run build
```

The backend can be deployed to services such as Railway, Render, or any Node.js hosting provider. Make sure to configure:

- PostgreSQL connection variables
- `JWT_SECRET`
- `FRONTEND_URL`
- `EMAIL_USER` and `EMAIL_PASS`
- `GOOGLE_CLIENT_ID`
- `GROQ_API_KEY`

For production cookies, the backend uses secure cookie settings when `NODE_ENV=production` or Railway environment variables are present.

## Contributing

Contributions are welcome. A good first workflow is:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Run lint/build checks.
5. Open a pull request with a clear description.

## Roadmap Ideas

- Add automated backend and frontend tests.
- Add admin screens for managing languages, topics, content, and problems.
- Add submission history.
- Add real test-case validation for coding problems.
- Add per-language editor templates and starter code management.
- Add Docker setup for the client, server, database, and Judge0.

## License

This project currently does not include a dedicated `LICENSE` file. Add one before publishing publicly as an open source project.
