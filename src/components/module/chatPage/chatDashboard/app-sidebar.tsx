"use client";

import * as React from "react";

// const mouseClickSound = new Audio("../../../../../public/sounds");

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Image from "next/image";
import userProfile from "../../../../../public/avatar.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/components/shared/useCurrentUser";
import Loader from "@/components/shared/Loader";
import ChatsTab from "../ChatsTab";
import ContactsTab from "../ContactsTab";
import { useChatStore } from "@/store/useChatStore";
import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const clickSoundRef = React.useRef<HTMLAudioElement | null>(null);
  const { user, loading } = useCurrentUser();
  const {
    getAllContacts,
    getMyChatPartners,
    allContacts,
    chats,
    isUsersLoading,
    isSoundEnabled,
    toggleSound,
  } = useChatStore();

  React.useEffect(() => {
    getAllContacts();
    getMyChatPartners();
  }, [getAllContacts, getMyChatPartners]);

  // console.log("get all contacts", allContacts);
  // console.log("get all contacts", chats);

  React.useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click.mp3");
  }, []);

  if (loading || isUsersLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className=" p-1 bg-fuchsia-300 hover:bg-fuchsia-400"
            >
              <div className="flex justify-between items-center p-1 ">
                <Link href="/chat" className="flex items-center justify-center text-center">
                  <div className="  flex  size-12 items-center justify-center p-1 ">
                    {/* <CircleUserRound /> */}
                    <Image
                      // src={selectedImg || authUser.profilePic || "/avatar.png"}
                      src={user?.image || userProfile}
                      alt="User image"
                      className="size-full object-cover"
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">Online</span>
                  </div>
                </Link>
                <div className="p-2">
                  <Button
                    className="bg-yellow-100 text-black hover:bg-yellow-400"
                    onClick={() => {
                      if (isSoundEnabled && clickSoundRef.current) {
                        clickSoundRef.current.currentTime = 0;
                        clickSoundRef.current.play().catch(() => {});
                      }

                      toggleSound();
                    }}
                  >
                    {isSoundEnabled ? (
                      <Volume2Icon className="size-5" />
                    ) : (
                      <VolumeOffIcon className="size-5" />
                    )}
                  </Button>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Tab Contents */}
        <Tabs defaultValue="chats" className=" border-amber-100 border-2 ">
          <div className=" w-full">
            <TabsList className="w-full bg-amber-100 italic">
              <TabsTrigger value="chats" className="font-bold">
                Chats
              </TabsTrigger>
              <TabsTrigger value="contacts" className="font-bold">
                Contacts
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="chats">
            <ChatsTab chatsPerner={chats} />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab allContacts={allContacts} />
          </TabsContent>
        </Tabs>

        {/* Main Content */}
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
