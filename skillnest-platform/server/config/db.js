const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Prefer MONGO_URL (as you provided), fall back to MONGO_URI if needed
    const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('Mongo connection string not set. Please define MONGO_URL or MONGO_URI in your .env file.');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
