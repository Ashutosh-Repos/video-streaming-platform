"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Uploader from "@/components/Uploader";

const page = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <Uploader
      name="Video"
      type="video/.mkv , video/.mp4"
      handler={handleFileUpload}
    />
  );
};

export default page;
