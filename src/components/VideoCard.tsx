"use client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HlsVideo from "hls-video-element/react";
import MediaThemeSutro from "player.style/sutro/react";

// videojs mux-player
export enum TimeUnits {
  Years = "Years",
  Months = "Months",
  Weeks = "Weeks",
  Days = "Days",
  Hours = "Hours",
  Minutes = "Minutes",
  Seconds = "Seconds",
}

interface props {
  videoSrc: string;
  title: string;
  views: Number;
  published: Number;
  timeUnit: TimeUnits;
  channelLogoSrc: string;
  channelName: string;
  thumbNail: string;
  key: any;
  id: any;
}

const VideoCard = ({
  videoSrc,
  title,
  views = 0,
  published = 0,
  timeUnit = TimeUnits.Seconds,
  channelLogoSrc,
  channelName,
  thumbNail,
  id,
}: props) => {
  const router = useRouter();
  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };
  const openVideo = (id: string) => {
    router.push(`watch/${id}`);
  };

  return (
    <div
      className="w-full gap-2 flex flex-col relative"
      id={id}
      onClick={() => {
        openVideo(id);
      }}
    >
      <Image
        src={thumbNail}
        className="w-full h-auto rounded-xl aspect-video relative"
        alt="thumnail"
        width={640}
        height={360}
      />
      <div className="w-full flex gap-1 px-1.5 relative">
        <Avatar className="cursor-pointer w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full h-full grid grid-rows-2 text-white">
          <h1 className="text-lg">{title}</h1>
          <div className="text-xs">
            <p>{channelName}</p>
            <p>{`${views}K views . ${published} ${timeUnit} ago`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
