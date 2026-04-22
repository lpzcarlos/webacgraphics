"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.project) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", project: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="w-full bg-bg-surface py-20 md:py-[120px] px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-primary leading-tight tracking-tight mb-6">
              Let&apos;s Build Something Iconic
            </h2>
            <p className="text-secondary text-lg">
              Tell us about your project. We&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="flex gap-4 mt-12">
            {["Instagram", "Behance", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="px-6 py-2 rounded-full border border-border text-sm text-secondary hover:text-white hover:border-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side / Form */}
        <div className="lg:w-1/2 bg-black/20 p-8 rounded-3xl border border-border">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
              <p className="text-secondary">We will be in touch shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm uppercase tracking-widest text-muted hover:text-white underline underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col relative group">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-lg py-3 outline-none placeholder:text-muted transition-colors focus:border-white"
                />
              </div>

              <div className="flex flex-col relative group">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-lg py-3 outline-none placeholder:text-muted transition-colors focus:border-white"
                />
              </div>

              <div className="flex flex-col relative group">
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white text-lg py-3 outline-none placeholder:text-muted transition-colors focus:border-white resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.project}
                className="group w-fit mt-4 flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
