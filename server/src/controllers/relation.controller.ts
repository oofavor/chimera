import { Controller } from '@type/Controller';
import {
  changeRelation,
  createRelation,
  getRelationByID,
  addPeer,
  deletePeer,
  getMessages,
} from '@services/relation.service';
import { isRelation } from '@utils/typeguard';

// TODO:
//    Handle errors better
//    Add more type guards for input

export const getRelationRequest: Controller = async (req, res) => {
  const relationId = req.params.id;
  if (!relationId)
    return res
      .status(400)
      .json({ isError: true, error: 'Missing relation id' });
  const relation = await getRelationByID(relationId);
  if ('isError' in relation) return res.status(404);
  return res.json(relation);
};

// TODO: check if req.body is valid
export const createRelationRequest: Controller = async (req, res) => {
  const relation = req.body;
  if (!isRelation(relation))
    return res.status(400).json({ isError: true, error: 'Invalid relation' });
  const createdRelation = await createRelation(relation);
  if ('isError' in createdRelation) return res.status(400);
  return res.json(createdRelation);
};

// TODO: check if user has rights to change relation
export const changeRelationRequest: Controller = async (req, res) => {
  const peerIDs = req.body;
  const relationID = req.params.id;

  if (!Array.isArray(peerIDs))
    return res.status(400).json({ isError: true, error: 'Invalid relation' });
  const changedRelation = await changeRelation(relationID, {
    peerIDs,
    isPrivate: false,
  });
  if ('isError' in changedRelation) return res.status(400);
  return res.json(changedRelation);
};

export const addPeerRequest: Controller = async (req, res) => {
  const relationID = req.params.id;
  const peerID = req.body.peerID;

  if (!relationID || !peerID)
    return res.status(400).json({ isError: true, error: 'Invalid relation' });
  const changedRelation = await addPeer(relationID, peerID);
  if ('isError' in changedRelation) return res.status(400);
  return res.json(changedRelation);
};

export const deletePeerRequest: Controller = async (req, res) => {
  const relationID = req.params.id;
  const peerID = req.body.peerID;

  if (!relationID || !peerID)
    return res.status(400).json({ isError: true, error: 'Invalid relation' });
  const changedRelation = await deletePeer(relationID, peerID);
  if ('isError' in changedRelation) return res.status(400);
  return res.json(changedRelation);
};

export const getMessagesRequest: Controller = async (req, res) => {
  const relationID = req.params.id;

  if (!relationID)
    return res.status(400).json({ isError: true, error: 'Invalid relation' });
  const messages = await getMessages(relationID);
  if ('isError' in messages) return res.status(400);
  return res.json(messages);
};
