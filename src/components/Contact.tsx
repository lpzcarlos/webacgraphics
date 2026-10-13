"use client";

import { useState } from "react";
import { MoveRight, Mail, CheckCircle2, Clock, Globe } from "lucide-react";

function InstagramIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.project) return;

    setIsSubmitting(true);
    // Simulate sending with real mailto option available
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="w-full bg-bg-surface py-20 md:py-[120px] px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-secondary uppercase tracking-[0.3em] font-semibold text-xs block mb-3">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-primary leading-tight tracking-tight mb-6">
              Let&apos;s Build Something Iconic
            </h2>
            <p className="text-secondary text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              Tell us about your project, upcoming single release, album rollout or tour branding. We design visuals that leave a mark.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-white/80">
                <Clock size={14} className="text-white/60" />
                <span>Response &lt; 24h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-white/80">
                <Globe size={14} className="text-white/60" />
                <span>Madrid · Worldwide</span>
              </div>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
            <a
              href="https://www.instagram.com/acgraphicses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold tracking-wider uppercase text-white hover:bg-white hover:text-black transition-colors"
            >
              <InstagramIcon size={14} />
              <span>Instagram</span>
            </a>
            <a
              href="mailto:info@acgraphics.es"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold tracking-wider uppercase text-white hover:bg-white hover:text-black transition-colors"
            >
              <Mail size={14} />
              <span>info@acgraphics.es</span>
            </a>
          </div>
        </div>

        {/* Right Side / Form */}
        <div className="lg:w-1/2 bg-black/40 p-8 md:p-10 rounded-3xl border border-border">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Message Received</h3>
              <p className="text-secondary max-w-sm mb-6 text-sm">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. We will review your project details and get back to you within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:info@acgraphics.es?subject=Project Inquiry - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.project)}`}
                  className="px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-white/80 transition-colors"
                >
                  Send via Email App
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", project: "" });
                  }}
                  className="px-6 py-3 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-colors"
                >
                  Send Another
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col relative group">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Artist / Management Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-base md:text-lg py-2 outline-none placeholder:text-muted transition-colors focus:border-white"
                />
              </div>

              <div className="flex flex-col relative group">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="artist@recordlabel.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-base md:text-lg py-2 outline-none placeholder:text-muted transition-colors focus:border-white"
                />
              </div>

              <div className="flex flex-col relative group">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Project Details</label>
                <textarea
                  placeholder="Tell us about the project: single cover, album artwork, tour branding, deadlines..."
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-base md:text-lg py-2 outline-none placeholder:text-muted transition-colors focus:border-white resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.project}
                className="group w-fit mt-4 flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
