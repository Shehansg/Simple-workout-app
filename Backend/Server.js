const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import cors
dotenv.config();

const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// ✅ Enable CORS for all routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Logging middleware
app.use((req, res, next) => {
    console.log('New request made');
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the app');
});
