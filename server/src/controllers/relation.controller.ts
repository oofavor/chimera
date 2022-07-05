import { Controller } from '@type/Controller';
import {
  changeRelation,
  createRelation,
  getRelationByID,
  addPeer,
  deletePeer,
  getMessages,
  getRelationsByUserID,
} from '@services/relation.service';
import { isRelation } from '@utils/typeguard';
import { createError } from '@utils/createError';
import { checkToken, sanitizeUser } from '@utils/authentication';
import { getUser } from '@services/user.service';
import { currentUser } from './user.controller';

export const getRelationRequest: Controller = async (req, res) => {
  const relationId = req.params.id;
  if (!relationId)
    return res.status(400).json(createError('Missing relation id'));

  const relation = await getRelationByID(relationId);
  if ('isError' in relation) return res.status(404).json(relation);
  return res.json(relation);
};

// TODO: check if req.body is valid
export const createRelationRequest: Controller = async (req, res) => {
  const relation = req.body;
  if (!isRelation(relation))
    return res.status(400).json(createError('Invalid relation'));
  const createdRelation = await createRelation(relation);
  if ('isError' in createdRelation) return res.status(400);

  return res.json(createdRelation);
};

export const addPeerRequest: Controller = async (req, res) => {
  const relationID = req.params.id;
  const peerID = req.body.peerID;
  if (!relationID || !peerID)
    return res.status(400).json(createError('Invalid relation'));

  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  if (!foundUser.relationIDs.includes(relationID))
    return res
      .status(403)
      .json(createError('You are not allowed to change this relation'));

  const changedRelation = await addPeer(relationID, peerID);
  if ('isError' in changedRelation) return res.status(400);

  return res.json(changedRelation);
};

export const removePeerRequest: Controller = async (req, res) => {
  const relationID = req.params.id;
  const peerID = req.body.peerID;
  if (!relationID || !peerID)
    return res.status(400).json(createError('Invalid relation'));

  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  if (!foundUser.relationIDs.includes(relationID))
    return res
      .status(403)
      .json(createError('You are not allowed to change this relation'));

  const changedRelation = await deletePeer(relationID, peerID);
  if ('isError' in changedRelation) return res.status(400);

  return res.json(changedRelation);
};

export const getMessagesRequest: Controller = async (req, res) => {
  const relationID = req.params.id;
  if (!relationID) return res.status(400).json(createError('Invalid relation'));

  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  if (!foundUser.relationIDs.includes(relationID))
    return res
      .status(403)
      .json(createError('You are not allowed to view this relation'));
      
  const messages = await getMessages(relationID);
  if ('isError' in messages) return res.status(400);
  return res.json(messages);
};

export const getRelationsByUserRequest: Controller = async (req, res) => {
  const token = req.headers.authorization;
  const user = checkToken(token);
  if (typeof user === 'string') return res.status(401).json(createError(user));

  const foundUser = await getUser(sanitizeUser(user));
  if ('isError' in foundUser) return res.status(403).json(foundUser);

  const relations = await getRelationsByUserID(foundUser.id);
  if ('isError' in relations) return res.status(401);
  return res.json(relations);
}