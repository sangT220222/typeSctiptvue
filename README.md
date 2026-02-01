Techstack

Frontend
• Vue 3
• TypeScript
• Vite
• Pinia

Backend
• Node.js (ESM)
• TypeScript
• Express
• Prisma ORM

Database
• PostegreSQL

Tooling
• Docker
• Prisma Migrate
• tsx

Architecture Overview

Vue frontend (Vite)
|
| HTTP(Rest API)
v
Node.js API (Express, Typescript)
|
| Prisma client
v
PostgreSQl (Docker container)

Local dev setup

Node.js v20
Docker desktop
np

Backend setup

cd backend
docker compose -d
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

Frontend setup

cd frontend
npm install
npm run dev

Database
Postgres runs in Docker
Schema managed by Prisma
Migrations tracked in prisma_migration

Core models
User
Ticket

Takeaways
Backend and frontend seperation
Database schema design with relation and enums
Dockerised local infrastructure
Modern ESM-based Node.js setup
