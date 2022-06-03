import { createUser, getMessages, getUser } from '@services/user.service';
import { Controller } from '@type/Controller';
import { isUser } from '@utils/typeguard';
import { logger } from '@utils/logger';
import { validateCreateUserBody } from '@utils/validate';
export const getUserRequest: Controller = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.status(400).send('Missing username');

  const user = await getUser({ name: username });
  if ('isError' in user) return res.json(400);
  return res.json(user);
};

export const createUserRequest: Controller = async (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).send('я');

  if (!isUser(user)) return res.status(400).send('Invalid user');

  const createdUser = await createUser(user);
  if ('isError' in createdUser) return res.json(400);
  logger.created(createdUser);
  return res.json(createUser);
};

export const getMessagesRequest: Controller = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).send('Missing user id');

  const user = await getMessages(userId);
  if ('isError' in user) return res.json(400);
  return res.json(user);
};

export const loginUser: Controller = async (req, res) => {
  const user = req.body;
  if (!user.email) return res.status(400).send('Missing email');
  if (!user.password) return res.status(400).send('Missing password');

  const foundUser = await getUser({ email: user.email });
  if ('isError' in foundUser) return res.json(400);

  if (user.password !== foundUser.password)
    return res.status(400).send('Invalid password');

  return;
};

export const registerUser: Controller = async (req, res) => {
  const user = validateCreateUserBody(req.body);
  if ('isError' in user) return res.json(user);

  const createdUser = await createUser(user);
  if ('isError' in createdUser) return res.json(400);
  logger.created(createdUser);
  return res.json(createUser);
};
