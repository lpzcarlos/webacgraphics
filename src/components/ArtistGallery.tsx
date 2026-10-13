"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "./Lightbox";

interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
}

export default function ArtistGallery({ works, artistName }: { works: Work[]; artistName: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = works.map((w) => ({
    src: w.image,
    title: w.title,
    category: w.category,
  }));

  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 text-white/40">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">
          More Releases Coming Soon
        </h3>
        <p className="text-secondary text-sm mb-8 leading-relaxed">
          Artwork and campaigns for {artistName} are currently being curated and will be published shortly.
        </p>
        <Link
          href="/works"
          className="px-8 py-3.5 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
        >
          Explore All Works
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div
            key={work.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative overflow-hidden bg-bg-surface border border-white/5 hover:border-white/25 transition-all duration-300 rounded-2xl cursor-pointer"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 gap-2 backdrop-blur-[2px]">
                <span className="text-secondary text-xs uppercase tracking-[0.2em] translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  {work.category}
                </span>
                <h3 className="text-white text-xl font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75 max-w-[90%]">
                  {work.title}
                </h3>
                <div className="mt-3 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
