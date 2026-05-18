"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[101]"
          onClick={onClose}
        >
          <X size={32} />
        </button>

        <button
          className="absolute left-6 text-white/50 hover:text-white transition-colors z-[101] p-4 hidden md:block"
          onClick={handlePrev}
        >
          <ChevronLeft size={48} />
        </button>

        <div className="relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[80vh]">
                <Image
                  src={images[index].src}
                  alt={images[index].alt || "Gallery image"}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
              {(images[index].title || images[index].category) && (
                <div className="mt-6 text-center">
                  {images[index].category && (
                    <p className="text-secondary text-xs uppercase tracking-[0.2em] mb-2">
                      {images[index].category}
                    </p>
                  )}
                  {images[index].title && (
                    <h3 className="text-white text-xl font-bold tracking-wide">
                      {images[index].title}
                    </h3>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="absolute right-6 text-white/50 hover:text-white transition-colors z-[101] p-4 hidden md:block"
          onClick={handleNext}
        >
          <ChevronRight size={48} />
        </button>

        {/* Mobile controls */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-12 md:hidden z-[101]">
          <button className="text-white/70 hover:text-white p-2" onClick={handlePrev}>
            <ChevronLeft size={36} />
          </button>
          <button className="text-white/70 hover:text-white p-2" onClick={handleNext}>
            <ChevronRight size={36} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
