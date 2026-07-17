import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;
    if (!connUri) {
      console.error('[db]: MONGODB_URI is not defined in the environment variables.');
      process.exit(1);
    }
    const conn = await mongoose.connect(connUri);
    console.log(`[db]: MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db]: Database connection error: ${error}`);
    console.warn('[db]: Continuing server execution without database connection (fallback mode).');
  }
};
