# SkillNest - Mini Course Platform

This is a full-stack MERN application for a mini course platform.

## Project Structure

- `client`: React frontend (Vite + Tailwind CSS)
- `server`: Node.js + Express backend

## Features

- **Authentication**: JWT-based login and registration (User/Admin roles)
- **Courses**: Admin can Create, Update, Delete courses. Users can view and search.
- **Enrollment**: Users can enroll in courses and view them in their dashboard.
- **Dashboard**: Role-based dashboards (Admin vs User).

## Setup Instructions

### Backend (Server)

1. Navigate to the `server` directory:
   ```bash
   cd skillnest-platform/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (already created) with:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/skillnest
   JWT_SECRET=skillnestsecret123
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the `client` directory:
   ```bash
   cd skillnest-platform/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Courses**: `GET /api/courses`, `GET /api/courses/:id`, `POST /api/courses` (Admin), `PUT /api/courses/:id` (Admin), `DELETE /api/courses/:id` (Admin)
- **Enrollment**: `POST /api/enroll`, `GET /api/user/enrollments`

## Deployment

- **Frontend**: Deploy `client` to Vercel/Netlify.
- **Backend**: Deploy `server` to Render/Railway.
- **Database**: Use MongoDB Atlas.

## Tech Stack

- Only functional components with Hooks.
- Tailwind CSS for styling.
- Context API for state management.
- Axios for API calls.

