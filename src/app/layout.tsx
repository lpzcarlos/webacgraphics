import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mont = localFont({
  src: [
    {
      path: "../../public/fonts/Mont Font Family by FerNava.com/Mont-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mont Font Family by FerNava.com/Mont-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mont Font Family by FerNava.com/Mont-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mont Font Family by FerNava.com/Mont-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "AC GRAPHICS | Creative Agency · Music Industry",
  description: "Visual identity, campaigns & art direction for artists that lead.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${mont.variable} font-sans bg-[var(--bg)] text-[var(--text-primary)] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
