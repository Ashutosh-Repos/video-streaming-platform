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
import { signIn } from "next-auth/react";
import { loginValidation } from "@/app/zod/zodFormSchemas/authFormValidation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
      redirect: false, // Prevent `signIn()` from handling the redirect
    });

    console.log(result);
    toast(`${JSON.stringify(result)}`);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-96 gap-4 flex flex-col h-max p-4 border-0 rounded-2xl relative"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="username or email"
                    {...field}
                    type={`text`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link href={`/auth/forgot`}>
              <p className="text-xs cursor-pointer text-zinc-400 pl-2.5">
                forgot password ?
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
    </>
  );
};

export default page;
