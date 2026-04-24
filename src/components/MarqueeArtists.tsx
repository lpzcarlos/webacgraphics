"use client";

import Image from "next/image";
import Link from "next/link";
import artistsData from "../data/artists.json";
import { useRef, useState, useEffect } from "react";

interface Artist {
  slug: string;
  name: string;
  image: string;
}

function ArtistRow({ artists, direction }: { artists: Artist[], direction: "left" | "right" }) {
  const duplicatedArtists = [...artists, ...artists];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const mouseDragThreshold = useRef(0);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const scrollEl = scrollContainerRef.current;

    const speed = 0.05;
    let lastTime = performance.now();
    let animationFrameId: number;
    let moveAccumulator = 0;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && !isDragging) {
        moveAccumulator += speed * delta;
        if (moveAccumulator >= 1) {
          const move = Math.floor(moveAccumulator);
          moveAccumulator -= move;
          
          if (direction === "left") {
             scrollEl.scrollLeft += move;
          } else {
             scrollEl.scrollLeft -= move;
          }
        }
      }

      const currentWidth = scrollEl.scrollWidth / 2;
      if (currentWidth > 0) {
        // We handle both bounds for both directions to allow smooth infinite loop even when dragged manually
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
  }, [isHovered, isDragging, direction]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX;
    mouseDragThreshold.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    mouseDragThreshold.current += Math.abs(x - startX.current);
    startX.current = x;
    scrollContainerRef.current.scrollLeft -= walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (mouseDragThreshold.current > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex w-full whitespace-nowrap items-center overflow-x-auto py-4 md:py-6 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
  );
}

export default function MarqueeArtists() {
  return (
    <section id="artists" className="w-full py-20 md:py-[100px] bg-background border-t border-b border-border overflow-hidden select-none">
      <h2 className="text-center text-3xl md:text-[3rem] font-black uppercase text-primary mb-10 md:mb-16 tracking-tight">
        Our Artists
      </h2>

      <div className="flex flex-col gap-2 md:gap-4">
        <ArtistRow artists={artistsData.row1} direction="right" />
        <ArtistRow artists={artistsData.row2} direction="left" />
      </div>
    </section>
  );
}

function ArtistItem({ artist }: { artist: Artist }) {
  return (
    <div className="relative flex-shrink-0 mx-4 md:mx-8 group cursor-pointer w-[120px] h-[120px] md:w-[160px] md:h-[160px] hover:[&>a>div]:scale-110">
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
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75 text-white font-semibold text-xs md:text-sm tracking-wider text-center px-2 pointer-events-none">
              {artist.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
