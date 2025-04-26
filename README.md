# Book Review Platform

A full-stack web application where users can browse books, write reviews, rate books, and manage their profiles. The platform offers a smooth, responsive experience with authentication, review moderation, and role-based features.

---

## Features
- User registration and login (JWT Authentication)
- Browse books with details
- Post reviews and ratings
- Edit and delete your reviews
- User profile page with review history
- GPT-powered review suggestions (optional future enhancement)
- Responsive design with mobile support
- Context API for global state management
- Error handling and loading states

---

## Tech Stack and Tools Used

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Context API
- jwt-decode

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- Mongoose
- Express Validator
- bcrypt.js
- jsonwebtoken

### Others
- Postman (API Testing)
- MongoDB Atlas (Database Hosting)

---
Alright!
You want a plain README setup.txt file — just basic setup instructions in simple text format (no markdown, no tables, no badges).

Here’s your setup text you can directly save as SETUP.txt or README_SETUP.txt:


---

BOOK REVIEW PLATFORM - SETUP GUIDE

1. Clone the Repository:
--------------------------------
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform

2. Backend Setup:
--------------------------------
cd backend
npm install

Create a .env file inside /backend and add the following:
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
PORT=5000

Start the backend server:
npm run dev

Backend server will run at: http://localhost:5000

3. Frontend Setup:
--------------------------------
cd frontend
npm install

Create a .env file inside /frontend and add the following:
VITE_API_URL=http://localhost:5000/api

Start the frontend application:
npm run dev


4. Environment Variables:
--------------------------------
Backend:
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for signing JWT tokens
- PORT: Port number for backend server

Frontend:
- VITE_API_URL: Base URL of the backend API

5. Important Scripts:
--------------------------------
Backend Scripts:
- npm run dev (start server in development)
- npm start (start server in production)

Frontend Scripts:
- npm run dev (start React app in development)
- npm run build (build React app for production)

6. Notes:
--------------------------------
- Make sure MongoDB is accessible (use MongoDB Atlas).
- Use Postman or any API testing tool to test backend endpoints.
- You can deploy frontend separately using Vercel or Netlify.
- You can deploy backend separately using Render, Railway, or any server hosting platfom


