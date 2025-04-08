"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
let interval: any;

type Card = {
  _id?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  const startFlipping = useCallback(() => {
    if (intervalRef.current || !isHovering.current) return;

    intervalRef.current = setInterval(() => {
      setCards((prevCards) => {
        const updated = [...prevCards];
        updated.unshift(updated.pop()!);
        return updated;
      });
    }, 2000);
  }, []);

  const stopFlipping = useCallback(() => {
    isHovering.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    isHovering.current = true;
    startFlipping();
  };

  const handleMouseLeave = stopFlipping;

  return (
    <div
      className="relative  w-full aspect-video"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute w-full h-1/3 bottom-0 backdrop-blur-md opacity-50 bg-black z-[4] rounded-b-3xl flex items-center justify-center cursor-none">
        <IconPlayerPlayFilled className="w-10 h-10 cursor-pointer" />
      </div>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={index}
            className="absolute dark:bg-black bg-white w-full  aspect-video rounded-3xl p-4 shadow-xl border-t-4 border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <Image
              src={
                card.thumbnail ||
                `https://res.cloudinary.com/dpoggb7ri/image/upload/v1743831719/phlv13sgo58ga51qbnxm.jpg`
              }
              alt="videos"
              fill={true}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
