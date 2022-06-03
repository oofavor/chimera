import { Controller } from '@type/Controller';
import { createMessage, getMessageByID } from '@services/message.service';
import { isMessage } from '@utils/typeguard';

export const getMessageRequest: Controller = async (req, res) => {
  const messageId = req.params.id;
  if (!messageId)
    return res.status(400).json({ isError: true, error: 'Missing message id' });
  const relation = await getMessageByID(messageId);
  if ('isError' in relation!) return res.status(404);
  return res.json(relation);
};

export const createMessageRequest: Controller = async (req, res) => {
  const message = req.body;
  if (!isMessage(message))
    return res.status(400).json({ isError: true, error: 'Invalid message' });
  const createdMessage = await createMessage(message);
  if ('isError' in createdMessage!) return res.status(400);
  return res.json(createdMessage);
};
