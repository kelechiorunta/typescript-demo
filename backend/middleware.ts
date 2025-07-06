import { Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: () => void) => {
    console.log("Authenticated?", req.isAuthenticated());
    console.log("Session:", req.session);
    console.log("User:", req.user);
  
    // Check if user is authenticated with Passport
    if (!req.isAuthenticated() || !req.user) {
      return res.redirect('http://localhost:3001/login');
    }
    next();
  };