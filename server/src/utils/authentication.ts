import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT = process.env.SALT;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (object: object) => {
  return jwt.sign(object, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
