"use client";

import { Josefin_Sans } from "next/font/google";

const mastheadFont = Josefin_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

type Props = {
  title: string;
};

export default function HeroTitle({ title }: Props) {
  const cleanTitle = (title || "ANMOL MADAN").trim().replace(/\s+/g, " ");

  return (
    <h1
      className={`
        ${mastheadFont.className}
        text-left
        text-[clamp(2.75rem,5.2vw,5.5rem)]
        font-bold
        uppercase
        leading-[0.92]
        tracking-[-0.04em]
        text-neutral-950 dark:text-white
        select-none
      `}
    >
      {cleanTitle}
    </h1>
  );
}
