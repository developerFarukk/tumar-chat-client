export interface TMessage {
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
