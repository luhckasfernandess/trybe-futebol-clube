import { Response, Request } from 'express';
import UserService from '../services/userSevice';

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await this.userService.login(user);
    if (token === null) throw new Error('Incorrect email or password');
    return res.status(200).json({ token });
  };
}
