"use client";

import { startConfetti } from "@/utils/confetti";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Particles from "~/lib/components/magicui/particles";

export default function Home(props: { params: { locale: string } }) {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<span>用艺术家的视角审视</span>", "以工匠精神创造开发"],
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <div className={"flex justify-center items-center mr-auto text-6xl h-screen"}>
        <h2 ref={el} className="text-6xl"></h2>
      </div>

      <Particles
        className={"fixed inset-0 [z-index:var(--vp-z-index-bg)]"}
        quantity={100}
        ease={80}
        color={"#000000"}
        refresh
      ></Particles>
    </div>
  );
}
