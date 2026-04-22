"use client";

import { motion } from "framer-motion";

export default function WhoWeAre() {
  const pills = ["Visual Identity", "Campaign Design", "Art Direction"];

  return (
    <section className="w-full py-20 md:py-[120px] px-6 md:px-12 max-w-7xl mx-auto border-t border-border mt-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3"
        >
          <span className="text-7xl md:text-[6rem] leading-none font-black text-muted tracking-tighter">01</span>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col gap-6 md:gap-8"
        >
          <h2 className="text-3xl md:text-[2.5rem] leading-tight font-bold text-primary tracking-tight">
            Crafting Identities That Move Culture
          </h2>
          <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
            We are a design studio specialized in the music industry. We create visual identities, album artwork, tour branding, social content, and campaigns for artists who define their era.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            {pills.map((pill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="px-6 py-2 rounded-full border border-white/20 text-sm font-semibold tracking-wide text-primary"
              >
                {pill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
