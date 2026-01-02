/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLogin, TUser } from "../auth";

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
}

// Chats Store Interface
export interface TChatStore {
  allContacts: TUser[];
  chats: TUser[];
  // messages: any[];
  // activeTab: "chats" | "contacts";
  // selectedUser: TUser | null;

  isUsersLoading: boolean;
  // isMessagesLoading: boolean;
  // isSoundEnabled: boolean;

  // toggleSound: () => void;

  // setActiveTab: (tab: "chats" | "contacts") => void;
  // setSelectedUser: (user: TUser | null) => void;

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
  // getMessagesByUserId: (userId: string) => Promise<void>;

  // sendMessage: (messageData: {
  //   text?: string;
  //   image?: string;
  // }) => Promise<void>;

  // subscribeToMessages: () => void;
  // unsubscribeFromMessages: () => void;
}
