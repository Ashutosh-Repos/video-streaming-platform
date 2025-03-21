"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlowingEffect } from "./ui/glowing-effect";

interface uploadeProps {
  name: string;
  type: string;
  handler: (files: File[]) => void;
}

const Uploader = ({ name, type, handler }: uploadeProps) => {
  const router = useRouter();

  return (
    <div className="w-full h-full bg-white dark:bg-black p-8 rounded-2xl flex flex-col items-center justify-center relative gap-4">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">{`Upload ${name}`}</h1>
        <X
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
      </div>
      <Separator />
      <div className="grow w-full h-full grid place-items-center relative">
        <div className="w-full max-w-4xl mx-auto min-h-80 border-[2px] border-dotted bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <FileUpload onChange={handler} />
        </div>
      </div>
      <p className="text-[8px]">{`File must be of type ${type}`}</p>
    </div>
  );
};

export default Uploader;
