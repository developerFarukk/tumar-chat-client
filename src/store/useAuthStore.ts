/* eslint-disable @typescript-eslint/no-explicit-any */
import app_axios from "@/lib/axios";
import { TLogin } from "@/type/auth";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

//   checkAuth: async () => {
//     try {
//       const res = await app_axios.get("/auth/login");
//       set({ authUser: res.data });
//     //   get().connectSocket();
//     } catch (error) {
//       console.log("Error in authCheck:", error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       set({ authUser: res.data });

//       toast.success("Account created successfully!");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

// Login Function
  login: async (data: TLogin) => {
    
    set({ isLoggingIn: true });
    try {
      const res = await app_axios.post("/auth/login", data);
      set({ authUser: res.data });

      console.log("first Login", res.data);

      toast.success(res.data?.message || "Login successfully");

    //   get().connectSocket();
    } catch (error) {
        const err = error as any;
        console.log("err", err.response.data.details);
        
      toast.error(err.response.data.details);
    } finally {
      set({ isLoggingIn: false });
    }
  },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       get().disconnectSocket();
//     } catch (error) {
//       toast.error("Error logging out");
//       console.log("Logout error:", error);
//     }
//   },

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
