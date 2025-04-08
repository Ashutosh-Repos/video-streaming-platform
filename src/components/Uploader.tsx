"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import VideoUploadForm from "./VideoUploadForm";
import { toast } from "sonner";
import HlsVideo from "hls-video-element/react";
import MediaThemeSutro from "player.style/sutro/react";
import HamsterWheel from "./HamsterWheel";
import Link from "next/link";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface uploadeProps {
  name: string;
  type: string;
}

const Uploader = ({ name, type }: uploadeProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<any>();
  const [err, setErr] = useState<any>();
  const [isSent, setIsSent] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [videoFileName, setVideoFileName] = useState<string>("");

  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    const textToCopy = videoUrl;
    if (textToCopy !== "") {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setVideoFileName(file.name);
    setBtnDisabled(true);
    try {
      const res = await fetch("http://localhost:3001/api/up", {
        method: "POST",
        body: formData,
      });
      console.log(res);

      if (!res?.ok) {
        toast("Unable to reach transcoder server.....");
        return;
      }
      if (!res?.body) {
        toast("Response body is null or undefined.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      async function readSSEStream() {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete");
          setBtnDisabled(false);
          return;
        }
        const text = decoder.decode(value, { stream: true });
        const sseMessages = text.split("\n\n");
        sseMessages.forEach((message) => {
          if (message) {
            setIsSent(true);
            const parsedMessage = parseSSEMessage(message);
            handleSSEData(parsedMessage);
          }
        });
        return readSSEStream();
      }
      await readSSEStream();
    } catch (error: any) {
      console.error("Upload or SSE failed:", error);
      toast(
        error?.message ||
          "video upload server error or unable to read server response"
      );
      setBtnDisabled(true);
      setIsSent(false);
    }
  };

  const parseSSEMessage = (message: string) => {
    const sseLines = message.split("\n");
    let data = "";
    let event = "";
    let id = "";

    sseLines.forEach((line) => {
      if (line.startsWith("data:")) {
        data += line.replace("data:", "").trim();
      } else if (line.startsWith("event:")) {
        event = line.replace("event:", "").trim();
      } else if (line.startsWith("id:")) {
        id = line.replace("id:", "").trim();
      }
    });

    return { data, event, id };
  };

  const handleSSEData = (parsedMessage: {
    data: string;
    event: string;
    id: string;
  }) => {
    try {
      const info = JSON.parse(parsedMessage.data);

      console.log(info);

      if (parseInt(parsedMessage.id) >= 0) {
        if (parseInt(parsedMessage.id) === 0) {
          console.log(info);
          setVideoUrl(info?.url?.master);
        }
        setStatus(info.message);
      } else {
        setErr(info?.err);
        setStatus("");
      }
    } catch (error) {
      console.error("Error parsing SSE data:", error);
      setErr("Failed to parse SSE message");
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-black rounded-2xl flex flex-col items-center justify-center relative gap-4 p-4">
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
      <div className="grow w-full h-full flex items-center justify-center relative p-4">
        {!isSent ? (
          <div className="w-full h-full flex flex-col items-center justify-center  bg-white dark:bg-black rounded-2xl">
            <FileUpload onChange={handleUpload} />
            <p className="text-[8px] mt-4">{`File must be of type ${type}`}</p>
          </div>
        ) : (
          <div className="w-full h-full dark:bg-black border-neutral-200 dark:border-neutral-800 flex items-center justify-center py-0 sm:py-4 relative max-md:flex-wrap">
            <VideoUploadForm videoUrl={videoUrl} />
            <div className="w-full max-w-96 gap-4 flex flex-col h-max p-4 bg-neutral-950 rounded-2xl relative  max-sm:hidden items-center justify-center">
              <div className="aspect-video w-full border-2  relative flex items-center justify-center">
                {videoUrl && (
                  <MediaThemeSutro>
                    <HlsVideo
                      slot="media"
                      src={videoUrl}
                      playsInline
                      suppressHydrationWarning
                      className="w-full"
                      muted
                    ></HlsVideo>
                  </MediaThemeSutro>
                )}
              </div>

              {videoUrl ? (
                <div className="w-full h-max px-2 flex flex-col overflow-x-scroll mb-2">
                  <div className="relative w-full h-8 flex items-center justify-between">
                    <p className="text-xs text-zinc-400 font-medium ">
                      Video Link
                    </p>
                    <button
                      onClick={copyToClipboard}
                      className="h-max w-max flex items-center justify-center"
                    >
                      {copied ? (
                        <IconCheck
                          className="absolute right-0 z-[1] cursor-pointer"
                          size={16}
                        />
                      ) : (
                        <IconCopy
                          size={16}
                          className="absolute right-0 z-[1] cursor-pointer"
                        />
                      )}
                    </button>
                  </div>
                  <div className="relative flex mb-4 w-full overflow-x-scroll h-max ">
                    <Link
                      className="text-[10px] w-full px-2 text-sky-400"
                      href={videoUrl}
                    >
                      {videoUrl}
                    </Link>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">File name</p>
                  <p className="text-xs text-zinc-400 font-medium">
                    {videoFileName}
                  </p>
                </div>
              ) : (
                <div className="w-20 aspect-square">
                  <HamsterWheel />
                </div>
              )}

              <p className="text-xs">{status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
