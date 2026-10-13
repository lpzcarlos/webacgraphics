"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import worksData from "../data/works.json";
import Lightbox from "./Lightbox";

export default function SelectedWork() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredWorks = worksData.filter((work) => work.featured).slice(0, 8);

  const lightboxImages = featuredWorks.map((work) => ({
    src: work.image,
    title: work.title,
    category: work.category,
  }));

  return (
    <section id="work" className="w-full py-20 md:py-[120px] px-6 md:px-12">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-16 overflow-hidden">
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
        <h2 className="px-6 text-2xl md:text-4xl font-black tracking-widest text-primary uppercase whitespace-nowrap">
          Selected Work
        </h2>
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {featuredWorks.map((work, idx) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
            className="relative group overflow-hidden bg-bg-surface border border-white/5 hover:border-white/20 transition-all duration-300 rounded-xl aspect-square cursor-pointer"
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 gap-2 backdrop-blur-[2px]">
              <span className="text-secondary text-xs uppercase tracking-[0.2em] translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                {work.category}
              </span>
              <h3 className="text-white text-base md:text-lg font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75 max-w-[90%]">
                {work.title}
              </h3>
              <div className="mt-2 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View full portfolio button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-14"
      >
        <Link
          href="/works"
          className="px-8 py-4 rounded-full border border-white text-white font-semibold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 relative group overflow-hidden"
        >
          View All Works
          <span className="absolute inset-0 w-full h-full bg-white/20 blur-md group-hover:scale-150 transition-transform duration-500 rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 pointer-events-none" />
        </Link>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
