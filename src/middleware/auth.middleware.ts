import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1] || false;
  
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const isValid = await new TokenService().validateToken(token);
  if (!isValid) {
    res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    return;
  }

  next();
}