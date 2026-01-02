/* eslint-disable @typescript-eslint/no-explicit-any */
import app_axios from "@/lib/axios";
import { TChatStore } from "@/type/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useChatStore = create<TChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  //   messages: [],
  //   activeTab: "chats",
  //   selectedUser: null,
  isUsersLoading: false,
  //   isMessagesLoading: false,
  //   isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  //   toggleSound: () => {
  //     localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
  //     set({ isSoundEnabled: !get().isSoundEnabled });
  //   },

  //   setActiveTab: (tab) => set({ activeTab: tab }),
  //   setSelectedUser: (selectedUser) => set({ selectedUser }),

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

  //   getMessagesByUserId: async (userId) => {
  //     set({ isMessagesLoading: true });
  //     try {
  //       const res = await axiosInstance.get(`/messages/${userId}`);
  //       set({ messages: res.data });
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Something went wrong");
  //     } finally {
  //       set({ isMessagesLoading: false });
  //     }
  //   },

  //   sendMessage: async (messageData) => {
  //     const { selectedUser, messages } = get();
  //     const { authUser } = useAuthStore.getState();

  //     const tempId = `temp-${Date.now()}`;

  //     const optimisticMessage = {
  //       _id: tempId,
  //       senderId: authUser._id,
  //       receiverId: selectedUser._id,
  //       text: messageData.text,
  //       image: messageData.image,
  //       createdAt: new Date().toISOString(),
  //       isOptimistic: true, // flag to identify optimistic messages (optional)
  //     };
  //     // immidetaly update the ui by adding the message
  //     set({ messages: [...messages, optimisticMessage] });

  //     try {
  //       const res = await axiosInstance.post(
  //         `/messages/send/${selectedUser._id}`,
  //         messageData
  //       );
  //       set({ messages: messages.concat(res.data) });
  //     } catch (error) {
  //       // remove optimistic message on failure
  //       set({ messages: messages });
  //       toast.error(error.response?.data?.message || "Something went wrong");
  //     }
  //   },

  //   subscribeToMessages: () => {
  //     const { selectedUser, isSoundEnabled } = get();
  //     if (!selectedUser) return;

  //     const socket = useAuthStore.getState().socket;

  //     socket.on("newMessage", (newMessage) => {
  //       const isMessageSentFromSelectedUser =
  //         newMessage.senderId === selectedUser._id;
  //       if (!isMessageSentFromSelectedUser) return;

  //       const currentMessages = get().messages;
  //       set({ messages: [...currentMessages, newMessage] });

  //       if (isSoundEnabled) {
  //         const notificationSound = new Audio("/sounds/notification.mp3");

  //         notificationSound.currentTime = 0; // reset to start
  //         notificationSound
  //           .play()
  //           .catch((e) => console.log("Audio play failed:", e));
  //       }
  //     });
  //   },

  //   unsubscribeFromMessages: () => {
  //     const socket = useAuthStore.getState().socket;
  //     socket.off("newMessage");
  //   },
}));
