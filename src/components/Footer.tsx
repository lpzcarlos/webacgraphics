import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative w-[100px] h-[24px]">
            <Image
              src="/media/logoac.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <Link href="#work" className="text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">Work</Link>
          <Link href="#artists" className="text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">Artists</Link>
          <Link href="#clients" className="text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">Clients</Link>
          <Link href="#contact" className="text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">Contact</Link>
          <Link href="https://www.instagram.com/acgraphicses" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">Instagram</Link>
        </div>

        {/* Copyright */}
        <div className="text-muted text-xs font-medium">
          &copy; {new Date().getFullYear()} AC GRAPHICS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
