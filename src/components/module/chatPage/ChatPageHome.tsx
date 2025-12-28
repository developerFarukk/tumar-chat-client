"use client";

import { MessageCircleIcon } from "lucide-react";

const ChatPageHome = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center overflow-hidden px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-4 max-w-md">
          <div className="size-20 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <MessageCircleIcon className="size-10 text-cyan-400" />
          </div>

          <h3 className="text-xl font-semibold">Select a conversation</h3>

          <p className="text-slate-600">
            Choose a contact from the sidebar to start chatting or continue a
            previous conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPageHome;
