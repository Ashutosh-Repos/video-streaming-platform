"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "@/auth";
import { loginValidation } from "@/app/zod/zodFormSchemas/loginFormValidation";
import { useRouter } from "next/navigation";
const formSchema = loginValidation;
const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    console.log(formValues);
    const result = await signIn("credentials", {
      identifier: formValues.identifier,
      password: formValues.password,
      redirect: true,
      callbackUrl: "/dashboard", // Redirect after successful login
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-0">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username or email"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="w-full h-max flex items-center justify-end relative">
            <button
              className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block border-blue-700 bottom-2"
              type="submit"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full ">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span className="w-16 h-8 flex items-center justify-center text-base font-normal">
                  Sign up
                </span>
              </div>
              <span className="absolute bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] transition-opacity duration-500 group-hover:opacity-10" />
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default page;
