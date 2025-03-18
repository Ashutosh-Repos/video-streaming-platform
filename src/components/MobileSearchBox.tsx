import React from "react";
import { useRef, useState } from "react";
import { useClkOut } from "@/hooks/useClkOut";
import { cn } from "@/lib/utils";
// import searchIcon from "@/../public/icons/search.svg";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { Input } from "./ui/input";
interface prop {
  onClickOutside: () => void;
  show: boolean;
}
const MobileSearchBox = ({ onClickOutside, show }: prop) => {
  const ref = useRef<HTMLFormElement>(null);
  useClkOut(ref, onClickOutside);
  return (
    show && (
      <form
        ref={ref}
        className={`left-0 absolute bg-black  w-full h-full flex items-center justify-center sm:hidden`}
      >
        <input
          type="text"
          name="query"
          className="w-full h-full outline-none px-4"
          placeholder="Search for videos or live streams"
        />
        {/* <Input
          type="text"
          placeholder="Search for videos or live streams"
          className="w-full h-full border-[1px] border-[#ccc] rounded-full outline-none pl-4 pr-12"
        /> */}
        {/* <IconSearch className="w-7 cursor-pointer absolute right-4" /> */}
      </form>
    )
  );
};

export default MobileSearchBox;
