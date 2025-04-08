"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

interface videosMeta {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
}
interface playlistMeta {
  _id: string;
  title: string;
  description: string;
  public: boolean;
  createdAt: string;
  videos: videosMeta[];
  creator: {
    _id: string;
    username?: string;
    avatar?: string;
    name?: string;
  };
}
interface ApiResponse {
  success: string;
  message: string;
  data: playlistMeta[];
}

const page = () => {
  const [playlistData, setPlaylistData] = useState<playlistMeta[]>([]);
  const getPlaylists = async (url: string) => {
    console.log("working");
    const axiosRes = await axios(url);
    const apiResponse: ApiResponse = await axiosRes.data;
    const data: playlistMeta[] = apiResponse.data as playlistMeta[];
    setPlaylistData(data);
    console.log(playlistData);
  };
  useEffect(() => {
    getPlaylists(
      `http://localhost:3000/api/playlist?id=67d54232a2af61b312f0a521`
    );
  }, []);
  const CARDS = [
    {
      id: 0,
      name: "Manu Arora",
      designation: "Senior Software Engineer",
      content: (
        <p>
          These cards are amazing, <Highlight>I want to use them</Highlight> in
          my project. Framer motion is a godsend ngl tbh fam 🙏
        </p>
      ),
    },
    {
      id: 1,
      name: "Elon Musk",
      designation: "Senior Shitposter",
      content: (
        <p>
          I dont like this Twitter thing,{" "}
          <Highlight>deleting it right away</Highlight> because yolo. Instead, I
          would like to call it <Highlight>X.com</Highlight> so that it can
          easily be confused with adult sites.
        </p>
      ),
    },
    {
      id: 2,
      name: "Tyler Durden",
      designation: "Manager Project Mayhem",
      content: (
        <p>
          The first rule of
          <Highlight>Fight Club</Highlight> is that you do not talk about fight
          club. The second rule of
          <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
          club.
        </p>
      ),
    },
  ];
  return (
    <div
      className=" font-[family-name:var(--font-roboto)] p-4 pt-8 w-full h-max max-h-[calc(100vh-3.5rem)] overflow-y-scroll grid max-md:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 place-items-center gap-8 rounded-xl  scroll-smooth"
      style={{ scrollbarWidth: "thin" }}
    >
      {playlistData.map((plylist: playlistMeta, index) => (
        <div
          className="h-full flex items-center justify-center w-full flex-col gap-2"
          key={index}
        >
          <CardStack items={plylist.videos || []} />
          <div className="w-full flex gap-1 px-1.5 relative">
            <Avatar className="cursor-pointer w-10 h-10">
              <AvatarImage src={plylist.creator.avatar} />
              <AvatarFallback>
                {plylist.creator.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="w-full h-full grid grid-rows-2 text-white">
              <h1 className="text-lg">{plylist.title || "hello"}</h1>
              <div className="text-xs">
                <p>{plylist.creator.username || "my channel"}</p>
                {/* <p>{`${10}K views . ${10} ${"days"} ago`}</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
