import { Request, Response, NextFunction } from 'express';
import messageError from './messageError';
import LoginSchema from './loginSchema';

export default class Login {
  public validate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { error } = LoginSchema.validate(body);
      if (error?.message === messageError.anyRequired) {
        return res.status(400).json({ message: error.message });
      }
      if (error?.message === messageError.stringEmail) {
        return res.status(401).json({ message: error.message });
      }
      next();
    } catch (error) {
      return error;
    }
  };
}
