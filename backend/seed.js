const mongoose = require('mongoose');
require('dotenv').config();
const { User, Business, Insight, Review } = require('./models');

const dummyBusiness = {
  name: "ABC Salon",
  category: "Beauty Salon",
  address: "Hyderabad",
  phone: "9876543210",
  rating: 4.2,
  total_reviews: 120
};

const dummyInsights = {
  profile_views: 1200,
  search_views: 800,
  website_clicks: 150,
  phone_calls: 60,
  direction_requests: 40
};

const dummyReviews = [
  {
    name: "Ravi",
    rating: 5,
    comment: "Good service",
    date: "2026-03-20"
  },
  {
    name: "Priya",
    rating: 4,
    comment: "Nice experience",
    date: "2026-03-18"
  }
];

const dummyUser = {
  email: "admin@abcsalon.com",
  password: "password123"
};

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/business_insights';

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});
    await Insight.deleteMany({});
    await Review.deleteMany({});

    // Insert dummy data
    await User.create(dummyUser);
    await Business.create(dummyBusiness);
    await Insight.create(dummyInsights);
    await Review.insertMany(dummyReviews);

    console.log('Database seeded successfully completely!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
}

seedDB();
