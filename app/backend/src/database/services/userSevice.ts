import bcrypt = require('bcryptjs');
import Users from '../models/usersModel';
import { ILogin, IUser } from '../interfaces';
import auth from '../helpers/auth';

export default class UserService {
  login = async (userData: ILogin) => {
    const { email, password } = userData;
    const user = await Users.findOne({ where: { email }, raw: true });
    if (user !== null && await bcrypt.compare(password, user.password)) {
      const token = auth.createToken(user);
      return token;
    }
    return null;
  };

  validateLogin = (token: string) => {
    const user = auth.verifyToken(token) as IUser;
    return { role: user.role };
  };
}
