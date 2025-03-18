"use client";
import React, { useState, useRef } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { IconSearch } from "@tabler/icons-react";
// import searchIcon from "@/../public/icons/search.svg";
import MobileSearchBox from "./MobileSearchBox";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
const VideoSearchForm = () => {
  const [isMobileSearchForm, setIsMobileSearchForm] = useState(false);
  const [active, setActive] = useState(false);
  const handleSubmit = () => {};
  return (
    <>
      <form className="w-full h-10 flex items-center justify-center gap-2 max-sm:hidden">
        <input
          type="text"
          name="query"
          className="w-full h-full outline-none  pl-4 pr-4"
          placeholder="Search for videos or live streams"
        />
        <Separator orientation="vertical" />
        {/* <IconSearch className="w-7 cursor-pointer" onClick={handleSubmit} /> */}
      </form>
      <IconSearch
        className="w-7 cursor-pointer sm:hidden"
        onClick={() => {
          setIsMobileSearchForm(true);
        }}
      />
      <MobileSearchBox
        show={isMobileSearchForm}
        onClickOutside={() => {
          setIsMobileSearchForm(false);
        }}
      />
    </>
  );
};

export default VideoSearchForm;
