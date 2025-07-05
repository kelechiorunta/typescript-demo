import { Request, Response } from "express";
import User from "../models/User";

export const signupController = async (req: Request, res: Response): Promise<any> => {
    const { username, password, email } = req.body;
  
    try {
      if (!username || !password ||!email) {
        return res.status(400).json({ error: 'All fields are required!' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists!' });
      }
  
      const newUser = new User({ username, password, email });
      await newUser.save();
  
      // Optionally log them in immediately:
      req.login(newUser, (err: Error) => {
        if (err) return res.status(500).json({ error: 'Auto-login failed after signup' });
        return res.status(201).json({ message: 'Signup successful', user: newUser });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error during signup' });
    }
  };