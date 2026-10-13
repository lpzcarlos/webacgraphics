import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MoveLeft } from "lucide-react";
import artistsData from "@/data/artists.json";
import worksData from "@/data/works.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtistGallery from "@/components/ArtistGallery";
import type { Metadata } from "next";

const allArtists = [...artistsData.row1, ...artistsData.row2];

export function generateStaticParams() {
  return allArtists.map((artist) => ({
    slug: artist.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artist = allArtists.find((a) => a.slug === params.slug);
  if (!artist) {
    return { title: "Artist | AC GRAPHICS" };
  }
  return {
    title: `${artist.name} | AC GRAPHICS`,
    description: `Visual identities, album artwork, and campaigns created for ${artist.name} by AC GRAPHICS.`,
  };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = allArtists.find((a) => a.slug === params.slug);

  if (!artist) {
    notFound();
  }

  const artistWorks = worksData.filter((w) => w.artistSlug === artist.slug);

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="pt-32 pb-2 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <Link
          href="/#artists"
          className="group inline-flex items-center gap-2 text-secondary hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold"
        >
          <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Artists</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="relative w-full h-[50vh] md:h-[65vh] flex items-end justify-center pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover opacity-35 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="text-secondary uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-3">
            Artist Portfolio
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-white leading-none">
            {artist.name}
          </h1>
        </div>
      </section>

      {/* Works Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 flex-grow">
        <ArtistGallery works={artistWorks} artistName={artist.name} />
      </section>

      <Footer />
    </main>
  );
}
