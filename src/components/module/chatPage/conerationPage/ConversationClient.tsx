"use client";

import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { X } from "lucide-react";
import Link from "next/link";
import SendMessage from "@/components/shared/SendMessage";

const ConversationClient = () => {
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

        {/* footer */}
        <footer className="w-full flex-none">
          <SendMessage />
        </footer>
      </div>
    </div>
  );
};

export default ConversationClient;
