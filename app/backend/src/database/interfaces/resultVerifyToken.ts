import jwt = require('jsonwebtoken');

export default interface IVerifyToken {
  error?: jwt.VerifyErrors | null;
  userData?: object;
}
