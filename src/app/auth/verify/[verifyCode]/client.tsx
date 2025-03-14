"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface verifyComp {
  code: string;
}

const VerifyComp = ({ code }: verifyComp) => {
  const router = useRouter();
  const [verified, setIsVerified] = useState<boolean>(false);
  const [rejected, setIsRejected] = useState<boolean>(false);
  const verification = async (code: string): Promise<void> => {
    try {
      setIsVerified(false);
      toast.success(`client:${code}`); //why here toast show code is undefined
      const response = await fetch(
        `http://localhost:3000/api/verify/?verifyCode=${code}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      console.log(result);
      if (!result) {
        toast("response ok");
        setIsRejected(true);
        toast.error(`no response from server`);
        return;
      }
      console.log(result);
      const id = result.data.id;
      if (!id) {
        setIsRejected(true);
        toast.error(`unable get user, Please refresh`);
        return;
      }
      setIsVerified(true);
      toast.success(`id: ${id}`);
      router.replace(`/auth/create-username/${id}`);
    } catch (error: any) {
      toast.error("Network error");
      setIsRejected(true);
    }
  };
  useEffect(() => {
    if (code) verification(code);
  }, [code]);
  return (
    <div>{rejected ? "rejected" : verified ? "verified" : "verifying"}</div>
  );
};

export default VerifyComp;
