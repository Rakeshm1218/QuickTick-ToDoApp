Todo Task Management Web Application Overview This is a full-stack Todo
Task Management web application built as part of the Katomaran
Hackathon. The application allows users to log in via social media
providers (Google, GitHub, Facebook) and manage their personal tasks
with full CRUD functionality.

Tech Stack Frontend React

Redux Toolkit (State management)

React Router DOM (Routing)

TailwindCSS (Styling)

React Icons (Icons)

Toastify (Notifications)

Private Route component for protected routes

Backend Node.js

Express.js

Passport.js (Authentication)

Mongoose (ODM for MongoDB)

MongoDB (Database)

Nodemon (Development server)

Deployment Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Features Authentication Social login with Google, GitHub, and Facebook

JWT-based session management

Protected routes for authenticated users only

Task Management Create, Read, Update, Delete tasks

Mark tasks as complete (with strikethrough)

View all tasks in a dashboard

Form validation for task creation/editing

Responsive design for mobile and desktop

Models User Model \_id (MongoDB default)

username

email

password (hashed)

Task Model title

description

dueDate

status (Open/Complete)

createdAt

createdBy (reference to User)

Setup Instructions Prerequisites Node.js (v16 or higher)

MongoDB Atlas account (or local MongoDB instance)

Social app credentials (Google, GitHub, Facebook OAuth)

Installation Clone the repository:

bash git clone https://github.com/your-username/todo-management-app.git
Install backend dependencies:

bash cd backend npm install Install frontend dependencies:

bash cd ../frontend npm install Create a .env file in the backend
directory with your environment variables:

MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret Start the development
servers:

Backend:

bash cd backend npm run dev Frontend:

bash cd frontend npm start Deployment The application is deployed with
the following services:

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Live URL: https://your-vercel-app.vercel.app

Architecture Diagram Architecture Diagram (Please refer to the
architecture diagram in the repository for the system design)

Demo Video Loom Video Walkthrough

Assumptions Users will primarily use social login rather than
email/password authentication.

Task due dates are optional fields.

The default status for new tasks is \"Open\".

Only task owners can modify their tasks.

The application will be used primarily on modern browsers.

Future Enhancements Add task categories or tags

Implement task search and filtering

Add task reminders/notifications

Support for task sharing/collaboration

Dark mode support

Acknowledgements This project is a part of a hackathon run by
https://www.katomaran.com
