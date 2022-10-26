import jwt = require('jsonwebtoken');
import { IUser } from '../interfaces';

const secretWord = 'xablau';

const createToken = (userData: IUser) => {
  const token = jwt.sign({ userData }, secretWord, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

export default { createToken };
