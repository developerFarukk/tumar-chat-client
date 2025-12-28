"use client";

import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { X } from "lucide-react";
import Link from "next/link";
import SendMessage from "@/components/shared/SendMessage";

const ConversationClient = () => {
  return (
    // <div className="min-h-screen flex flex-col">
    //   {/* header */}
    //   <header className="bg-fuchsia-200">
    //     <div className="border-2 p-2 rounded-lg">
    //       <div className="flex justify-between items-center">
    //         <div className="flex items-center gap-2">
    //           <div className="size-10">
    //             <Image
    //               src={userProfile}
    //               alt="User image"
    //               className="size-full object-cover"
    //             />
    //           </div>
    //           <h2 className="font-semibold">Omar Faruk</h2>
    //         </div>

    //         <Link href="/chat">
    //           <X />
    //         </Link>
    //       </div>
    //     </div>
    //   </header>

    //   {/* body */}
    //   <div className="flex-1 overflow-auto px-3 py-2">
    //     body text message show
    //   </div>

    //   {/* footer */}
    //   <footer className="w-full mt-auto">
    //     <SendMessage />
    //   </footer>
    // </div>
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
      <div className="min-h-[72vh]">
        body text message show
      </div>

      {/* footer */}
      <footer className="w-full flex-none">
        <SendMessage />
      </footer>
    </div>
  );
};

export default ConversationClient;
