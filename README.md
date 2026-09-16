# Job Queue Dashboard

A full-stack job queue dashboard that lets you create, track, and manage tasks. 

**Author:** Faique Shareef

## Live Links
- **Live Dashboard:** https://mini-job-queue-dashboard-frontend-git-main-faique.vercel.app/
- **Live API:** https://mini-job-queue-dashboard-backend.onrender.com/

## Built With
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** NestJS, SQLite

## How It Works
* **Smart Buttons:** Jobs strictly follow a path: `Pending ➔ Running ➔ Completed/Failed`. The buttons on the dashboard automatically change based on the job's current status so users can't make invalid clicks.
* **Concurrency Safe:** If two users have the dashboard open and try to click "Start" on the same job at the exact same time, the database catches it. It lets the first person succeed and shows an error to the second person, preventing duplicate work.
* **Bonus - Live Auto-Refresh:** I added a background timer in React that silently checks for new job updates every 5 seconds. This makes the dashboard feel like a live, real-time app without the user having to manually click "Refresh" all the time!

## How to Run Locally

### 1. Start the Backend
\`\`\`bash
cd backend
npm install
npm run start:dev
\`\`\`
*(This will automatically create a local SQLite database for you.)*

### 2. Start the Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`