"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function WorksGallery({ images }: Props) {
  if (images.length === 0) {
    return (
      <p className="text-center text-white/20 py-16 tracking-[0.3em] text-xs uppercase">
        Coming soon
      </p>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {images.map((src, idx) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
          className="relative group overflow-hidden bg-bg-surface border border-transparent hover:border-white/20 transition-colors duration-300"
        >
          <Image
            src={src}
            alt=""
            width={0}
            height={0}
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
