"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export type GalleryItemType = string | { src: string; link: string; title?: string };

type AspectRatio = "square" | "portrait" | "portrait-tall" | "video" | "logo";

type Props = {
  images: GalleryItemType[];
  categoryName?: string;
  aspect?: AspectRatio;
};

const TITLE_MAP: Record<string, string> = {
  elpantalon: "Omar Montes & Lola Índigo — El Pantalón",
  goterascover: "Omar Montes — Goteras",
  lasevillana: "Omar Montes — La Sevillana",
  ohbaby: "Omar Montes — Oh Baby",
  prendioremix: "Prendiô Remix",
  yotulokocover: "Yo Tu Loko",
  chanel: "Chanel — Single Artwork",
  ibiza: "Ibiza — Single Cover",
  AM: "AM — Physical & Digital Album",
  Depol: "Depol — Physical & Digital Album",
  MP: "MP — Album Artwork",
  "1anuell": "Anuel AA — Campaign Banner",
  "2chrisjedai": "Chris Jedai — Campaign Banner",
  "3karolg": "Karol G — Campaign Banner",
  "4lunayy": "Lunay — Campaign Banner",
  "4soltera": "Soltera — Campaign Asset",
  "5ozuna": "Ozuna — Campaign Banner",
  "6lunay+beele": "Lunay ft. Beéle — Single Banner",
  "7adexe": "Adexe Y Nau — Campaign Banner",
  "8omar+rels": "Omar Montes & Rels B — Banner",
  "9cesar": "Cesar AC — Campaign Banner",
  "1OvyFitz": "Ovy On The Drums — Live Event Poster",
  "2LolaIndigo_Fuengirola_Feed": "Lola Índigo — Fuengirola Live Event",
  "3AYN": "Adexe Y Nau — Official Event Poster",
  alexroyce: "Alex Royce Logo",
  anamena: "Ana Mena Logo & Identity",
  cabaret: "Cabaret Festival Logo",
  cadiz: "Cádiz Logo",
  camin: "Camin Logo",
  hilario: "Hilario Logo",
  hp: "HP Logo",
  "omar montes": "Omar Montes Logo",
  plataforma: "Plataforma Logo",
  reggaetoneu: "Reggaeton EU Logo",
  talent: "Talent Logo",
  weloveasere: "We Love Asere Logo",
  EternoTour2_V2_Feed: "Omar Montes — Eterno Tour",
  JAbdiel_Feed_FECHAS: "J Abdiel — Tour Dates",
  JhayCo_EuropeTour_Feed: "Jhayco — Europe Tour",
  MykeTowers2025: "Myke Towers — Europe Tour 2025",
  Pressure9x19_EuroTour_FECHAS_Feed: "Pressure 9X19 — Euro Tour",
  Torrres_EuroTour_FeedV2: "Torres — Euro Tour",
};

function formatItemTitle(src: string): string {
  const filename = src.split("/").pop() || "";
  const base = filename.replace(/\.[^/.]+$/, "");
  if (TITLE_MAP[base]) return TITLE_MAP[base];

  return base
    .replace(/^\d+/, "")
    .replace(/[+_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function WorksGallery({ images, categoryName, aspect = "square" }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center text-white/30 py-12 tracking-[0.3em] text-xs uppercase">
        Coming soon
      </p>
    );
  }

  const getAspectClass = () => {
    switch (aspect) {
      case "portrait":
        return "aspect-[4/5]";
      case "portrait-tall":
        return "aspect-[9/16]";
      case "video":
        return "aspect-[16/9]";
      case "logo":
      case "square":
      default:
        return "aspect-square";
    }
  };

  const isLogo = aspect === "logo";

  const lightboxImages = images.map((item) => {
    const isObject = typeof item !== "string";
    const src = isObject ? item.src : item;
    const title = (isObject && item.title) || formatItemTitle(src);
    return {
      src,
      title,
      category: categoryName,
    };
  });

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {images.map((item, idx) => {
        const isObject = typeof item !== "string";
        const src = isObject ? item.src : item;
        const link = isObject ? item.link : null;
        const title = (isObject && item.title) || formatItemTitle(src);

        const content = (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.06 }}
            className={`relative group overflow-hidden bg-bg-surface border border-white/5 hover:border-white/25 transition-all duration-300 rounded-xl w-full ${getAspectClass()}`}
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                isLogo ? "object-contain p-8 mix-blend-screen" : "object-cover"
              }`}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 gap-2 backdrop-blur-[2px]">
              {categoryName && (
                <span className="text-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {categoryName}
                </span>
              )}
              <h3 className="text-white text-xs md:text-sm font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 max-w-[90%]">
                {title}
              </h3>

              {link ? (
                <div className="mt-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform hover:scale-110">
                  <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <div className="mt-2 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        );

        return (
          <div key={`${src}-${idx}`}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
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
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
