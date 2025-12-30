/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLogin } from "../auth";


export interface TAuthStore {
  authUser: any;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  socket: any;
  onlineUsers: any[];

  login: (data: TLogin) => Promise<any>;
}
