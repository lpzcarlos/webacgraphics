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

  const xPos = useRef(0);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const scrollEl = scrollContainerRef.current;
    // We will translate the inner container instead of scrolling
    const inner = scrollEl.firstElementChild as HTMLElement;
    if (!inner) return;

    const speed = 0.05;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && !isDragging) {
        if (direction === "left") {
          xPos.current -= speed * delta;
        } else {
          xPos.current += speed * delta;
        }
      }

      // Half the width of the inner content because we duplicated it
      const currentWidth = inner.scrollWidth / 2;
      
      if (currentWidth > 0) {
        if (xPos.current <= -currentWidth) {
          xPos.current += currentWidth;
        } else if (xPos.current > 0) {
          xPos.current -= currentWidth;
        }
      }

      inner.style.transform = `translate3d(${xPos.current}px, 0, 0)`;

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
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    mouseDragThreshold.current += Math.abs(x - startX.current);
    startX.current = x;
    xPos.current += walk;
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
        className="w-full overflow-hidden py-4 md:py-6 cursor-grab active:cursor-grabbing"
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
        <div className="flex w-max items-center whitespace-nowrap" style={{ willChange: "transform" }}>
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={`a-${idx}`} artist={artist} />
          ))}
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={`b-${idx}`} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarqueeArtists() {
  return (
    <section id="artists" className="w-full py-20 md:py-[70px] bg-background overflow-hidden select-none">
      <div className="flex items-center justify-center mb-10 md:mb-16 px-6 md:px-12">
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
        <h2 className="px-6 text-2xl md:text-4xl font-black tracking-widest text-primary uppercase whitespace-nowrap">
          Our Artists
        </h2>
        <div className="h-[1px] bg-border w-1/4 md:w-1/3"></div>
      </div>

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
        <div className="relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ease-out border border-white/10 group-hover:border-white/50 bg-bg-surface">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(max-width: 768px) 120px, 160px"
            draggable={false}
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-3 md:pb-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <span className="text-white font-bold text-xs md:text-sm tracking-wide text-center px-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {artist.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
