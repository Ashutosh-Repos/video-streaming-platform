import React from "react";
import UsernameForm from "./client";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <UsernameForm id={id} />;
};

export default page;
