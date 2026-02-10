# SkillNest - Frontend

This is the client-side application for the SkillNest Mini Course Platform, built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **State Management**: React Context API

## Features

- **Authentication**: Login, Register, Protected Routes.
- **Pages**:
  - Landing Page
  - Course Listing (with Search)
  - Course Details
  - User Dashboard (Enrolled Courses)
  - Admin Dashboard (Manage Courses)
- **UI Components**:
  - Responsive Navbar & Footer
  - Course Cards
  - Loading Spinners
  - Modals (for Admin actions)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Navigate to the client directory:
   ```bash
   cd skillnest-platform/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `client` root if you need to override defaults (Optional, defaults to localhost:5000):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Building for Production

Build the assets for deployment:
```bash
npm run build
```
The output will be in the `dist` folder.

## Folder Structure

```
src/
├── assets/         # Images and static assets
├── components/     # Reusable UI components (Navbar, Footer, Card, etc.)
├── context/        # React Context (AuthContext)
├── pages/          # Application pages (views)
├── services/       # API configuration (Axios)
├── App.tsx         # Main App component with Routes
└── main.tsx        # Entry point
```
