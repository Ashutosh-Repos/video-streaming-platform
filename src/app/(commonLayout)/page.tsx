"use client";
import Image from "next/image";

import React from "react";
import VideoCard from "@/components/VideoCard";
import { TimeUnits } from "@/components/VideoCard";
import { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse {
  statusCode: Number;
  data: {} | [] | string;
  message: string;
  success: boolean;
}

import { videoResponse } from "../dashboard/(main)/content/page";
export default function Home() {
  const [videos, setVideos] = useState<videoResponse[]>();
  const dataFetch = async (url: string) => {
    console.log("working");
    const axiosRes = await axios(url);
    const apiResponse: ApiResponse = axiosRes.data;
    const videosData: videoResponse[] = apiResponse.data as videoResponse[];
    console.log(videosData);
    setVideos(videosData);
  };
  useEffect(() => {
    dataFetch(
      "http://localhost:3000/api/video?page=1&limit=10&sortBy=createdAt&sortType=dsc"
    );
  }, []);
  return (
    <div
      className=" font-[family-name:var(--font-roboto)] p-2 w-full h-[calc(100vh-3.5rem)] overflow-y-scroll grid max-md:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 place-items-center gap-4 rounded-tl-xl bg-black scroll-smooth"
      style={{ scrollbarWidth: "thin" }}
    >
      {videos?.length &&
        videos.map((e, index) => (
          <VideoCard
            key={index}
            id={e._id}
            timeUnit={TimeUnits.Minutes}
            title={e.title}
            views={e.views}
            videoSrc={e.video}
            thumbNail={e.thumbnail}
            published={1}
            channelLogoSrc=""
            channelName="my channel"
          />
        ))}
    </div>
  );
}
