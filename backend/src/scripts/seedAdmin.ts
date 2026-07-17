import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin.js';

dotenv.config();

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUri || !email || !password) {
      console.error('[seed]: Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in environment.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('[seed]: Connected to MongoDB.');

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Upsert admin user
    await Admin.findOneAndUpdate(
      { email },
      { email, passwordHash },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`[seed]: Admin user upserted successfully: ${email}`);
    await mongoose.disconnect();
    console.log('[seed]: Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('[seed]: Error seeding admin user:', error);
    process.exit(1);
  }
};

seed();
