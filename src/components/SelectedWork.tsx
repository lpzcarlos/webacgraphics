"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import worksData from "../data/works.json";

export default function SelectedWork() {
  return (
    <section id="work" className="w-full py-20 md:py-[120px] px-6 md:px-12">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-16 overflow-hidden">
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
        <h2 className="px-6 text-2xl md:text-4xl font-black tracking-widest text-primary uppercase whitespace-nowrap">
          Works
        </h2>
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {worksData.map((work, idx) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
            className="relative group overflow-hidden bg-bg-surface border border-transparent hover:border-white/20 transition-colors duration-300"
          >
            <Link href={`/artists/${work.artistSlug}`}>
              <Image
                src={work.image}
                alt={work.title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 gap-1 pointer-events-none">
                <span className="text-secondary text-xs uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {work.category}
                </span>
                <h3 className="text-white text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {work.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Ver más button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-14"
      >
        <Link
          href="/works"
          className="mt-2 px-8 py-4 rounded-full border border-white text-white font-semibold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-300 relative group overflow-hidden"
        >
          See what we do
          <span className="absolute inset-0 w-full h-full bg-white/20 blur-md group-hover:scale-150 transition-transform duration-500 rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 pointer-events-none" />
        </Link>
      </motion.div>
    </section>
  );
}
