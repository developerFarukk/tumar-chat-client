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
        <div className="min-h-[70vh] bg-sky-100 m-2 p-2 rounded-lg">
          <div>
            {/* My text */}
            <div className="flex justify-end mt-1">
              <h2 className="text-lg bg-sky-300 w-fit rounded-md p-2">
                this is my text
              </h2>
            </div>

            {/*  friend  text */}
            <div className="flex justify-start mt-1">
              <h2 className="text-lg bg-amber-100 w-fit rounded-md p-2">
                this is friend text
              </h2>
            </div>
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
