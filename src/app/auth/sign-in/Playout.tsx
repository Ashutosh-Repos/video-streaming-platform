import React, { Children } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import { GlowingEffect } from "@/components/ui/glowing-effect";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center  border-2 relative">
        <BackgroundBeamsWithCollision className="bg-black">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1}
            className="w-full h-full absolute"
            particleColor="#FFFFFF"
          />
          <div className="w-max rounded-2xl h-max px-8 py-6 z-[2] bg-transparent backdrop-blur-[1.2px] relative text-white">
            {children}
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
          </div>
        </BackgroundBeamsWithCollision>
      </div>
    </>
  );
};

export default layout;
