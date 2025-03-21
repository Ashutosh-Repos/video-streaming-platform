import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full h-full text-center text-xl font-bold gap-4">
      Analytics Page, Development is in Progress !
      <Link href={`upload`}>
        <span className="border-white w-32 h-12 bg-amber-100 text-black flex items-center justify-center rounded-lg cursor-pointer">
          Click
        </span>
      </Link>
    </div>
  );
};

export default page;
