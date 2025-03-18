import React from "react";
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

import { Separator } from "@/components/ui/separator";
import CustomTable from "./CustomTable";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="bg-inherit flex gap-6">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="playlist">Playlists</TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" />
        <TabsContent value="videos">
          <CustomTable
            caption="List of videos you uploaded..."
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
            ]}
          />
        </TabsContent>
        <TabsContent value="live">
          <CustomTable
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
            ]}
          />
        </TabsContent>
        <TabsContent value="posts">Posts</TabsContent>
        <TabsContent value="playlist">
          <CustomTable
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
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
