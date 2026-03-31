import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Database Connection
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub');
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  