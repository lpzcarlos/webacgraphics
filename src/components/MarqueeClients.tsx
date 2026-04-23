"use client";

import { useState } from "react";
import Image from "next/image";
import clientsData from "../data/clients.json";

export default function MarqueeClients() {
  // We duplicate the clients array to ensure a seamless infinite scroll
  const duplicatedClients = [...clientsData, ...clientsData];

  return (
    <section id="clients" className="w-full py-20 overflow-hidden bg-background">
      <h3 className="text-center text-sm font-semibold tracking-widest text-muted uppercase mb-12">
        Trusted By
      </h3>

      <div className="relative w-full flex overflow-hidden">
        {/*
          We create two identical blocks animated to the left. 
          Use animate-scroll-right or scroll-left. 
          Prompt says "RIGHT TO LEFT", so standard leftward translation.
        */}
        <div className="flex animate-scroll-left w-max whitespace-nowrap items-center hover:[animation-play-state:paused]">
          {duplicatedClients.map((client, idx) => (
            <ClientLogo key={idx} client={client} />
          ))}
          {/* Third copy just to be ultra safe for wide screens */}
          {duplicatedClients.map((client, idx) => (
            <ClientLogo key={`extra-${idx}`} client={client} />
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
      className="relative flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center h-[50px] md:h-[70px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full flex items-center justify-center transition-transform duration-300 ease-out" style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        {/* Usamos img natural para que respete auto-width perfectamente independiente del aspecto de cada logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo_white}
          alt={`${client.name} logo`}
          className={`h-full w-auto object-contain transition-opacity duration-300 mix-blend-screen ${hovered ? "opacity-0 absolute" : "opacity-50 relative"}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo_color}
          alt={`${client.name} logo color`}
          className={`h-full w-auto object-contain transition-opacity duration-300 ${hovered ? "opacity-100 relative" : "opacity-0 absolute"}`}
        />
      </div>
    </div>
  );
}
