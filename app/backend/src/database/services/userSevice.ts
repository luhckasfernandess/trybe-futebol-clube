import bcrypt = require('bcryptjs');
import Users from '../models/usersModel';
import { ILogin } from '../interfaces';
import auth from '../helpers/auth';

export default class UserService {
  login = async ({ email, password }: ILogin) => {
    const user = await Users.findOne({ where: { email }, raw: true });
    if (!!user && await bcrypt.compare(password, user.password)) {
      const token = auth.createToken(user);
      return token;
    }
    return null;
  };
}
