import { Request, Response, NextFunction } from 'express';
import auth from '../helpers/auth';

export default class Token {
  public tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      auth.verifyToken(authorization as string);
      next();
    } catch (error) {
      return error;
    }
  };
}
