"use client";

import * as React from "react";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useCurrentUser();
  const { getAllContacts, allContacts, isUsersLoading } =
    useChatStore();

  React.useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  console.log("get all contacts", allContacts);

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
              className="bg-fuchsia-300 hover:bg-fuchsia-400 p-1"
            >
              <Link href="/chat">
                <div className="  flex  size-12 items-center justify-center p-1">
                  {/* <CircleUserRound /> */}
                  <Image
                    // src={selectedImg || authUser.profilePic || "/avatar.png"}
                    src={user?.image || userProfile}
                    alt="User image"
                    className="size-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">Online</span>
                </div>
              </Link>
              {/* <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header> */}
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
            <ChatsTab />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab />
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
