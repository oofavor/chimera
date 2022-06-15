export interface User {
  id: string;
  name: string;
  isOnline: boolean;
  relationIDs: string[];
  imageURL?: string;
}

export interface Relation {
  peerIDs: string[];
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
}

export interface Message {
  id: string;
  relationID: string;
  userID: string;
  createdAt?: Date;
  text: string;
}
