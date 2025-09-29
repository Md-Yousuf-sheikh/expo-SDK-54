export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  senderId: string;
  senderName: string;
}

export interface Chat {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}
