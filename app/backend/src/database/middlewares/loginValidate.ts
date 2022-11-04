import { Request, Response, NextFunction } from 'express';
import loginValidate from './loginSchema';
import { IUser } from '../interfaces';

export default class Login {
  private loginSchema = (user: IUser) => {
    const isValid = loginValidate.validate(user);
    return isValid;
  };

  public validate = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const { password } = user;
    if (!password) return res.status(400).json({ messages: 'All fields must be filled' });
    const { error } = this.loginSchema(user);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(Number(code)).json({ message });
    }
    next();
  };
}
