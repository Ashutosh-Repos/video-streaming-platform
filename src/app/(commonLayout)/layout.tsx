"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useState } from "react";
import {
  IconUser,
  IconDeviceTv,
  IconHome,
  IconBrandTwitter,
  IconLibrary,
  IconPlaylist,
  IconList,
} from "@tabler/icons-react";

import { ListVideo } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VideoSearchForm from "@/components/VideoSearchForm";
import logo from "@/../public/icons/logoclr.png";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
const DasboradLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-7 w-7  shrink-0" />
      ),
    },
    {
      label: "Playlists",
      href: "playlists",
      icon: (
        <ListVideo className="text-neutral-700 dark:text-neutral-200 h-7 w-7  shrink-0" />
      ),
    },
    {
      label: "Subscriptions",
      href: "subscriptions",
      icon: (
        <IconDeviceTv className="text-neutral-700 dark:text-neutral-200 h-7 w-7  shrink-0" />
      ),
    },
    {
      label: "Community Post",
      href: "posts",
      icon: (
        <IconBrandTwitter className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
    {
      label: "You",
      href: "user-profile",
      icon: (
        <IconUser className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
  ];
  return (
    <div className="w-full h-full flex relative">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10">
          <div className="flex max-md:w-full md:flex-col overflow-y-auto overflow-x-hidden">
            <div className="flex max-md:hidden md:gap-2 h-max">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="max-md:hidden text-sm font-bold h-full flex items-center justify-between">
                Channel Name
              </h4>
            </div>
            <div className="md:mt-8 max-md:w-full max-md:justify-evenly flex md:flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full h-full">
        <header className="w-full h-14 sticky top-0 bg-neutral-100 dark:bg-neutral-900 flex items-center gap-2 px-2 sm:px-4 max-sm:justify-between max-sm:flex-row-reverse">
          <VideoSearchForm />
          <div className="flex items-center justify-center gap-2 p-2">
            <Image src={logo} alt="logo" className="w-8" />
            <h1 className="font-bold sm:text-xl text-lg">StreamCast</h1>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default DasboradLayout;
