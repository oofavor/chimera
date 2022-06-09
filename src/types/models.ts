export interface User {
  id: string;
  name: string;
  password: string;
  isOnline: boolean;
  relationIDs: string[];
}

export interface Relation {
  peerIDs: string[];
  id: string;
}

export interface Message {
  id: string;
  relationID: string;
  userID: string;
  createdAt: Date;
  text: string;
}
