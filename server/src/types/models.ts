export interface User {
  name: string;
  password: string;
}

export interface Relation {
  peerIDs: string[];
}

export interface Message {
  relationID: string;
  userID: string;
  text: string;
}
