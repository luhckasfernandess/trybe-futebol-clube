import bcrypt = require('bcryptjs');
import Users from '../models/usersModel';
import { ILogin, IUser } from '../interfaces';
import auth from '../helpers/auth';

export default class LoginUser {
  login = async ({ email, password }: ILogin) => {
    const user = await Users.findOne({ where: { email }, raw: true }) as IUser;
    if (!!user && await bcrypt.compare(password, user.password)) {
      const token = await auth.createToken(user);
      return token;
    }
    return null;
  };
}
