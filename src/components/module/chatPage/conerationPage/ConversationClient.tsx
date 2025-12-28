"use client";

import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { X } from "lucide-react";
import Link from "next/link";
import SendMessage from "@/components/shared/SendMessage";

const ConversationClient = () => {
  return (
    <div className="">
      <header className="bg-fuchsia-200">
        <div>
          <div className="border-2 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="size-10">
                  <Image
                    // src={selectedImg || authUser.profilePic || "/avatar.png"}
                    src={userProfile}
                    alt="User image"
                    className="size-full object-cover"
                  />
                </div>
                <h2 className="font-semibold">Omar Faruk</h2>
              </div>
              <div>
                <Link href="/chat">
                  <X />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <footer className="w-full">
        {/* <div className="border-2 p-2 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-10">
                <Image
                  // src={selectedImg || authUser.profilePic || "/avatar.png"}
                  src={userProfile}
                  alt="User image"
                  className="size-full object-cover"
                />
              </div>
              <h2 className="font-semibold">Omar Faruk</h2>
            </div>
            <div>
              <Link href="/chat">
                <X />
              </Link>
            </div>
          </div>
        </div> */}
        <SendMessage />
      </footer>
    </div>
  );
};

export default ConversationClient;
