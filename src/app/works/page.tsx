import fs from "fs";
import path from "path";
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

// Section heading with decorative lines (server-safe, no framer-motion)
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center mb-16 overflow-hidden gap-4">
      <div className="h-[1px] bg-border flex-1 shrink-0 w-8" />
      <h2 className="text-2xl md:text-3xl font-black tracking-widest text-primary uppercase text-center">
        {title}
      </h2>
      <div className="h-[1px] bg-border flex-1 shrink-0 w-8" />
    </div>
  );
}

export const metadata = {
  title: "Works | AC GRAPHICS",
  description: "Full portfolio — single covers, album design, logos, tours, and more.",
};

export default function WorksPage() {
  const sections = [
    { folder: "singles", title: "Single Covers" },
    { folder: "album-design", title: "Digital / Physical Album Design" },
    { folder: "logos", title: "Logos" },
    { folder: "banners", title: "Banners & Assets" },
    { folder: "events", title: "Events Posters" },
    { folder: "tours", title: "Tour Design" },
    { folder: "lyric-videos", title: "Lyric Videos" },
    { folder: "ad-formats", title: "Ad Formats" },
    { folder: "rrss", title: "RRSS" },
    { folder: "more", title: "And More..." },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center w-full bg-[var(--bg)]">
      <Navbar />

      {/* Page Header */}
      <section className="w-full pt-40 pb-8 px-6 md:px-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase text-white mb-4">
          Works
        </h1>
        <div className="h-[2px] w-24 bg-white mx-auto" />
      </section>

      {/* Gallery Sections — each reads its own folder */}
      {sections.map(({ folder, title }) => {
        let images: GalleryItemType[] = getImagesFromFolder(folder);
        const ytLinks = getYoutubeLinksFromFolder(folder);
        images = [...images, ...ytLinks];

        return (
          <section key={folder} className="w-full py-20 px-6 md:px-12">
            <SectionHeading title={title} />
            <WorksGallery images={images} />
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
