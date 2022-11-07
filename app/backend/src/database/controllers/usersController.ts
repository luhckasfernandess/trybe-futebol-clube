import { Response, Request } from 'express';
import UserService from '../services/userSevice';

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const token = await this.userService.login(user);
      if (token === null) throw new Error('Incorrect email or password');
      return res.status(200).json({ token });
    } catch (error) {
      console.log('Controlller', error);
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };
}
