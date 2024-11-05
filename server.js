require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Import Models
const User = require('./models/User');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to MyNotes API!'));

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', username: newUser.username });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id , username: user.username, email: user.email}, 'your_jwt_secret_key', { expiresIn: '5d' });
    res.json({ message: 'Login successful', token});
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


app.post('/api/notes', async (req, res) => {
  const { userId, title, content } = req.body;
  const note = new Note({ userId, title, content });
  await note.save();
  res.status(201).json(note);
});

app.get('/api/users/:userId/notes', async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
