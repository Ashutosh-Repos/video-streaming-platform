import React from "react";
import Image from "next/image";
import logo from "@/../public/icons/logo.svg";
import { Upload, Radio } from "lucide-react";
import recorder from "@/../public/icons/recorder.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import VideoSearchForm from "./VideoSearchForm";

import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = async () => {
  return (
    <header className="w-full h-16 flex items-center justify-between  p-0.5 md:px-3 lg:px-4 gap-2 border-b-2 relative bg-inherit">
      <div className="flex items-center justify-between font-bold text-2xl gap-2">
        <Image src={logo} alt="logo" className="h-full aspect-square" />
        <h1>Vidtube</h1>
      </div>
      <VideoSearchForm />
    </header>
  );
};

export default Header;
