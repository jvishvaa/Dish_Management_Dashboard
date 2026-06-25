# Full Stack Dish Management Dashboard

## 📌 Project Objective
A full-stack web application designed to manage and display dish information, featuring a custom database, a REST API, and an interactive front-end dashboard. The core functionality allows users to toggle the published status of dishes with real-time UI and backend synchronization.

## 🚀 Features
* **Database Management:** Stores unique dish entries containing a `dishId`, `dishName`, `imageUrl`, and an `isPublished` boolean flag.
* **Interactive Dashboard:** Displays all dishes with their respective information.
* **Status Toggling:** Includes a button on each dish card to toggle its published status.
* **Real-Time Updates (Bonus):** Implements real-time WebSocket communication. If a dish is unpublished directly on the backend, the dashboard reacts instantly to reflect the change without a page refresh.

## 🛠️ Tech Stack
* **Frontend:** React.js, HTML/CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (NoSQL) with Mongoose
* **Real-Time Communication:** Socket.io

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jvishvaa/Dish_Management_Dashboard.git
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd backend
npm install
npm start
```

*Note: Ensure your local MongoDB instance is running, or provide a valid connection string in an `.env` file.*

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the React app:
```bash
cd ../frontend
npm install
npm run dev
```

## 📡 API Endpoints
* `GET /api/dishes` - Fetches the list of all dishes from the database.
* `PUT /api/dishes/:dishId/toggle` - Toggles the 'isPublished' status of a specific dish.