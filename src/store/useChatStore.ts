/* eslint-disable @typescript-eslint/no-explicit-any */
import app_axios from "@/lib/axios";
import { TChatStore } from "@/type/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { TMessage } from "@/type/message";

let messageHandler: ((msg: TMessage) => void) | null = null;

export const useChatStore = create<TChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isSoundEnabled") ?? "true")
      : true,

  toggleSound: () => {
    const nextValue = !get().isSoundEnabled;

    localStorage.setItem("isSoundEnabled", JSON.stringify(nextValue));
    set({ isSoundEnabled: nextValue });
  },

  //   setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await app_axios.get("/message/all-contacts");

      set({ allContacts: res?.data?.data });

      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.details || "No user data",
      };
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await app_axios.get("/message/chat-partner");
      set({ chats: res?.data?.data });
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.details || "No chat partner data",
      };
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await app_axios.get(`/message/chat/${userId}`);
      set({ messages: res?.data?.data });

      // ✅ selectedUser auto-set
      const allContacts = get().allContacts;
      const user = allContacts.find((u) => u._id === userId);
      if (user) set({ selectedUser: user });

      return { success: true, data: res?.data?.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "No chat partner data",
      };
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    // console.log("select llll", selectedUser?._id);

    const { authUser } = useAuthStore.getState();

    if (!authUser?._id || !selectedUser?._id) {
      return {
        success: false,
        message: "User not selected",
      };
    }

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage: TMessage = {
      _id: tempId,
      senderId: authUser?._id,
      receiverId: selectedUser?._id,
      text: messageData.text,
      // image: messageData.image
      //   ? URL.createObjectURL(messageData.image as File)
      //   : null,
      image: "",
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await app_axios.post(
        `/message/send-message/${selectedUser?._id}`,
        messageData
      );
      set({ messages: messages.concat(res?.data?.data) });
      // console.log("nnn", res?.data?.data);

      return {
        success: true,
        message: res?.data?.message,
        data: res?.data?.data,
      };
    } catch (error: any) {
      // remove optimistic message on failure
      set({ messages: messages });
      // console.log(error);

      return {
        success: false,
        message: error?.response?.data?.details || "Something went wrong",
      };
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    messageHandler = (newMessage: TMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;

      if (!isFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });

      if (isSoundEnabled) {
        const sound = new Audio("/sounds/notification.mp3");
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    };

    socket.on("newMessage", messageHandler);
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !messageHandler) return;

    socket.off("newMessage", messageHandler);
    messageHandler = null;
  },
}));
