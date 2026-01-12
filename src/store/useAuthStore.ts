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
      const user = res?.data?.data;
      set({ authUser: user });
      if (user) {
        setTimeout(() => {
          get().connectSocket();
        }, 500);
      }
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

  connectSocket: async () => {
    const { authUser, socket: existingSocket } = get();

    if (!authUser) {
      // console.log("❌ No auth user, skipping socket connection");
      return;
    }

    // ✅ যদি আগে থেকে socket connected থাকে
    if (existingSocket?.connected) {
      // console.log("ℹ️ Socket already connected, ID:", existingSocket.id);
      return;
    }

    // ✅ পুরানো socket থাকলে disconnect করুন
    if (existingSocket) {
      // console.log("♻️ Disconnecting existing socket...");
      existingSocket.disconnect();
      set({ socket: null });
    }

    try {
      // ✅ Dynamic import
      const socketModule = await import("socket.io-client");
      const { io } = socketModule;

      // console.log("✅ Socket.io-client loaded:", typeof io !== "undefined");

      if (typeof io !== "function") {
        // console.error("❌ io is not a function after import!");
        return;
      }

      // ✅ Server URL
      const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL_SOCKET_LOCAL || process.env.NEXT_PUBLIC_BASE_URL_SOCKET_LIVE;
      // console.log("🎯 Connecting to:", SERVER_URL);

      // ✅ Create socket with ALL necessary options
      const newSocket = io(SERVER_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        autoConnect: true,
        forceNew: false,
      });

      // console.log("✅ Socket instance created");

      // ========== ✅ MUST HAVE EVENT LISTENERS ==========

      // 1. ✅ CONNECT SUCCESS
      newSocket.on("connect", () => {
        // console.log("🎉 ✅ SOCKET CONNECTED SUCCESSFULLY!");
        // console.log("Socket ID:", newSocket.id);
        // console.log("Connected to:", SERVER_URL);

        // Optional: Send user info to server
        newSocket.emit("register", {
          userId: authUser?._id,
          userName: authUser?.name,
          timestamp: new Date().toISOString(),
        });
      });

      // 2. ✅ CONNECT ERROR (MOST IMPORTANT!)
      newSocket.on("connect_error", (error) => {
        // console.error("❌ SOCKET CONNECTION ERROR:");
        // console.error("Error message:", error.message);
        // console.error("Error type:", error.type);
        // console.error("Full error:", error);

        // Specific error handling
        if (error.message.includes("CORS")) {
          console.error("⚠️ CORS Error - Check server CORS config");
        }
        if (error.message.includes("WebSocket")) {
          console.error("⚠️ WebSocket Error - Check network/firewall");
        }
      });

      // 3. ✅ DISCONNECT
      newSocket.on("disconnect", (reason) => {
        console.log("🔌 Socket disconnected. Reason:", reason);
      });

      // 4. ✅ WELCOME MESSAGE (যদি server থেকে পাঠায়)
      newSocket.on("welcome", (data) => {
        console.log("👋 Server welcome message:", data);
      });

      // 5. ✅ ONLINE USERS
      newSocket.on("getOnlineUsers", (userIds) => {
        // console.log("👥 Online users updated:", userIds.length, "users");
        set({ onlineUsers: userIds });
      });

      // 6. ✅ TEST RESPONSE
      newSocket.on("test-response", (data) => {
        console.log("📨 Server test response:", data);
      });

      // 7. ✅ ERROR EVENT
      newSocket.on("error", (error) => {
        console.error("💥 Socket error event:", error);
      });

      // ✅ Store এ socket save করুন
      // console.log("💾 Saving socket to Zustand store...");
      set({ socket: newSocket });

      // ✅ Manual connect (যদি autoConnect false থাকে)
      if (!newSocket.connected) {
        // console.log("🔗 Attempting manual connection...");
        newSocket.connect();
      }

      // ✅ 3 seconds পরে status check
      setTimeout(() => {
        const currentSocket = get().socket;
        // console.log("🕒 After 3 seconds - Socket status:");
        console.log(
          "- Connected:",
          currentSocket?.connected ? "✅ Yes" : "❌ No"
        );
        // console.log("- ID:", currentSocket?.id || "N/A");
      }, 3000);

      // console.log("🏁 === SOCKET CONNECTION COMPLETE ===");
    } catch (error) {
      console.error("💥 FATAL ERROR in connectSocket:", error);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      // console.log("🔌 Disconnecting socket...");
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },

  // ✅ Check socket status
  getSocketStatus: () => {
    const { socket } = get();
    // console.log("sokc", socket);

    return {
      connected: socket?.connected || false,
      id: socket?.id || null,
      active: !!socket,
    };
  },
}));
