# SkillNext - Online Learning Platform

A production-ready, full-stack learning management system built with modern web technologies. SkillNext provides a seamless experience for students to discover and enroll in courses, while giving administrators powerful tools to manage the platform.

**Live Demo:**
- Frontend: https://skillnext.vercel.app
- Backend API: https://skill-next-3.onrender.com

---

## 📋 Executive Summary

SkillNext is a comprehensive online learning platform designed with a focus on user experience, clean architecture, and scalability. The platform supports both student and admin roles with distinct workflows, JWT-based authentication, MongoDB data persistence, and deployment-ready infrastructure.

**Key Highlights:**
- Minimal, professional UI following SaaS design principles
- Full CRUD operations for course management
- Role-based access control (Student/Admin)
- Responsive design (mobile-first)
- Production deployment on Vercel + Render

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend:**
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (ultra-fast HMR)
- **Styling**: Tailwind CSS v4 (utility-first CSS)
- **Routing**: React Router v7 (client-side routing)
- **HTTP Client**: Axios (interceptor-ready)
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Icons**: React Icons (Material Design)
- **TypeScript**: Strict mode enabled for type safety

**Backend:**
- **Runtime**: Node.js
- **Server**: Express.js (minimal & efficient)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: CORS enabled for cross-origin requests
- **API Design**: RESTful architecture

**DevOps & Deployment:**
- **Frontend Hosting**: Vercel (automatic deployments on git push)
- **Backend Hosting**: Render (containerized Node.js)
- **Database**: MongoDB Atlas (cloud-hosted NoSQL)
- **Version Control**: Git & GitHub

### Directory Structure

```
skillnest-platform/
│
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation header with auth UI
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── CourseCard.tsx      # Course list item component
│   │   │   ├── Loader.tsx          # Loading spinner
│   │   │   └── ProtectedRoute.tsx  # Route guard for authenticated pages
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx     # Public homepage (conditional rendering by auth)
│   │   │   ├── LoginPage.tsx       # Login form
│   │   │   ├── RegisterPage.tsx    # Registration form
│   │   │   ├── CourseListingPage.tsx # Browse all courses
│   │   │   ├── CourseDetailPage.tsx  # Individual course view + enroll
│   │   │   ├── UserDashboard.tsx   # Student's enrolled courses
│   │   │   └── AdminDashboard.tsx  # Admin course management
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Global auth state (user, token, login, logout)
│   │   │
│   │   ├── services/
│   │   │   └── api.ts              # Axios instance with base URL & token handling
│   │   │
│   │   ├── App.tsx                 # Main app component with router
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Tailwind directives
│   │   └── main.tsx                # React entry point
│   │
│   ├── public/                      # Static assets
│   ├── index.html                   # HTML entry point (SkillNext title)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vercel.json                  # Vercel deployment config
│   └── eslint.config.js
│
└── server/                          # Express Backend
    ├── config/
    │   └── db.js                    # MongoDB connection setup
    │
    ├── models/
    │   ├── User.js                  # User schema (name, email, password, role)
    │   ├── Course.js                # Course schema (title, description, price, etc.)
    │   └── Enrollment.js            # Enrollment schema (userId, courseId relationship)
    │
    ├── controllers/
    │   ├── authController.js        # Register, Login logic
    │   ├── courseController.js      # Get, Create, Update, Delete courses
    │   └── enrollmentController.js  # Enroll, Unenroll logic
    │
    ├── routes/
    │   ├── authRoutes.js            # /api/auth/* endpoints
    │   ├── courseRoutes.js          # /api/courses/* endpoints
    │   └── enrollmentRoutes.js      # /api/enrollments/* endpoints
    │
    ├── middleware/
    │   └── authMiddleware.js        # JWT verification & role checking
    │
    ├── index.js                     # Express app setup & server start
    ├── package.json
    ├── render.yaml                  # Render deployment config
    └── seed_fixed.js                # Database seeding script
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB**: Local instance OR MongoDB Atlas account
- **Git**: For version control

### Quick Start (Local Development)

#### 1. Backend Setup

```bash
# Navigate to server directory
cd skillnest-platform/server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=your_secret_key_here
EOF

# Start MongoDB (if running locally)
# mongod

# Start the server
npm start
# Server runs at http://localhost:5000
```

#### 2. Frontend Setup

```bash
# Open new terminal, navigate to client
cd skillnest-platform/client

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs at http://localhost:5173
```

#### 3. Verify Installation

- Visit `http://localhost:5173` in your browser
- You should see the SkillNext landing page
- Try registering a new account
- Verify courses display correctly

---

## 🎯 Core Features

### For Students

| Feature | Description |
|---------|-------------|
| **Authentication** | Secure JWT-based registration and login |
| **Course Discovery** | Browse all courses with search functionality |
| **Course Details** | View instructor, duration, price, and description |
| **Enrollment** | One-click course enrollment |
| **Learning Dashboard** | Track enrolled courses in personal dashboard |
| **Responsive Design** | Full mobile and tablet support |

### For Administrators

| Feature | Description |
|---------|-------------|
| **Course Creation** | Add new courses with all details |
| **Course Management** | Edit or delete existing courses |
| **Admin Dashboard** | View all courses, manage platform |
| **User Data** | Access student enrollments |

### Platform Features

| Feature | Description |
|---------|-------------|
| **Role-Based Access** | Automatic routing based on user role |
| **Protected Routes** | Unauthenticated users cannot access dashboards |
| **Real-time UI Updates** | Instant form feedback and notifications |
| **Error Handling** | User-friendly error messages |
| **Token Persistence** | Auto-login on page refresh |

---

## 🔐 Authentication & Security

### Authentication Flow

```
1. User registers with email/password
   ↓
2. Password hashed and stored in MongoDB
   ↓
3. User logs in with email/password
   ↓
4. Server validates credentials, expires JWT token
   ↓
5. Token stored in localStorage (client-side)
   ↓
6. Token sent with every API request (Authorization header)
   ↓
7. Server verifies token validity
   ↓
8. Protected resources accessed successfully
```

### Security Measures

- **JWT Tokens**: Stateless, signed authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Protected Routes**: React Router guards for client-side protection
- **Middleware Validation**: Server-side token verification
- **CORS**: Configured to allow only trusted origins
- **Secure Headers**: Content-Type and other security headers set

### Token Management

- Token stored in `localStorage` after successful login
- Token automatically sent in `Authorization: Bearer <token>` header
- Token verified on protected API calls
- Logout clears token from memory and localStorage

---

## 📡 API Reference

### Base URL
```
Development: http://localhost:5000/api
Production: https://skill-next-3.onrender.com/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses

Response: 200 OK
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "title": "React Mastery",
    "description": "Learn React from basics to advanced",
    "instructor": "John Smith",
    "duration": "40 Hours",
    "price": 49.99,
    "thumbnail": "https://..."
  },
  ...
]
```

#### Get Course Details
```http
GET /api/courses/:id

Response: 200 OK
{
  "_id": "60d5ec49c1234567890abcde",
  "title": "React Mastery",
  "description": "Learn React from basics to advanced",
  "instructor": "John Smith",
  "duration": "40 Hours",
  "price": 49.99,
  "thumbnail": "https://...",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

#### Create Course (Admin Only)
```http
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Advanced TypeScript",
  "description": "Master TypeScript for production apps",
  "instructor": "Jane Doe",
  "duration": "32 Hours",
  "price": 59.99,
  "thumbnail": "https://..."
}

Response: 201 Created
```

#### Update Course (Admin Only)
```http
PUT /api/courses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 69.99
}

Response: 200 OK
```

#### Delete Course (Admin Only)
```http
DELETE /api/courses/:id
Authorization: Bearer <token>

Response: 200 OK
```

### Enrollment Endpoints

#### Get User's Enrolled Courses
```http
GET /api/user/enrollments
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "enrollment_id",
    "courseId": {
      "_id": "course_id",
      "title": "React Mastery",
      ...
    },
    "enrolledAt": "2025-02-10T15:30:00Z"
  }
]
```

#### Enroll in Course
```http
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "60d5ec49c1234567890abcde"
}

Response: 201 Created
{
  "_id": "enrollment_id",
  "userId": "user_id",
  "courseId": "course_id",
  "enrolledAt": "2025-02-12T10:15:00Z"
}
```

#### Unenroll from Course
```http
DELETE /api/enrollments/:enrollmentId
Authorization: Bearer <token>

Response: 200 OK
```

---

## 🎨 Design System

### Design Philosophy

SkillNext follows a **minimal, professional SaaS aesthetic**:

- **Color Palette**: White backgrounds, light gray accents (gray-50 to gray-900)
- **Typography**: Clean sans-serif, no decorative styling
- **Buttons**: Flat design with simple hover states (no gradients)
- **Spacing**: Minimal padding for clarity and focus
- **Borders**: Subtle gray-200 borders only
- **Interactions**: No animations, quick and responsive
- **Layout**: List-based course cards instead of grid

### Key Design Tokens

```css
Background: #ffffff
Secondary Background: #f9fafb (gray-50)
Borders: #e5e7eb (gray-200)
Text Primary: #111827 (gray-900)
Text Secondary: #4b5563 (gray-600)
Button Primary: #111827 (gray-900)
Button Hover: #1f2937 (gray-800)
```

### Component Examples

**Button:**
```jsx
className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 font-medium"
```

**Card:**
```jsx
className="border border-gray-200 rounded p-6"
```

**Input:**
```jsx
className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-gray-900"
```

---

## 🧪 Testing & Validation

### Frontend Testing

```bash
# Build verification (catches TypeScript errors)
cd client
npm run build

# Should output: "✓ built in XXXms"
```

### Manual Test Scenarios

#### Test 1: User Registration & Login
1. Visit `http://localhost:5173/register`
2. Fill registration form with email and password
3. Click "Sign up"
4. Should redirect to login page
5. Enter credentials and login
6. Should redirect to dashboard

#### Test 2: Course Browsing
1. Click "Browse Courses" on landing page
2. Verify all courses display correctly
3. Use search to filter courses
4. Click on a course to view details
5. Verify enroll button is available

#### Test 3: Enrollment
1. From course detail page, click "Enroll Now"
2. Should redirect to dashboard
3. Verify enrolled course appears in "My Courses"
4. Click course to view again

#### Test 4: Admin Functions (Admin Account)
1. Login with admin account
2. Navigate to admin dashboard
3. Add new course with form
4. Verify course appears in course list
5. Edit or delete course
6. Verify changes reflected

---

## 📦 Build & Deployment

### Local Build

```bash
# Frontend build
cd client
npm run build
# Outputs to: client/dist/

# Backend ready for deployment
cd ../server
npm start
```

### Frontend Deployment (Vercel)

```bash
# Push to GitHub
git push origin main

# Vercel automatically:
# 1. Detects Next.js/Vite project
# 2. Runs npm install
# 3. Runs npm run build
# 4. Deploys to production
# 5. Assigns URL: https://skillnext.vercel.app
```

**Vercel Configuration (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Backend Deployment (Render)

```bash
# Render automatically:
# 1. Reads render.yaml
# 2. Installs dependencies
# 3. Runs start command
# 4. Deploys Node.js app
# 5. Assigns URL: https://skill-next-3.onrender.com

# Environment variables set in Render dashboard:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillnest
JWT_SECRET=your_production_secret
NODE_ENV=production
```

---

## 🔧 Configuration Files

### Frontend Configuration

**vite.config.ts** - Vite build settings, development server config
**tsconfig.json** - TypeScript strict mode, target ES2020
**tailwind.config.js** - Tailwind CSS customizations
**vercel.json** - Vercel deployment instructions

### Backend Configuration

**package.json** - Scripts: `start`, `dev` for development
**.env** - Database URI, JWT secret (not in repo)
**render.yaml** - Render deployment specification

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas: whitelist your IP address

### Issue: "Frontend can't reach backend API"
**Solution:**
- Verify backend is running on port 5000
- Check CORS configuration in server
- Verify API base URL in `client/src/services/api.ts`

### Issue: "Login token not persisting"
**Solution:**
- Check browser localStorage settings
- Verify token is being set: `localStorage.getItem('token')`
- Clear localStorage and retry: `localStorage.clear()`

### Issue: "Build fails with TypeScript errors"
**Solution:**
- Check error message for specific file
- Verify all imports are correct
- Run: `npm run build` for full error log

### Issue: "CORS error on API calls"
**Solution:**
- Add `http://localhost:5173` to backend CORS whitelist
- For production: add `https://skillnext.vercel.app`

---

## 📚 Code Standards & Best Practices

### Frontend Code Patterns

**Functional Components with Hooks:**
```tsx
const MyComponent: React.FC = () => {
  const [state, setState] = useState<Type>(initialValue);
  const { authValue } = useAuth();
  
  useEffect(() => {
    // Effect logic
  }, [dependency]);
  
  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

**API Calls with Error Handling:**
```tsx
try {
  const response = await api.get('/endpoint');
  setData(response.data);
} catch (error: any) {
  toast.error(error.response?.data?.message || 'Error occurred');
} finally {
  setLoading(false);
}
```

**Context Provider Pattern:**
```tsx
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

### Backend Code Patterns

**Express Middleware:**
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

**Express Route with Controller:**
```javascript
router.post('/courses', authMiddleware, (req, res) => {
  courseController.createCourse(req, res);
});
```

---

## 🚢 Production Checklist

- [ ] Environment variables configured (no hardcoded secrets)
- [ ] Build passes without errors (`npm run build`)
- [ ] All API endpoints tested manually
- [ ] CORS properly configured for production URLs
- [ ] Database backups configured (MongoDB Atlas)
- [ ] Error logging implemented
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] SSL/HTTPS enabled on both frontend and backend
- [ ] Performance tested (Lighthouse score 90+)
- [ ] Responsive design tested on mobile devices

---

## 📞 Support & Documentation

For detailed information on specific components:

- **Frontend Components**: See individual `.tsx` files in `client/src/components/`
- **Page Documentation**: See individual `.tsx` files in `client/src/pages/`
- **API Logic**: See controllers in `server/controllers/`
- **Database Schema**: See models in `server/models/`

---

## 📄 License

This project is created for educational and assignment purposes.

---

## 👤 Author

Created as a professional learning platform project.

**Project Version:** 1.0.0
**Last Updated:** February 12, 2026
**Status:** ✅ Production Ready

---

**Thank you for reviewing SkillNext!**


