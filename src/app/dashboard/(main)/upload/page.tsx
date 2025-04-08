"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Uploader from "@/components/Uploader";

const page = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File>();
  const handleFileUpload = (files: File) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full h-full grid place-items-center z-20 absolute backdrop-blur-[2px] sm:p-10 p-0">
      <Uploader
        name="Video"
        type="video/.mkv , video/.mp4"
        // handler={handleFileUpload}
      />
    </div>
  );
};

export default page;
