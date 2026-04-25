"use client";

import { useRef, useState, useEffect } from "react";
import clientsData from "../data/clients.json";

export default function MarqueeClients() {
  const duplicatedClients = [...clientsData, ...clientsData];
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

    let moveAccumulator = 0;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Auto-scroll logic: only when not hovered and not dragging
      if (!isHovered && !isDragging) {
        moveAccumulator += speed * delta;
        if (moveAccumulator >= 1) {
          const move = Math.floor(moveAccumulator);
          moveAccumulator -= move;
          // To move RIGHT TO LEFT, we INCREASE scrollLeft
          scrollEl.scrollLeft += move;
        }
      }

      // Infinite wrapping logic
      const currentWidth = scrollEl.scrollWidth / 2;
      if (currentWidth > 0) {
        if (scrollEl.scrollLeft >= currentWidth) {
          scrollEl.scrollLeft -= currentWidth;
        } else if (scrollEl.scrollLeft <= 0) {
          scrollEl.scrollLeft += currentWidth;
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
    <section id="clients" className="w-full py-20 overflow-hidden bg-background select-none">
      <h3 className="text-center text-sm font-semibold tracking-widest text-muted uppercase mb-12">
        Trusted By
      </h3>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex w-full whitespace-nowrap items-center overflow-x-auto py-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
          {duplicatedClients.map((client, idx) => (
            <ClientLogo key={`c-${idx}`} client={client} />
          ))}
          {duplicatedClients.map((client, idx) => (
            <ClientLogo key={`d-${idx}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Client {
  name: string;
  logo_white: string;
  logo_color: string;
}

function ClientLogo({ client }: { client: Client }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center h-[50px] md:h-[70px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full flex items-center justify-center transition-transform duration-300 ease-out" style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo_white}
          alt={`${client.name} logo`}
          draggable={false}
          className={`h-full w-auto object-contain transition-opacity duration-300 mix-blend-screen pointer-events-none ${hovered ? "opacity-0 absolute" : "opacity-50 relative"}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo_color}
          alt={`${client.name} logo color`}
          draggable={false}
          className={`h-full w-auto object-contain transition-opacity duration-300 pointer-events-none ${hovered ? "opacity-100 relative" : "opacity-0 absolute"}`}
        />
      </div>
    </div>
  );
}
