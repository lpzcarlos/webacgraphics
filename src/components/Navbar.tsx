"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-10 w-full flex justify-center z-50 pointer-events-none">
        <motion.nav
          className={`pointer-events-auto relative flex items-center justify-start md:justify-center px-8 py-4 rounded-full transition-all duration-300 w-[90%] md:w-fit border border-white/10
            ${scrolled ? "bg-black/75 backdrop-blur-xl" : "bg-transparent"}`}
        >
          {/* Desktop Links Left */}
          <div className="hidden md:flex w-[200px] justify-end items-center gap-6">
            <NavLink href="/#work">Work</NavLink>
            <NavLink href="/#artists">Artists</NavLink>
          </div>

          {/* Logo Center (Left on mobile) */}
          <div className="flex justify-center flex-shrink-0 md:mx-8">
            <Link href="/">
              <div className="relative w-[160px] h-[40px] md:w-[240px] md:h-[60px] flex items-center justify-center">
                <Image
                  src="/media/logoac.webp"
                  alt="AC Graphics Logo"
                  fill
                  className="object-contain object-left md:object-center"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Links Right */}
          <div className="hidden md:flex w-[200px] justify-start items-center gap-6">
            <NavLink href="/#clients">Clients</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white absolute right-6"
            aria-label="Abrir menú"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 pt-20"
          >
            <MobileNavLink href="/#work" onClick={() => setMobileMenuOpen(false)}>Work</MobileNavLink>
            <MobileNavLink href="/#artists" onClick={() => setMobileMenuOpen(false)}>Artists</MobileNavLink>
            <MobileNavLink href="/#clients" onClick={() => setMobileMenuOpen(false)}>Clients</MobileNavLink>
            <MobileNavLink href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
            <MobileNavLink href="/works" onClick={() => setMobileMenuOpen(false)}>All Works</MobileNavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-secondary hover:text-primary text-sm font-semibold tracking-wide transition-colors relative group uppercase">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="text-white text-3xl font-black uppercase tracking-widest font-sans">
      {children}
    </Link>
  );
}
