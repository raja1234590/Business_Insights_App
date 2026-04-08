const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const businessSchema = new mongoose.Schema({
  name: String,
  category: String,
  address: String,
  phone: String,
  rating: Number,
  total_reviews: Number
});

const insightSchema = new mongoose.Schema({
  profile_views: Number,
  search_views: Number,
  website_clicks: Number,
  phone_calls: Number,
  direction_requests: Number
});

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: String
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Business: mongoose.model('Business', businessSchema),
  Insight: mongoose.model('Insight', insightSchema),
  Review: mongoose.model('Review', reviewSchema)
};
