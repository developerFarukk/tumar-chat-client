/* eslint-disable @typescript-eslint/no-explicit-any */

import app_axios from "@/lib/axios";
import { TLogin } from "@/type/auth";
import { TAuthStore } from "@/type/store";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/api/v1";

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
      get().connectSocket();
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
      const user = res?.data?.data;
      set({ authUser: user });
      setTimeout(() => {
        get().connectSocket();
      }, 1000);

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
      get().disconnectSocket();

      // const res = await app_axios.post("/auth/logout");
      const res = await app_axios.post(
        "/auth/logout",
        {},
        { withCredentials: true } // 👈 double-safety
      );

      set({
        authUser: null,
        onlineUsers: [],
      });

      return { success: true, data: res?.data };
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

  // connectSocket: () => {
  //   const { authUser } = get();
  //   if (!authUser || get().socket?.connected) return;

  //   // console.log("SOCKET BASE_URL =>", BASE_URL)

  //   const socket = io(BASE_URL, {
  //     transports: ["websocket", "polling"],
  //     withCredentials: true, // this ensures cookies are sent with the connection
  //   });

  //   socket.connect();

  //   set({ socket });

  //   // listen for online users event
  //   socket.on("getOnlineUsers", (userIds) => {
  //     set({ onlineUsers: userIds });
  //   });
  // },

  connectSocket: () => {
    const { authUser, socket } = get();

    console.log("🔄 Attempting to connect socket...");
    console.log("Auth User:", authUser ? "Present" : "Not present");
    console.log(
      "Current Socket:",
      socket?.connected ? "Connected" : "Not connected"
    );

    // যদি already connected থাকে
    if (socket?.connected) {
      console.log("⚠️ Socket already connected, skipping...");
      return;
    }

    // যদি user না থাকে
    if (!authUser) {
      console.log("⚠️ No auth user, cannot connect socket");
      return;
    }

    // যদি পুরানো socket থাকে, disconnect করুন
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }

    console.log("🔗 Creating new socket connection to:", BASE_URL);

    // ✅ নতুন socket connection তৈরি করুন
    const newSocket: Socket = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"], // ✅ IMPORTANT
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      autoConnect: true,
    });

    // ✅ Connection events
    newSocket.on("connect", () => {
      console.log("✅ Socket CONNECTED successfully!");
      console.log("Socket ID:", newSocket.id);

      // User information send করতে পারেন
      if (authUser?._id) {
        newSocket.emit("register", { userId: authUser._id });
      }

      // Welcome message এর জন্য listen করুন
      newSocket.on("welcome", (data) => {
        console.log("👋 Server welcome:", data);
      });
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket CONNECTION ERROR:", error.message);
      console.error("Error details:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("🔌 Socket DISCONNECTED:", reason);
    });

    newSocket.on("error", (error) => {
      console.error("💥 Socket ERROR:", error);
    });

    // ✅ Test events
    newSocket.on("test-response", (data) => {
      console.log("📨 Test response from server:", data);
    });

    // ✅ Online users event
    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("👥 Online users updated:", userIds);
      set({ onlineUsers: userIds });
    });

    // ✅ Socket store এ save করুন
    set({ socket: newSocket });

    // ✅ Manual connect করান (autoConnect true থাকলেও)
    newSocket.connect();

    console.log("🎯 Socket connection initiated");
  },

  // disconnectSocket: () => {
  //   if (get().socket?.connected) get().socket.disconnect();
  // },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },

  // ✅ Check socket status
  getSocketStatus: () => {
    const { socket } = get();
    return {
      connected: socket?.connected || false,
      id: socket?.id || null,
      active: !!socket,
    };
  },
}));
