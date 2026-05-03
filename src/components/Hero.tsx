"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const headlineWords1 = ["WE", "DESIGN"];
  const headlineWords2 = ["THE", "SOUND"];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[100dvh] pt-48 pb-24 flex flex-col items-center justify-center bg-background">
      {/* Background Textures */}
      <div className="noise-bg"></div>
      <div className="scanline"></div>

      {/* Content */}
      <div className="z-20 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-muted tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-semibold"
        >
          Creative Agency · Music Industry · Since 2014
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-1 md:gap-4 select-none w-full"
        >
          <div className="flex gap-3 md:gap-8">
            {headlineWords1.map((word, i) => (
              <div key={i} className="overflow-hidden py-1">
                <motion.span
                  variants={item}
                  className="text-[clamp(3.5rem,12vw,12rem)] font-black leading-none tracking-tighter block pr-2"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 md:gap-8">
            {headlineWords2.map((word, i) => (
              <div key={i} className="overflow-hidden py-1">
                <motion.span
                  variants={item}
                  className="text-[clamp(3.5rem,12vw,12rem)] font-black leading-none tracking-tighter block pr-2"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-secondary text-base md:text-[1.1rem] mt-8 max-w-lg mx-auto"
        >
          Visual identity, campaigns & art direction for artists that lead.
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 px-8 py-4 rounded-full border border-white text-white font-semibold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-300 relative group overflow-hidden"
        >
          See Our Work
          <span className="absolute inset-0 w-full h-full bg-white/20 blur-md group-hover:scale-150 transition-transform duration-500 rounded-full mix-blend-screen opacity-0 group-hover:opacity-100"></span>
        </motion.a>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 z-20 flex flex-col items-center animate-bounce"
      >
        <ChevronDown className="text-secondary opacity-50" size={32} />
      </motion.div>
    </section>
  );
}
