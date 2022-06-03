import Message from '@models/message.model';
import Relation from '@models/relation.model';
import User from '@models/user.model';

export const isUser = (user: any): user is User => {
  return 'name' in user && 'email' in user && 'password' in user;
};

export const isRelation = (relation: any): relation is Relation => {
  return 'peerIDs' in relation && 'isPrivate' in relation;
};

export const isMessage = (message: any): message is Message => {
  return 'text' in message && 'relationID' in message && 'userId' in message;
};
