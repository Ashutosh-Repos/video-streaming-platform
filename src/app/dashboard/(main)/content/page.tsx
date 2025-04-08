"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StdVideo from "./StdVideo";
import { IconLock, IconWorld } from "@tabler/icons-react";
import { IconRotate } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import CustomTable from "./CustomTable";
import { toast } from "sonner";

export interface videoResponse {
  _id: string;
  owner: string;
  video: string;
  thumbnail: string;
  title: string;
  description: string;
  age_restriction: boolean;
  public: boolean;
  views: number;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const page = () => {
  const [videos, setVideos] = useState<videoResponse[] | null>(null);
  const getVideos = async () => {
    const readyData = {
      id: "67d541d6a2af61b312f0a51e",
    };
    try {
      const videosRes = await fetch(
        "http://localhost:3000/api/studio/content/videos?page=1&limit=10&sortBy=createdAt&sortType=dsc&id=67d541d6a2af61b312f0a51e",
        {
          method: "GET",
        }
      );
      const videosTabData = await videosRes.json();
      if (!videosTabData?.success) {
        toast(`${videosTabData.error || "server error"}`);
        return;
      }
      toast(`${videosTabData.data}`);
      setVideos(videosTabData.data);
      console.log(videos);
    } catch (error: any) {
      toast.warning(`${error.message || "some-thing wrong"}`);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className="w-full h-full flex flex-col p-2 overflow-scroll">
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="bg-inherit flex gap-6">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="playlist">Playlists</TabsTrigger>
          <IconRotate onClick={getVideos} className="cursor-pointer" />
        </TabsList>
        <Separator orientation="horizontal" />
        <TabsContent value="videos">
          {videos && (
            <CustomTable
              caption="List of videos you uploaded..."
              columns={[
                "Video",
                "Visibility",
                "Date",
                "Views",
                "Likes",
                "Comments",
              ]}
              data={videos}
            />
          )}
        </TabsContent>
        <TabsContent value="live">
          {/* <CustomTable
            caption="List of live streams you have done..."
            columns={["Video", "Visibility", "Date", "Views", "Comments"]}
            data={[
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
            ]}
          /> */}
        </TabsContent>
        <TabsContent value="posts">Posts</TabsContent>
        <TabsContent value="playlist">
          {/* <CustomTable
            caption="List of paylists you created..."
            columns={["Video", "Visibility", "Date", "Views", "Comments"]}
            data={[
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
              {
                visibility: "Private",
                date: new Date(),
                views: 100,
                commentsCnt: 100,
                title: "string",
                id: "string",
                thumbnail: "string",
              },
            ]}
          /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
