import { Controller } from '@type/Controller';
import { createMessage, getMessageByID } from '@services/message.service';
import { isMessage } from '@utils/typeguard';
import { createError } from '@utils/createError';
import { checkToken, sanitizeUser } from '@utils/authentication';
import { getUser } from '@services/user.service';

export const getMessageRequest: Controller = async (req, res) => {
  const messageID = req.params.id;
  if (!messageID)
    return res.status(400).json(createError('Missing message id'));

  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  const message = await getMessageByID(messageID);
  if ('isError' in message)
    return res.status(404).json(createError('Message not found'));

  if (!foundUser.relationIDs.includes(message.relationID))
    return res
      .status(403)
      .json(createError('You are not allowed to view this message'));
  return res.status(200).json(message);
};

export const createMessageRequest: Controller = async (req, res) => {
  // check whether use has permission to create message
  // 1. decode token to get user info
  // 2. check whether the given user is the user sending request
  // 3. check whether user is in relation
  // 4. send message
  // req.body = {relationID, text}
  const messageBody = req.body;
  if (!messageBody)
    return res.status(400).json(createError('Missing message body'));
  if (!isMessage(messageBody))
    return res.status(400).json(createError('Invalid message body'));

  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  messageBody.userID = foundUser.id;
  const createdMessage = await createMessage(messageBody);

  return res.status(203).json(createdMessage);
};
