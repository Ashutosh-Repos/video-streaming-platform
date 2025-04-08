"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Uploader from "@/components/Uploader";
import Model from "@/components/Modal";
import { Button } from "@/components/ui/button";

const page = () => {
  const router = useRouter();
  const [file, setFiles] = useState<File>();
  const handleFileUpload = (files: File) => {
    setFiles(file);
    console.log(file);
  };

  const upload = () => {
    console.log(file);
  };

  return (
    <Model>
      <Uploader name="Video" type="video/.mkv , video/.mp4" />
    </Model>
  );
};

export default page;
