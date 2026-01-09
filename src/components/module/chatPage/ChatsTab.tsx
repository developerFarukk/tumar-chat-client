"use client";

import Image from "next/image";
import Link from "next/link";
import userProfile from "../../../../public/avatar.png";
import { TUser } from "@/type/auth";
import { useAuthStore } from "@/store/useAuthStore";

export interface TChtaPertnerContactsData {
  chatsPerner: TUser[];
}

const ChatsTab = ({ chatsPerner }: TChtaPertnerContactsData) => {
  // console.log(chatsPerner);

  const { onlineUsers } = useAuthStore();

  // console.log("online users", onlineUsers);
  

  return (
    <div className="">
      {chatsPerner?.length > 0 ? (
        chatsPerner.map((contact: TUser) => (
          <div key={contact?._id || contact?.email} className="mt-1">
            <Link href={`/chat/${contact?._id}`}>
              <div className="border-2 p-1 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="size-10">
                      <Image
                        src={contact?.image || userProfile}
                        alt="User image"
                        className="size-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h2 className="font-semibold">
                      {contact?.name || "Unknown User"}
                    </h2>
                  </div>

                  {/* <h2 className="">Offline</h2> */}
                  <div>{`${onlineUsers.includes(contact?._id) ? "online" : "offline"}`}</div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div>Contacts list is Empty</div>
      )}
    </div>
  );
};

export default ChatsTab;
