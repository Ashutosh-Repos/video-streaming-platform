"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  titleValidation,
  descriptionValidation,
} from "@/app/zod/commonValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MiniFileUpload } from "./MiniUpload";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

const fromSchema = z.object({
  title: titleValidation,
  description: descriptionValidation,
  thumbnail: z.string(),
  age_restriction: z.enum(["true", "false"]),
  visibility: z.enum(["true", "false"]),
});

interface IPropsVideoUpload {
  videoUrl: string;
}

const VideoUploadForm = ({ videoUrl }: IPropsVideoUpload) => {
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [avtrSuccess, setAvtrSuccess] = useState<boolean>(false);
  const [videourl, setVideourl] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  useEffect(() => {
    setVideourl(videoUrl);
  }, [videoUrl]);
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      age_restriction: "false",
      visibility: "false",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof fromSchema>) => {
    const id = `67d541d6a2af61b312f0a51e`;
    if (videourl && videourl === "") {
      toast.warning(
        `unable to get video url \n -weak connection or server serror`
      );
    }
    const readyData = {
      ...data,
      id: id,
      visibility: data.visibility === "true",
      age_restriction: data.age_restriction === "true",
      video: videoUrl,
    };
    console.log(readyData);
    try {
      setSaving(true);
      const res = await fetch(
        `http://localhost:3000/api/studio/videos/save_video`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...readyData }),
        }
      );
      console.log(res);
      const resMessage = await res.json();
      console.log(resMessage);
      setSaving(false);
      if (resMessage?.success) {
        toast.success(resMessage?.message);
        router.back();
        return;
      }

      toast.warning(`${resMessage?.error}`);
    } catch (error: any) {
      setSaving(false);
      toast.warning(
        `some-thing went wrong:${error?.message ? `\nerror:${error.message}` : ``}`
      );
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const id = `67d541d6a2af61b312f0a51e`;
      const route = `http://localhost:3000/api/studio/videos/upload_thumbnail`;
      const fromData = new FormData();
      fromData.append("id", id);
      fromData.append("thumbnail", file);
      const avatarResponse = await fetch(route, {
        method: "POST",
        body: fromData,
      });
      const data = await avatarResponse.json();
      if (data.success) {
        const fileUrl = data.data.url as string;
        form.setValue("thumbnail", fileUrl);
      } else {
        form.setError("thumbnail", {
          message: data.error || "failed to upload",
        });
      }
    } catch (error: any) {
      form.setError("thumbnail", {
        message: error?.message || "failed to upload",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-96 min-w-64 w-full gap-4 flex flex-col h-max p-4 max-sm:p-0  relative bg-transparent backdrop-blur-sm overflow-y-scroll "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="username or email"
                  {...field}
                  type={`text`}
                  className="text-xs max-sm:h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={5}
                  cols={33}
                  className="bg-zinc-800 rounded-lg px-2 py-2 text-xs max-sm:text-[8px] sm:text-sm"
                  placeholder="write description for video"
                ></textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <MiniFileUpload onChange={handleAvatarUpload} />
              <FormMessage />
              {avtrSuccess && <p className="text-xs text-green-400">✅ ok.</p>}
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 justify-between">
          <FormField
            control={form.control}
            name="age_restriction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col text-left w-max h-max items-start">
                  <h2 className="text-md text-left">Age Restriction</h2>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-accent text-zinc-400 cursor-pointer h-7 w-max">
                      <SelectValue placeholder={`${field.value}`} {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={`true`}>Yes</SelectItem>
                    <SelectItem value={`false`}>No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col text-left w-max h-max items-start">
                  <h2 className="text-md text-left">Visibility</h2>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex h-7 pr-6"
                  >
                    <div className="flex items-center gap-1">
                      <RadioGroupItem
                        value={"false"}
                        id={"private"}
                        className="border-zinc-100 w-2 h-2"
                      />
                      <Label htmlFor="private ">Private</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem
                        value={"true"}
                        id={"public"}
                        className="border-zinc-100 w-2 h-2"
                      />
                      <Label htmlFor="public">Public</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {videoUrl && !saving ? (
          <Button>Save</Button>
        ) : (
          <Button disabled>Save</Button>
        )}
      </form>
    </Form>
  );
};

export default VideoUploadForm;
