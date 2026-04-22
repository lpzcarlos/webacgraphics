"use client";

import Image from "next/image";
import Link from "next/link";
import artistsData from "../data/artists.json";

export default function MarqueeArtists() {
  const duplicatedArtists = [...artistsData, ...artistsData];

  return (
    <section id="artists" className="w-full py-20 md:py-[100px] bg-background border-t border-b border-border overflow-hidden">
      <h2 className="text-center text-3xl md:text-[3rem] font-black uppercase text-primary mb-10 md:mb-16 tracking-tight">
        Our Artists
      </h2>

      <div className="relative w-full flex overflow-hidden">
        {/* Left to Right marquee (starts at -50% and goes to 0) -> animate-scroll-right */}
        <div className="flex animate-scroll-right w-max whitespace-nowrap items-center hover:[animation-play-state:paused]">
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={idx} artist={artist} />
          ))}
          {duplicatedArtists.map((artist, idx) => (
            <ArtistItem key={`extra-${idx}`} artist={artist} />
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
    <div className="relative flex-shrink-0 mx-8 md:mx-12 group cursor-pointer w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
      <Link href={`/artists/${artist.slug}`}>
        <div className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-400 ease-out group-hover:scale-110">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover grayscale transition-all duration-400 group-hover:grayscale-0"
          />
        </div>
        {/* Label slides up */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 opacity-0 translate-y-4 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 z-10 whitespace-nowrap text-white text-xs font-semibold tracking-wider">
          {artist.name}
        </div>
      </Link>
    </div>
  );
}
