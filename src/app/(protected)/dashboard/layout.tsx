"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconDeviceTv,
  IconUserBolt,
  IconGraph,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const DasboradLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    {
      label: "Analytics",
      href: "analytics",
      icon: (
        <IconGraph className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Content",
      href: "content",
      icon: (
        <IconDeviceTv className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Community",
      href: "community",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Exit",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
  ];
  return (
    <div className="w-full h-screen flex items-center relative">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex gap-2 h-max">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="text-sm font-bold h-full flex items-center justify-between">
                Channel Name
              </h4>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
};

export default DasboradLayout;
