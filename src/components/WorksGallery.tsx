"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export type GalleryItemType = string | { src: string; link: string };

type Props = {
  images: GalleryItemType[];
};

export default function WorksGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center text-white/20 py-16 tracking-[0.3em] text-xs uppercase">
        Coming soon
      </p>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {images.map((item, idx) => {
        const isObject = typeof item !== "string";
        const src = isObject ? item.src : item;
        const link = isObject ? item.link : null;

        const content = (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
            className="relative group overflow-hidden bg-bg-surface border border-transparent hover:border-white/20 transition-colors duration-300 w-full"
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
            
            {/* Play icon for links */}
            {link && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        );

        return (
          <div key={src}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                {content}
              </a>
            ) : (
              <div onClick={() => setLightboxIndex(idx)} className="cursor-pointer">
                {content}
              </div>
            )}
          </div>
        );
      })}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images.map(item => ({ src: typeof item === "string" ? item : item.src }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
