import { Request, Response, NextFunction } from 'express';
import messageError from './messageError';

export default class Login {
  public validate = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const validateEmail = /\S+@\S+\.\S+/;
    if (!email || !password) {
      return res.status(400).json({ messages: messageError.anyRequired });
    }
    if (!validateEmail.test(email)) {
      return res.status(401).json({ messages: messageError.stringEmail });
    }
    next();
  };
}
