import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT = process.env.SALT || 1;
const SECRET = process.env.SECRET || 'secret';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(SALT));
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const sanitizeUser = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    password: user.password,
  };
};

export const createJWT = (object: object) => {
  return jwt.sign(sanitizeUser(object), SECRET);
};

export const decodeJWT = (token: string) => {
  return jwt.decode(token, { json: true });
};

export const checkToken = (token?: string) => {
  if (!token) return 'Missing token';
  const user = decodeJWT(token);
  if (!user) return 'Invalid token';
  if ('name' in user && 'password' in user && 'id' in user) return user;
  return 'Invalid token';
};
