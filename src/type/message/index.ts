export interface TMessage {
  _id: string
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt?: string | number | Date
  updatedAt?: string | number | Date
  isOptimistic: boolean
}
