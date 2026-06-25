# Full Stack Dish Management Dashboard

## 📌 Project Objective
[cite_start]A full-stack web application designed to manage and display dish information, featuring a custom database, a REST API, and an interactive front-end dashboard[cite: 3]. [cite_start]The core functionality allows users to toggle the published status of dishes with real-time UI and backend synchronization[cite: 4, 19].

## 🚀 Features
* [cite_start]**Database Management:** Stores unique dish entries containing a `dishId`, `dishName`, `imageUrl`, and an `isPublished` boolean flag[cite: 7, 8, 9, 10, 11].
* [cite_start]**Interactive Dashboard:** Displays all dishes with their respective information[cite: 18].
* [cite_start]**Status Toggling:** Includes a button on each dish card to toggle its published status[cite: 19].
* **Real-Time Updates (Bonus):** Implements real-time WebSocket communication. [cite_start]If a dish is unpublished directly on the backend, the dashboard reacts instantly to reflect the change without a page refresh[cite: 21, 22].

## 🛠️ Tech Stack
* [cite_start]**Frontend:** React.js[cite: 17], HTML/CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (NoSQL) with Mongoose
* **Real-Time Communication:** Socket.io

## ⚙️ Installation & Setup

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/jvishvaa/Dish_Management_Dashboard.git
\`\`\`

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server:
\`\`\`bash
cd backend
npm install
npm start
\`\`\`
*Note: Ensure your local MongoDB instance is running, or provide a valid connection string in an `.env` file.*

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the React app:
\`\`\`bash
cd ../frontend
npm install
npm run dev
\`\`\`

## 📡 API Endpoints
* [cite_start]\`GET /api/dishes\` - Fetches the list of all dishes from the database[cite: 14].
* [cite_start]\`PUT /api/dishes/:dishId/toggle\` - Toggles the 'isPublished' status of a specific dish[cite: 15].