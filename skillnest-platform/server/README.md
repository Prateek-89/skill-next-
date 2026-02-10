# SkillNest - Backend

This is the server-side application for the SkillNest Mini Course Platform, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs (Password Hashing), CORS

## Features

- **REST API**: Clean endpoints for managing resources.
- **Auth**: Register, Login, Token generation.
- **Middleware**: Protected routes, Admin-only routes.
- **Database Models**: Users, Courses, Enrollments.

## Getting Started

### Prerequisites

- Node.js
- MongoDB (running locally or Atlas URI)

### Installation

1. Navigate to the server directory:
   ```bash
   cd skillnest-platform/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Ensure the `.env` file exists with the following keys:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/skillnest
   JWT_SECRET=your_secret_key
   ```

### Running the Server

1. **Seed Database** (Optional):
   Populates the database with an Admin user and sample courses.
   ```bash
   npm run seed
   ```

2. **Start Dev Server**:
   Runs with nodemon for hot-reloading.
   ```bash
   npm run dev
   ```

3. **Start Production**:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login and get JWT

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Enrollment
- `POST /api/enroll` - Enroll in a course (Protection: User)
- `GET /api/user/enrollments` - Get enrolled courses (Protection: User)
