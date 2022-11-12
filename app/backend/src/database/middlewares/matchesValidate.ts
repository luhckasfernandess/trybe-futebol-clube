import { Request, Response, NextFunction } from 'express';
import auth from '../helpers/auth';
// import IVerifyToken from '../interfaces/resultVerifyToken';

export default class MatchesValidate {
  public tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      const verifyToken = auth.verifyToken(authorization as string);
      if (verifyToken === undefined) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      next();
    } catch (error) {
      return error;
    }
  };
}
