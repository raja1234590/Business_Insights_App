const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { User, Business, Insight, Review } = require('./models');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/business_insights';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Very simple authentication for MVP
    if (user && user.password === password) {
      res.json({ message: 'Login successful', success: true });
    } else {
      res.status(401).json({ message: 'Invalid credentials', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/business', async (req, res) => {
  try {
    const business = await Business.findOne(); // Assumes single business for dashboard
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/insights', async (req, res) => {
  try {
    const insights = await Insight.findOne();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// For Render deployment health check
app.get('/', (req, res) => {
   res.json({ message: 'Business Insights API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
