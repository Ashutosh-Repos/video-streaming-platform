"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Apple from "next-auth/providers/apple";
import {
  IconBrandGoogle,
  IconBrandGithub,
  IconBrandApple,
  IconBrandGoogleFilled,
  IconBrandGithubFilled,
  IconAppleFilled,
  IconBrandAppleFilled,
} from "@tabler/icons-react";

import { Separator } from "@/components/ui/separator";

import { registerValidation } from "@/app/zod/zodFormSchemas/authFormValidation";
import Link from "next/link";

const page = () => {
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "M",
      age: 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof registerValidation>) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Something went wrong";
        toast.error(errorMessage);
        return;
      }

      toast.success("Registration successful! Please check your email.");
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-96 gap-4 flex flex-col h-max p-4 border-0 rounded-2xl relative bg-transparent backdrop-blur-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <h1 className="w-full text-center text-xl font-bold">Register</h1>

        <div className="w-full h-8 flex items-center justify-evenly">
          <IconBrandGoogleFilled className="h-8" />
          <Separator orientation="vertical" />
          <IconBrandGithubFilled className="h-8" />
          <Separator orientation="vertical" />
          <IconBrandAppleFilled className="h-8" />
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          <span className="grow border-[1px]"></span>
          <span className="px-2">or</span>
          <span className="grow border-[1px]"></span>
        </div>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input placeholder="fullname" {...field} type={`text`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input placeholder="email" {...field} type={`email`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="age" {...field} type={`number`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="relative">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-accent text-zinc-400 cursor-pointer">
                      <SelectValue placeholder="Gender" {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input placeholder="password" {...field} type={`password`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  placeholder="confirm password"
                  {...field}
                  type={`password`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Link href={`/auth/login`}>
            <p className="text-xs cursor-pointer text-zinc-400 pl-2.5">
              Already registered
            </p>
          </Link>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default page;
