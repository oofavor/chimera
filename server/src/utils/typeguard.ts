import { Message, Relation, User } from '@type/models';

export const isUser = (user: any): user is User => {
  return 'name' in user && 'password' in user;
};

export const isRelation = (relation: any): relation is Relation => {
  return 'peerIDs' in relation;
};

export const isMessage = (message: any): message is Message => {
  return 'text' in message && 'relationID' in message;
};
