import prisma from '../../prisma/client';
import Relation from '@models/relation.model';
import { createError } from '@utils/createError';

export const getRelationByID = async (id: string) => {
  try {
    const relation = await prisma.relation.findFirst({ where: { id } });
    return relation || createError('Relation not found');
  } catch (e) {
    return createError(e);
  }
};

export const createRelation = async (relation: Relation) => {
  try {
    const createdRelation = await prisma.relation.create({ data: relation });
    return createdRelation;
  } catch (e) {
    return createError(e);
  }
};

export const changeRelation = async (id: string, options: Relation) => {
  try {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: options,
    });
    return changedRelation;
  } catch (e) {
    return createError(e);
  }
};

export const addPeer = async (id: string, peer: string) => {
  try {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: { peerIDs: { push: peer }, peers: { connect: { id: peer } } },
    });
    return changedRelation;
  } catch (e) {
    return createError(e);
  }
};

export const deletePeer = async (id: string, peer: string) => {
  try {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: {
        peers: { disconnect: { id: peer } },
      },
    });

    return changedRelation;
  } catch (e) {
    return createError(e);
  }
};

export const getMessages = async (id: string) => {
  try {
    const messages = await prisma.relation
      .findFirst({
        where: { id },
      })
      .messages();
    return messages;
  } catch (e) {
    return createError(e);
  }
};
