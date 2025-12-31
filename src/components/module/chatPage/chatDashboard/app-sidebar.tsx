"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useCurrentUser();

  if (loading)
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
        <Tabs defaultValue="account" className=" border-amber-100 border-2 ">
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
            <div className="">
              <div className="mt-1">
                <Link href="/chat/user">
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
          </TabsContent>
          <TabsContent value="contacts">
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
          </TabsContent>
        </Tabs>

        {/* Main Content */}
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
