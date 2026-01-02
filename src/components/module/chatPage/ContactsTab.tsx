

"use client";

import Image from "next/image";
import Link from "next/link";
import userProfile from "../../../../public/avatar.png";
import { TUser } from "@/type/auth";

export interface TContactsData {
  allContacts: TUser[];
}

const ContactsTab = ({ allContacts }: TContactsData) => {
  // console.log(allContacts?.length);

  return (
    <div className="">
      {allContacts?.length > 0 ? (
        allContacts.map((contact: TUser) => (
          <div key={contact?._id || contact?.email} className="mt-1">
            <Link href="/chat">
              <div className="border-2 p-1 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="size-10">
                      <Image
                        src={ contact?.image || userProfile}
                        alt="User image"
                        className="size-full object-cover"
                      />
                    </div>

                    <h2 className="font-semibold">
                      {contact?.name || "Unknown User"}
                    </h2>
                  </div>

                  <h2 className="">Offline</h2>
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

export default ContactsTab;
