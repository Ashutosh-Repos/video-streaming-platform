"use client";
import React, { useState, useEffect } from "react";
import HlsVideo from "hls-video-element/react";
import MediaThemeSutro from "player.style/sutro/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import HamsterWheel from "@/components/HamsterWheel";
import {
  IconShare3,
  IconThumbDown,
  IconThumbUp,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { videoResponse } from "@/app/dashboard/(main)/content/page";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [desOpen, setdesOpen] = useState<boolean>(false);
  const [video, setVideo] = useState<videoResponse>();
  const { id } = useParams<{ id: string }>();
  const [countdown, setcountdown] = useState<number>(120);
  const router = useRouter();
  console.log(id);
  const openVideo = async (id: string) => {
    try {
      const apiResponse = await fetch(
        `http://localhost:3000/api/video/watch?id=${id}`
      );
      const apidata = await apiResponse.json();
      if (apidata.success) {
        const data = apidata.data as videoResponse;
        setVideo(data);
        return;
      }
      toast.warning("unable to fetch video...");
      router.back();
      return;
    } catch (error: any) {
      toast.warning("something wrong");
      router.back();
    }
  };
  useEffect(() => {
    openVideo(id);
  }, [id]);

  if (!id)
    return (
      <div className="w-full h-full flex p-4 max-sm:flex-wrap bg-zinc-950 rounded-tl-xl">
        {" "}
        <div>{`there is no video with this id = ${id}`}</div>
      </div>
    );
  if (!video)
    return (
      <div className="w-full h-full flex p-4 max-sm:flex-wrap bg-zinc-950 rounded-tl-xl">
        <div className="flex flex-col items-center justify-center relative gap-4">
          <div className="min-w-20 min-h-20 w-40 h-40 aspect-square">
            <HamsterWheel />
          </div>
          <h1>
            {countdown > 40
              ? ` - Please wait video is loading video...`
              : `it went much longer then expected, seems either video url is wrong or network error\n returning back in ${countdown} seconds`}
          </h1>
        </div>
      </div>
    );
  return (
    <div className="w-full h-full flex p-4 max-sm:flex-wrap bg-zinc-950 rounded-tl-xl">
      <div className="h-max-screen w-full overflow-y-scroll">
        <div className="flex items-center justify-center w-full aspect-video">
          <MediaThemeSutro className="rounded-lg aspect-video">
            <HlsVideo
              slot="media"
              src={video.video}
              playsInline
              suppressHydrationWarning
              className="w-full"
              poster={video.thumbnail}
              autoplay
            ></HlsVideo>
          </MediaThemeSutro>
        </div>
        <div className="w-full h-max flex flex-col p-2 gap-2">
          <h1 className="text-2xl max-sm:text-xs">{video.title}</h1>
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              <Avatar className="w-10 h-10 max-sm:w-7 max-sm:h-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-col flex  text-sm font-bold">
                <span className="max-sm:text-sm w-max">T series</span>
                <span className="max-sm:text-[5px]">290 M subscribers</span>
              </div>
              <Button className="rounded-full cursor-pointer max-sm:h-8 w-max p-2.5">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-2 max-sm:w-full justify-between">
              <div className="rounded-full flex items-center justify-evenly w-max h-max">
                <Button className="flex gap-2 max-sm:gap-1 rounded-l-full cursor-pointer max-sm:w-12 max-sm:p-0 max-sm:h-8">
                  <IconThumbUp className="max-sm:w-5 max-sm:h-5" />
                  <p className="max-sm:text-xs">500</p>
                </Button>
                <Separator orientation="vertical" />
                <Button className="flex gap-2 max-sm:gap-1 rounded-r-full cursor-pointer max-sm:w-12 max-sm:p-0 max-sm:h-8">
                  <IconThumbDown className="max-sm:w-5 max-sm:h-5" />
                  <p className="max-sm:text-xs">500</p>
                </Button>
              </div>
              <Button className="rounded-full cursor-pointer max-sm:h-8">
                <IconShare3 /> Share
              </Button>
            </div>
          </div>
        </div>

        <div className="h-max w-full flex flex-col items-center justify-evenly gap-4 p-2">
          <Collapsible className="w-full">
            <CollapsibleTrigger
              className="text-xl font-bold flex items-center justify-center"
              onClick={() => {
                setdesOpen(!desOpen);
              }}
            >
              <h1 className="text-xl max-sm:text-sm">Description</h1>
              {desOpen ? <IconChevronUp /> : <IconChevronDown />}
            </CollapsibleTrigger>
            <CollapsibleContent className="max-sm:text-xs text-sm">
              {video.description}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="w-full h-full overflow-scroll text-4xl p-4 max-lg:hidden flex-2/5">
        <p>hello</p>
      </div>
    </div>
  );
};

export default page;
