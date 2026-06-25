const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const Dish = require('./models/Dish');

// Load environment variables (optional, if we have a .env file later)
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For development, allow all origins. Restrict this later.
    methods: ['GET', 'POST', 'PUT']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dish_dashboard';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB via Express'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// GET /api/dishes - Fetches all dishes from the database
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/dishes/:dishId/toggle - Finds a dish by dishId, flips isPublished, saves, and returns it
app.put('/api/dishes/:dishId/toggle', async (req, res) => {
  try {
    const { dishId } = req.params;

    // Find the dish by dishId
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    // Flip the isPublished status
    dish.isPublished = !dish.isPublished;

    // Save the updated dish
    await dish.save();

    // emit a socket event to update connected clients in real-time
    io.emit('dishStatusUpdated', dish);

    res.json(dish);
  } catch (error) {
    console.error('Error toggling dish status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
