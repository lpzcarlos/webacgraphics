"use client";

import Image from "next/image";
import Link from "next/link";
import artistsData from "../data/artists.json";
import { useRef, useState, useEffect } from "react";

export default function MarqueeArtists() {
  const duplicatedArtists = [...artistsData, ...artistsData];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Dragging states
  const startX = useRef(0);
  const mouseDragThreshold = useRef(0);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const scrollEl = scrollContainerRef.current;

    // Speed in pixels per millisecond
    const speed = 0.05;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Auto-scroll logic: only when not hovered and not dragging
      if (!isHovered && !isDragging) {
        // Decrease scrollLeft to shift elements to the right
        scrollEl.scrollLeft -= speed * delta;
      }

      // Infinite wrapping logic
      // Because we duplicated elements to create 2 halves, we wrap securely around the halves.
      const currentWidth = scrollEl.scrollWidth / 2;
      if (currentWidth > 0) {
        if (scrollEl.scrollLeft <= 0) {
          scrollEl.scrollLeft += currentWidth;
        } else if (scrollEl.scrollLeft >= currentWidth) {
          scrollEl.scrollLeft -= currentWidth;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX;
    mouseDragThreshold.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    mouseDragThreshold.current += Math.abs(x - startX.current);
    startX.current = x;
    scrollContainerRef.current.scrollLeft -= walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // If the user was dragging, prevent the click on the Link
    if (mouseDragThreshold.current > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section id="artists" className="w-full py-20 md:py-[100px] bg-background border-t border-b border-border overflow-hidden select-none">
      <h2 className="text-center text-3xl md:text-[3rem] font-black uppercase text-primary mb-10 md:mb-16 tracking-tight">
        Our Artists
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex w-full whitespace-nowrap items-center overflow-x-auto py-8 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            onMouseUpOrLeave();
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onClickCapture={onClickCapture}
        >
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={`a-${idx}`} artist={artist} />
          ))}
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={`b-${idx}`} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Artist {
  slug: string;
  name: string;
  image: string;
}

function ArtistItem({ artist }: { artist: Artist }) {
  return (
    <div className="relative flex-shrink-0 mx-8 md:mx-12 group cursor-pointer w-[140px] h-[140px] md:w-[180px] md:h-[180px] hover:[&>a>div]:scale-110">
      <Link href={`/artists/${artist.slug}`} className="block w-full h-full">
        <div className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-400 ease-out">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            draggable={false}
            className="object-cover transition-all duration-400 pointer-events-none"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-400 z-10 pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75 text-white font-semibold text-sm md:text-base tracking-wider text-center px-2 pointer-events-none">
              {artist.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
