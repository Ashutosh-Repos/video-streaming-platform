import React from "react";
import {
  IconPencil,
  IconMessageDots,
  IconDownload,
  IconFileAnalytics,
  IconBrandYoutube,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";

interface Props {
  title: string;
  id: string;
  thumbnail: string;
}

const StdVideo = ({ title, id, thumbnail }: Props) => {
  return (
    <div className="w-full  h-full flex p-1 justify-center gap-4 relative">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="aspect-video rounded-lg bg-black w-full min-w-36"
        ></img>
      ) : (
        <div className="aspect-video rounded-lg bg-black w-full min-w-36"></div>
      )}
      <div className="w-full h-full flex flex-col  gap-2">
        <h1 className="h-max p-1 text-lg">{title}</h1>
        <div className="flex w-full h-full items-center justify-start gap-2.5 grow">
          <IconPencil className="cursor-pointer" />
          <IconMessageDots className="cursor-pointer" />
          <IconBrandYoutube className="cursor-pointer" />
          <IconDownload className="cursor-pointer" />
          <IconTrash className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default StdVideo;
