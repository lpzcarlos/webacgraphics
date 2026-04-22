import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import SelectedWork from "@/components/SelectedWork";
import MarqueeArtists from "@/components/MarqueeArtists";
import MarqueeClients from "@/components/MarqueeClients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between w-full">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <SelectedWork />
      <MarqueeArtists />
      <MarqueeClients />
      <Contact />
      <Footer />
    </main>
  );
}
