/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLogin, TUser } from "../auth";
import { TMessage, TSendMessage } from "../message";

// Auth store interface
export interface TAuthStore {
  authUser: TUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  socket: any;
  onlineUsers: any[];

  login: (data: TLogin) => Promise<any>;
  logout: () => Promise<any>;
  curentUser: () => Promise<any>;
  // updateProfile: (data: any) => Promise<any>;

  connectSocket: () => void;
  disconnectSocket: () => void;
}

// Chats Store Interface
export interface TChatStore {
  allContacts: TUser[];
  chats: TUser[];
  messages: TMessage[];
  // activeTab: "chats" | "contacts";
  selectedUser: TUser | null;

  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  // isSoundEnabled: boolean;

  // toggleSound: () => void;

  // setActiveTab: (tab: "chats" | "contacts") => void;
  setSelectedUser: (user: TUser | null) => void;

  // getAllContacts: () => Promise<void>;
  getAllContacts: () => Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;
  getMyChatPartners: () => Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;
  getMessagesByUserId: (userId: string) => Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;

  sendMessage: (messageData: TSendMessage) => Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;

  // subscribeToMessages: () => void;
  // unsubscribeFromMessages: () => void;
}
