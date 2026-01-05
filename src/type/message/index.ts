export interface TMessage {
  _id: string
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string | undefined | null
  createdAt?: string | number | Date
  updatedAt?: string | number | Date
  isOptimistic: boolean
}


export interface TSendMessage {
  text?: string
  // image?: File | string | null
  image?: File | string | null | ""
}
