/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLogin, TUser } from "../auth";

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
