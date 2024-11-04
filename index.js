require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Models
const User = require('./models/User');

// Routes
app.get('/', (req, res) => res.send('Welcome to TrackLog API!'));

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
