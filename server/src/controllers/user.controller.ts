import {
  createUser,
  getUser as getUser_,
  getUserSafe,
  getUsersByName,
} from '@services/user.service';
import { Controller } from '@type/Controller';
import { logger } from '@utils/logger';
import { validateCreateUserBody, validateLoginUserBody } from '@utils/validate';
import { checkToken, createJWT, sanitizeUser } from '@utils/authentication';
import { createError } from '@utils/createError';
import { exclude } from '@utils/format';

export const getUser: Controller = async (req, res) => {
  const name = req.params.username;
  if (!name) return res.status(400).json(createError('Name is required'));

  const users = await getUserSafe(name);
  if ('isError' in users) return res.status(404).json(users);

  return res.json(users);
};

export const getUsers: Controller = async (req, res) => {
  const name = req.params.username;
  if (!name) return res.status(400).json(createError('Name is required'));

  const users = await getUsersByName(name);
  if ('isError' in users) return res.status(404).json(users);

  return res.json(users);
};

export const registerUser: Controller = async (req, res) => {
  const user = validateCreateUserBody(req.body);
  if ('isError' in user) return res.json(user);

  const createdUser = await createUser(user);
  if ('isError' in createdUser) return res.status(401).json(createdUser);

  logger.created(createdUser);
  return res
    .json({
      token: createJWT(sanitizeUser(createdUser)),
      user: exclude(createdUser, 'password'),
    })
    .status(201);
};

export const loginUser: Controller = async (req, res) => {
  const user = validateLoginUserBody(req.body);
  if ('isError' in user) return res.json(user);

  const foundUser = await getUser_(user);
  if ('isError' in foundUser)
    return res.status(404).json(createError('User not found'));

  const passwordsSame = user.password === foundUser.password;
  if (!passwordsSame) return res.status(400).send('Invalid password');
  return res.status(200).json({
    token: createJWT(sanitizeUser(foundUser)),
    user: exclude(foundUser, 'password'),
  });
};

export const currentUser: Controller = async (req, res) => {
  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser_(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  return res.status(200).json(foundUser);
};
