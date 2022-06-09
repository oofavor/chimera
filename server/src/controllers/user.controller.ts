import { createUser, getUser } from '@services/user.service';
import { Controller } from '@type/Controller';
import { logger } from '@utils/logger';
import { validateCreateUserBody, validateLoginUserBody } from '@utils/validate';
import { checkToken, createJWT, sanitizeUser } from '@utils/authentication';
import { createError } from '@utils/createError';

export const getUserRequest: Controller = async (req, res) => {
  const username = req.params.username;
  if (!username)
    return res.status(400).json(createError('Username is required'));

  const user = await getUser({ name: username });
  if ('isError' in user) return res.status(404).json(user);
  return res.json(user);
};

export const registerUser: Controller = async (req, res) => {
  const user = validateCreateUserBody(req.body);
  if ('isError' in user) return res.json(user);

  const createdUser = await createUser(user);
  if ('isError' in createdUser) return res.status(401).json(createdUser);

  logger.created(createdUser);
  return res
    .json({ token: createJWT(sanitizeUser(createdUser)), user: createdUser })
    .status(201);
};

export const loginUser: Controller = async (req, res) => {
  const user = validateLoginUserBody(req.body);
  if ('isError' in user) return res.json(user);

  const foundUser = await getUser(user);
  if ('isError' in foundUser) return res.json(404).json(foundUser);

  const passwordsSame = user.password === foundUser.password;
  if (!passwordsSame) return res.status(400).send('Invalid password');
  return res
    .status(200)
    .json({ token: createJWT(sanitizeUser(foundUser)), user: foundUser });
};

export const currentUser: Controller = async (req, res) => {
  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  return res.status(200).json(foundUser);
};
