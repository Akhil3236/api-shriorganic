import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async () => {

  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    
  } catch { }

  try {
    if (!process.env.MONGO_URI) {
      console.error(' MONGO_URI is not defined in environment variables');
      return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to DB:', error.message);

  }
};