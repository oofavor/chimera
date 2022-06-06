import prisma from '../../prisma/client';
import { createError } from '@utils/createError';
import { Relation } from '@type/models';
import { serviceHandler } from '@utils/service';

export const getRelationByID = (id: string) =>
  serviceHandler(async () => {
    const relation = await prisma.relation.findFirst({ where: { id } });
    return relation || createError('Relation not found');
  });

export const createRelation = (relation: Relation) =>
  serviceHandler(async () => {
    const createdRelation = await prisma.relation.create({ data: relation });
    return createdRelation;
  });

export const changeRelation = (id: string, options: Relation) =>
  serviceHandler(async () => {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: options,
    });
    return changedRelation;
  });

export const addPeer = (id: string, peer: string) =>
  serviceHandler(async () => {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: { peerIDs: { push: peer }, peers: { connect: { id: peer } } },
    });
    return changedRelation;
  });

export const deletePeer = (id: string, peer: string) =>
  serviceHandler(async () => {
    const changedRelation = await prisma.relation.update({
      where: { id },
      data: {
        peers: { disconnect: { id: peer } },
      },
    });

    return changedRelation;
  });

export const getMessages = (id: string) =>
  serviceHandler(async () => {
    const messages = await prisma.relation
      .findFirst({
        where: { id },
      })
      .messages();
    return messages;
  });
