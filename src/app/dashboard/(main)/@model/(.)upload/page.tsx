"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Uploader from "@/components/Uploader";
import Model from "@/components/Modal";
import { Button } from "@/components/ui/button";

const page = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const upload = () => {
    console.log(files);
  };

  return (
    <Model>
      <Uploader
        name="Video"
        type="video/.mkv , video/.mp4"
        handler={handleFileUpload}
      />
      {files?.map((file, index) => (
        <p key={index}>
          {file.name}:size{files.length}
        </p>
      ))}
      <Button onClick={upload}>Console</Button>
    </Model>
  );
};

export default page;
