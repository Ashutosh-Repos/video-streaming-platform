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
  model,
}: Readonly<{ children: React.ReactNode; model: React.ReactNode }>) => {
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    {
      label: "Analytics",
      href: "analytics",
      icon: (
        <IconGraph className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
    {
      label: "Content",
      href: "content",
      icon: (
        <IconDeviceTv className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
    {
      label: "Community",
      href: "community",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
    {
      label: "Exit",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-7 w-7 shrink-0" />
      ),
    },
  ];
  return (
    <div className="w-full h-full relative flex md:flex-row-reverse">
      <div
        className="w-full md:h-full h-[calc(100vh-3.5rem)] border-2 border-green-500 overflow-y-scroll relative flex"
        style={{ scrollbarWidth: "thin" }}
      >
        {children}
        {model}
      </div>

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10 relative">
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
    </div>
  );
};

export default DasboradLayout;
