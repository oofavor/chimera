export interface User {
  name: string;
  password: string;
  imageURL?: string;
}

export interface Relation {
  peerIDs: string[];
  name: string;
  imageURL?: string;
  description?: string;
}

export interface Message {
  relationID: string;
  userID: string;
  text: string;
}
