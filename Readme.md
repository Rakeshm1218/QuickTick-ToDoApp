# QuickTick
# Todo Task Management Web Application

## Overview
This is a full-stack Todo Task Management web application built as part of the Katomaran Hackathon. The application allows users to log in via social media providers (Google, GitHub, Facebook) and manage their personal tasks with full CRUD functionality.

## Tech Stack

### Frontend
- React
- Redux Toolkit (State management)
- React Router DOM (Routing)
- TailwindCSS (Styling)
- React Icons (Icons)
- Toastify (Notifications)
- Private Route component for protected routes

### Backend
- Node.js
- Express.js
- Passport.js (Authentication)
- Mongoose (ODM for MongoDB)
- MongoDB (Database)
- Nodemon (Development server)

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

## Features

### Authentication
- Social login with Google, GitHub, and Facebook
- JWT-based session management
- Protected routes for authenticated users only

### Task Management
- Create, Read, Update, Delete tasks
- Mark tasks as complete (with strikethrough)
- View all tasks in a dashboard
- Form validation for task creation/editing
- Responsive design for mobile and desktop

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Social app credentials (Google, GitHub, Facebook OAuth)

### Installation

## 1. Clone the repository:
```bash
   git clone https://github.com/your-username/todo-management-app.git
```
## Install backend dependencies:

```bash
cd backend
npm install
```
## Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run the application:
```bash
npm run dev
npm start
```

## Demo Video

[![Watch the video](https://github.com/Rakeshm1218/QuickTick-ToDoApp/blob/main/QuickTick.png)](https://github.com/Rakeshm1218/QuickTick-ToDoApp/blob/main/QuickTick%20Demo.mp4)


# Acknowledgements
## This project is a part of a hackathon run by https://www.katomaran.com