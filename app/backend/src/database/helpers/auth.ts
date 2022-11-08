import jwt = require('jsonwebtoken');
import { IUser } from '../interfaces';
import IVerifyToken from '../interfaces/resultVerifyToken';

const secretWord = String(process.env.JWT_SECRET);

const createToken = (userData: IUser) => {
  const token = jwt.sign({ userData }, secretWord, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

const verifyToken = (token: string) => {
  let result: unknown;
  jwt.verify(token, secretWord.trim(), (error, decoded) => {
    result = { error, ...decoded };
  });
  return (result as IVerifyToken).userData;
};

export default { createToken, verifyToken };
