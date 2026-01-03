"use client";

import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { LoaderIcon, X } from "lucide-react";
import Link from "next/link";
import SendMessage from "@/components/shared/SendMessage";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { TMessage } from "@/type/message";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

export interface TConversation {
  userId: string;
}

const ConversationClient = ({ userId }: TConversation) => {
  // console.log("jjj", userId);

  const { getMessagesByUserId, messages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // console.log("fffff", authUser);
  

  useEffect(() => {
    getMessagesByUserId(userId);
    // subscribeToMessages();

    // clean up
    // return () => unsubscribeFromMessages();
  }, [
    // selectedUser,
    getMessagesByUserId,
    userId,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  ]);

  console.log("messffff", messages);

  return (
    <div className="border-2 rounded-xl p-2 bg-fuchsia-100">
      <div className=" flex flex-col">
        {/* header */}
        <header className="bg-fuchsia-200">
          <div className="border-2 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="size-10">
                  <Image
                    src={userProfile}
                    alt="User image"
                    className="size-full object-cover"
                  />
                </div>
                <h2 className="font-semibold">Omar Faruk {userId}</h2>
              </div>

              <Link href="/chat">
                <X />
              </Link>
            </div>
          </div>
        </header>
        {/* body */}
        <div className="min-h-[70vh] bg-sky-100 m-2 p-2 rounded-lg flex flex-col-reverse overflow-y-auto">
          <div className="space-y-3">
            {/* My text - Latest message at bottom */}
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <div className="bg-sky-300 rounded-2xl rounded-tr-none p-3">
                  <p className="text-gray-800">this is my latest text</p>
                </div>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  10:30 AM
                </span>
              </div>
            </div>

            {/* friend text */}
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="bg-amber-100 rounded-2xl rounded-tl-none p-3">
                  <p className="text-gray-800">this is friend text</p>
                </div>
                <span className="text-xs text-gray-500 block mt-1">
                  10:25 AM
                </span>
              </div>
            </div>

            {/* আরও মেসেজ... */}
          </div>
        </div>
        <div className="flex-1 px-6 overflow-y-auto py-8">
          {messages?.length > 0 && !isMessagesLoading ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages?.map((msg: TMessage) => (
                <div
                  key={msg?._id}
                  className={`chat ${
                    msg?.senderId === authUser?._id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble relative ${
                      msg.senderId === authUser?._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg?.image && (
                      <Image
                        src={msg?.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                        height={100}
                        width={100}
                      />
                    )}
                    {msg?.text && <p className="mt-2">{msg?.text}</p>}
                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                      {new Date(msg?.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {/* 👇 scroll target */}
              <div ref={messageEndRef} />
            </div>
          ) : isMessagesLoading ? (
            <LoaderIcon />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser?.name} />
          )}
        </div>
        +{/* footer */}
        <footer className="w-full flex-none">
          <SendMessage />
        </footer>
      </div>
    </div>
  );
};

export default ConversationClient;
