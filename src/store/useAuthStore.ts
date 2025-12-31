/* eslint-disable @typescript-eslint/no-explicit-any */

import app_axios from "@/lib/axios";
import { TLogin } from "@/type/auth";
import { TAuthStore } from "@/type/store";
import { create } from "zustand";

export const useAuthStore = create<TAuthStore>((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  socket: null,
  onlineUsers: [],

  // get current user
  curentUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await app_axios.get("/auth/check");
      set({ authUser: res?.data?.data });

      // return { success: true, data: res?.data };
    } catch (error: any) {
      set({ authUser: null });
      return {
        success: false,
        message: error?.response?.data?.details || "User is null",
      };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // signup: async (data) => {
  //   set({ isSigningUp: true });
  //   try {
  //     const res = await axiosInstance.post("/auth/signup", data);
  //     set({ authUser: res.data });

  //     toast.success("Account created successfully!");
  //     get().connectSocket();
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isSigningUp: false });
  //   }
  // },

  // Login Function

  // Login function
  login: async (data: TLogin) => {
    set({ isLoggingIn: true });

    try {
      const res = await app_axios.post("/auth/login", data);
      set({ authUser: res?.data?.data });

      return { success: true, data: res?.data };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.details || "Login failed",
      };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout Function
  logout: async () => {
    set({ isLoggingOut: true });

    try {
      // const res = await app_axios.post("/auth/logout");
      const res = await app_axios.post(
        "/auth/logout",
        {},
        { withCredentials: true } // 👈 double-safety
      );

      set({ authUser: null });

      return { success: true, data: res.data };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.details || "Logout failed",
      };
    } finally {
      set({ isLoggingOut: false });
    }
  },

  //   updateProfile: async (data) => {
  //     try {
  //       const res = await axiosInstance.put("/auth/update-profile", data);
  //       set({ authUser: res.data });
  //       toast.success("Profile updated successfully");
  //     } catch (error) {
  //       console.log("Error in update profile:", error);
  //       toast.error(error.response.data.message);
  //     }
  //   },

  //   connectSocket: () => {
  //     const { authUser } = get();
  //     if (!authUser || get().socket?.connected) return;

  //     const socket = io(BASE_URL, {
  //       withCredentials: true, // this ensures cookies are sent with the connection
  //     });

  //     socket.connect();

  //     set({ socket });

  //     // listen for online users event
  //     socket.on("getOnlineUsers", (userIds) => {
  //       set({ onlineUsers: userIds });
  //     });
  //   },

  //   disconnectSocket: () => {
  //     if (get().socket?.connected) get().socket.disconnect();
  //   },
}));
