"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import clientsData from "../data/clients.json";

export default function MarqueeClients() {
  const duplicatedClients = [...clientsData, ...clientsData];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Dragging states
  const startX = useRef(0);
  const mouseDragThreshold = useRef(0);

  const xPos = useRef(0);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const scrollEl = scrollContainerRef.current;
    const inner = scrollEl.firstElementChild as HTMLElement;
    if (!inner) return;

    // Speed in pixels per millisecond
    const speed = 0.05;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Auto-scroll logic: move towards the right
      if (!isHovered && !isDragging) {
        xPos.current += speed * delta;
      }

      // Infinite wrapping logic
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
  }, [isHovered, isDragging]);

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
    <section id="clients" className="w-full py-20 overflow-hidden bg-background select-none">
      <h3 className="text-center text-sm font-semibold tracking-widest text-muted uppercase mb-12">
        Trusted By
      </h3>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
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
            {duplicatedClients.map((client, idx) => (
              <ClientLogo key={`c-${idx}`} client={client} />
            ))}
            {duplicatedClients.map((client, idx) => (
              <ClientLogo key={`d-${idx}`} client={client} />
            ))}
          </div>
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
      <div className="relative h-full w-[150px] flex items-center justify-center transition-transform duration-300 ease-out" style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        <Image
          src={client.logo_white}
          alt={`${client.name} logo`}
          fill
          sizes="150px"
          className={`object-contain transition-opacity duration-300 mix-blend-screen pointer-events-none ${hovered ? "opacity-0" : "opacity-50"}`}
        />
        <Image
          src={client.logo_color}
          alt={`${client.name} logo color`}
          fill
          sizes="150px"
          className={`object-contain transition-opacity duration-300 pointer-events-none ${hovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
