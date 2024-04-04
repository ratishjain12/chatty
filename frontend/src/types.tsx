export interface chatType {
  _id: string;
  chatName: string;
  lastMessage?: lastMessage;
  createdAt: string;
  users: User[];
}
export interface authData {
  username: string;
  password: string;
  email?: string;
  name?: string;
}

export interface lastMessage {
  content: string;
  createdAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
}

export interface messageType {
  _id: string;
  chat: chatType;
  content: string;
  createdAt: string;
  sender: User;
  updatedAt: string;
}
