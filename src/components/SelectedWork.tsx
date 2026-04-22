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
          Selected Work
        </h2>
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {worksData.map((work, idx) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
            className="relative group overflow-hidden bg-bg-surface break-inside-avoid border border-transparent hover:border-white/20 transition-colors duration-300"
          >
            <Link href={`/artists/${work.artistSlug}`}>
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 gap-2">
                  <span className="text-secondary text-xs uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {work.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {work.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
