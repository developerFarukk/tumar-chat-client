"use client";

import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { LoaderIcon, X } from "lucide-react";
import Link from "next/link";
import SendMessage from "@/components/shared/SendMessage";
import { useChatStore } from "@/store/useChatStore";
import React, { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { TMessage } from "@/type/message";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { FormatLocalDate } from "@/components/shared/FormatLocalDate";

export interface TConversation {
  userId: string;
}

const ConversationClient = ({ userId }: TConversation) => {
  // console.log("params", userId);

  const {
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessagesByUserId(userId);
    subscribeToMessages();

    // clean up
    // return () => unsubscribeFromMessages();
    return unsubscribeFromMessages;
  }, [
    selectedUser,
    getMessagesByUserId,
    userId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // console.log("messffff", messages);

  // console.log("selectuser fff", selectedUser);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
                <h2 className="font-semibold">Omar Faruk</h2>
              </div>

              <Link href="/chat">
                <X />
              </Link>
            </div>
          </div>
        </header>
        {/* body */}
        <div className="min-h-[70vh]  m-2 p-2 rounded-lg flex flex-col-reverse overflow-y-auto">
          {messages?.length > 0 && !isMessagesLoading ? (
            <div className="space-y-3">
              {messages?.map((msg: TMessage) => (
                <React.Fragment key={msg._id}>
                  <div>
                    {/* My text - Latest message at bottom */}
                    {msg?.senderId === authUser?._id ? (
                      <div className="flex justify-end">
                        <div className="max-w-[80%]">
                          <div className="bg-sky-300 rounded-2xl rounded-tr-none p-3">
                            <p className="text-gray-800">{msg?.text}</p>
                          </div>
                          <div className="p-1 flex justify-end">
                            {msg?.image && (
                              <Image
                                src={msg.image}
                                alt="Shared"
                                className="rounded-lg h-48 object-cover"
                                height={100}
                                width={100}
                              />
                            )}
                          </div>
                          <span className="text-xs text-gray-500 block text-right mt-1">
                            {/* {msg?.createdAt} */}
                            {FormatLocalDate(msg?.createdAt)}
                            {/* 10:30 AM */}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="max-w-[80%]">
                          <div className="bg-amber-100 rounded-2xl rounded-tl-none p-3">
                            <p className="text-gray-800">{msg?.text}</p>
                          </div>
                          <div className="p-1">
                            {msg?.image && (
                              <Image
                                src={msg.image}
                                alt="Shared"
                                className="rounded-lg h-48 object-cover"
                                height={100}
                                width={100}
                              />
                            )}
                          </div>
                          <span className="text-xs text-gray-500 block mt-1">
                            {FormatLocalDate(msg?.createdAt)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
              <div ref={messageEndRef} />
            </div>
          ) : isMessagesLoading ? (
            <LoaderIcon />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser?.name} />
          )}
        </div>
        {/* footer */}
        <footer className="w-full flex-none">
          <SendMessage />
        </footer>
      </div>
    </div>
  );
};

export default ConversationClient;
