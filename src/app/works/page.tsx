import fs from "fs";
import path from "path";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorksGallery, { GalleryItemType } from "@/components/WorksGallery";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/** Reads all image files from a subfolder inside public/media/works/ */
function getImagesFromFolder(folderName: string): string[] {
  const absPath = path.join(process.cwd(), "public", "media", "works", folderName);
  if (!fs.existsSync(absPath)) return [];

  return fs
    .readdirSync(absPath)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/media/works/${folderName}/${file}`);
}

/** Reads links.json from a subfolder and converts YouTube URLs to thumbnails */
function getYoutubeLinksFromFolder(folderName: string): { src: string; link: string }[] {
  const absPath = path.join(process.cwd(), "public", "media", "works", folderName, "links.json");
  if (!fs.existsSync(absPath)) return [];
  
  try {
    const fileContents = fs.readFileSync(absPath, 'utf-8');
    const links: string[] = JSON.parse(fileContents);
    
    return links.map(link => {
      let videoId = "";
      const match = link.match(/[?&]v=([^&]+)/) || link.match(/youtu\.be\/([^?]+)/);
      if (match) videoId = match[1];
      
      return {
        src: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
        link
      };
    }).filter(item => item.src !== "");
  } catch (error) {
    console.error(`Error reading links.json for ${folderName}:`, error);
    return [];
  }
}

function SectionHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-center mb-12 md:mb-16 overflow-hidden gap-4 max-w-7xl mx-auto">
      <div className="h-[1px] bg-border flex-1 shrink-0" />
      <div className="text-center px-4">
        <h2 className="text-xl md:text-3xl font-black tracking-widest text-primary uppercase">
          {title}
        </h2>
        <span className="text-[11px] font-semibold tracking-[0.2em] text-secondary uppercase block mt-1">
          {count} {count === 1 ? "Project" : "Projects"}
        </span>
      </div>
      <div className="h-[1px] bg-border flex-1 shrink-0" />
    </div>
  );
}

export const metadata = {
  title: "Works | AC GRAPHICS",
  description: "Complete design portfolio — single covers, album artwork, logos, event posters, tour branding, and lyric videos for leading music artists.",
};

export default function WorksPage() {
  const sections = [
    { folder: "singles", title: "Single Covers", aspect: "square" as const },
    { folder: "album-design", title: "Digital & Physical Album Design", aspect: "square" as const },
    { folder: "logos", title: "Visual Identity & Logos", aspect: "logo" as const },
    { folder: "banners", title: "Campaign Banners & Stories", aspect: "portrait-tall" as const },
    { folder: "events", title: "Event Posters", aspect: "portrait" as const },
    { folder: "tours", title: "Tour Design & Key Visuals", aspect: "portrait" as const },
    { folder: "lyric-videos", title: "Lyric Videos", aspect: "video" as const },
    { folder: "ad-formats", title: "Ad Formats", aspect: "video" as const },
    { folder: "rrss", title: "Social Media Assets", aspect: "portrait" as const },
    { folder: "more", title: "Special Projects", aspect: "square" as const },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center w-full bg-[var(--bg)]">
      <Navbar />

      {/* Page Header */}
      <section className="w-full pt-44 pb-12 px-6 md:px-12 text-center">
        <p className="text-muted tracking-[0.4em] uppercase text-xs md:text-sm mb-4 font-semibold">
          Agency Portfolio Catalog
        </p>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-6">
          Works
        </h1>
        <p className="text-secondary max-w-xl mx-auto text-sm md:text-base mb-8">
          Art direction, visual identities, single artwork, and campaigns created for music industry leaders.
        </p>
        <div className="h-[1px] w-24 bg-white/30 mx-auto" />
      </section>

      {/* Gallery Sections */}
      {sections.map(({ folder, title, aspect }) => {
        let images: GalleryItemType[] = getImagesFromFolder(folder);
        const ytLinks = getYoutubeLinksFromFolder(folder);
        images = [...images, ...ytLinks];

        // Skip folders that have no content yet
        if (images.length === 0) return null;

        return (
          <section key={folder} id={folder} className="w-full py-12 md:py-16 px-6 md:px-12">
            <SectionHeading title={title} count={images.length} />
            <WorksGallery images={images} categoryName={title} aspect={aspect} />
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="w-full py-20 px-6 text-center border-t border-border mt-12 bg-bg-surface">
        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
          Have an upcoming release or tour?
        </h3>
        <p className="text-secondary max-w-md mx-auto text-sm mb-8">
          Let&apos;s collaborate on your next single artwork, tour identity or complete campaign rollout.
        </p>
        <Link
          href="/#contact"
          className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all inline-block"
        >
          Start a Project
        </Link>
      </section>

      <Footer />
    </main>
  );
}
