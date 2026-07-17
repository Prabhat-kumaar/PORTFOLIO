import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const failedAttempts = new Map<string, { count: number; lockUntil: number }>();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check failed attempts rate limiting
  const tracker = failedAttempts.get(normalizedEmail);
  const now = Date.now();

  if (tracker && tracker.lockUntil > now) {
    const minutesLeft = Math.ceil((tracker.lockUntil - now) / 60000);
    return res.status(429).json({
      message: `Too many failed attempts. Account is locked. Try again in ${minutesLeft} minutes.`
    });
  }

  try {
    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      recordFailure(normalizedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      recordFailure(normalizedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Success! Reset failed attempts
    failedAttempts.delete(normalizedEmail);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[auth]: JWT_SECRET is not configured in environment variables.');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Sign JWT containing { adminId, email }, expiring in 7 days
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const recordFailure = (email: string) => {
  const tracker = failedAttempts.get(email) || { count: 0, lockUntil: 0 };
  tracker.count += 1;
  if (tracker.count >= 5) {
    // Lock for 15 minutes
    tracker.lockUntil = Date.now() + 15 * 60 * 1000;
  }
  failedAttempts.set(email, tracker);
};
