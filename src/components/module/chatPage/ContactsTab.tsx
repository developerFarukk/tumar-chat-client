"use client"

import Image from "next/image";
import Link from "next/link";
import userProfile from "../../../../public/avatar.png";
import { TUser } from "@/type/auth";

export interface TContactsData {
  allContacts: TUser[]
}

const ContactsTab = ({allContacts}: TContactsData) => {

  console.log(allContacts);
  

  return (
    <div className="">
      <div className="mt-1">
        <Link href="/chat">
          <div className="border-2 p-1 rounded-lg">
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
              <h2 className="">Ofline</h2>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-1">
        <Link href="/chat">
          <div className="border-2 p-1 rounded-lg">
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
              <h2 className="">Ofline</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ContactsTab;
