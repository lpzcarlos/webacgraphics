import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MoveLeft } from "lucide-react";
import artistsData from "@/data/artists.json";
import worksData from "@/data/works.json";
import Footer from "@/components/Footer";

const allArtists = [...artistsData.row1, ...artistsData.row2];

// Generate static params if preferred for SSG
export function generateStaticParams() {
  return allArtists.map((artist) => ({
    slug: artist.slug,
  }));
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = allArtists.find((a) => a.slug === params.slug);

  if (!artist) {
    notFound();
  }

  const artistWorks = worksData.filter((w) => w.artistSlug === artist.slug);

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <MoveLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold uppercase tracking-widest text-sm">Back Home</span>
        </Link>
      </header>

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-end justify-center pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-white leading-none">
            {artist.name}
          </h1>
          <p className="mt-4 text-secondary uppercase tracking-[0.2em] font-semibold text-sm">
            Featured Artist Portfolio
          </p>
        </div>
      </section>

      {/* Works Grid */}
      <section className="w-full max-w-[1400px] mx-auto py-20 px-6 md:px-12 flex-grow">
        {artistWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistWorks.map((work) => (
              <div key={work.id} className="relative group overflow-hidden bg-bg-surface border border-transparent hover:border-white/20 transition-colors duration-300">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 gap-2 border border-white/10 m-4">
                    <span className="text-secondary text-xs uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {work.category}
                    </span>
                    <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {work.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
             <p className="text-muted tracking-widest uppercase">Coming Soon</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
