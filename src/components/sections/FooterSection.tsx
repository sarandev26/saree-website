"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { WavyDivider } from "../ui/WavyDivider";

export const FooterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      data-nav-theme="dark"
      className="relative z-[1] w-full bg-ink text-ivory pt-24 pb-12 select-none overflow-hidden"
    >
      {/* Wavy Top Edge Matching Ink from Ivory */}
      <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#062C30" variant={1} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 relative z-10 flex flex-col pt-6">
        {/* Top Newsletter & Atelier Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-ivory/10">
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/media/logo.svg"
                  alt="Mayura Looms Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display uppercase tracking-widest text-2xl text-ivory">
                MAYURA LOOMS
              </span>
            </div>
            <p className="font-heading italic text-marigold text-lg">
              &ldquo;Woven in Peacock Light&rdquo;
            </p>
            <p className="mt-2 text-xs sm:text-sm text-ivory/70 font-sans max-w-sm leading-relaxed">
              Preserving sacred Indian handloom lineages. Direct patron-to-artisan bridge
              for Varanasi, Kanchipuram, and Patan master weavers.
            </p>
          </div>

          {/* Newsletter Input with Animated Underline and Arrow Button */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-button text-marigold mb-2">
              THE SILK GAZETTE
            </span>
            <p className="font-heading text-xl md:text-2xl text-ivory mb-6">
              Receive private invitations to preview limited edition handloom drops.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-transparent border-b-2 border-ivory/20 pb-3 font-sans text-sm sm:text-base text-ivory placeholder-ivory/40 focus:outline-none focus:border-marigold transition-colors pr-14"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-0 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink hover:scale-105 transition-transform cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <span className="mt-2 text-xs font-sans text-marigold">
                ✦ Welcome to the Mayura Circle. Your invitation has been dispatched.
              </span>
            )}
          </div>
        </div>

        {/* 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-ivory/10 font-sans text-xs sm:text-sm">
          {/* Col 1: Shop */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-widest text-marigold text-[11px]">
              SHOP
            </span>
            <Link href="#six-moods" className="text-ivory/70 hover:text-ivory transition-colors">
              Banarasi Heirlooms
            </Link>
            <Link href="#six-moods" className="text-ivory/70 hover:text-ivory transition-colors">
              Kanjivaram Icons
            </Link>
            <Link href="#bridal-collection" className="text-ivory/70 hover:text-ivory transition-colors">
              Bridal Trousseau
            </Link>
            <Link href="#spotlight" className="text-ivory/70 hover:text-ivory transition-colors">
              Pure Organza Silks
            </Link>
            <Link href="#new-arrivals" className="text-ivory/70 hover:text-ivory transition-colors">
              All New Drops
            </Link>
          </div>

          {/* Col 2: Collections */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-widest text-marigold text-[11px]">
              EDITIONS
            </span>
            <Link href="#occasions" className="text-ivory/70 hover:text-ivory transition-colors">
              Wedding Edit
            </Link>
            <Link href="#occasions" className="text-ivory/70 hover:text-ivory transition-colors">
              Festive Splendour
            </Link>
            <Link href="#occasions" className="text-ivory/70 hover:text-ivory transition-colors">
              Contemporary Office
            </Link>
            <Link href="#occasions" className="text-ivory/70 hover:text-ivory transition-colors">
              Nocturne Cocktail
            </Link>
            <Link href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Artisan Documentary
            </Link>
          </div>

          {/* Col 3: Care & Craft */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-widest text-marigold text-[11px]">
              CARE & ETHOS
            </span>
            <a href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Silk Mark Certification
            </a>
            <a href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Tested Zari Purity
            </a>
            <a href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Muslin Saree Storage
            </a>
            <a href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Direct Weaver Patronage
            </a>
            <a href="#heritage" className="text-ivory/70 hover:text-ivory transition-colors">
              Sustainable Dyes
            </a>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-widest text-marigold text-[11px]">
              CONCIERGE
            </span>
            <span className="text-ivory/70">Atelier: Varanasi & Kanchipuram</span>
            <span className="text-ivory/70">Phone: +91 98200 45890</span>
            <span className="text-ivory/70">Email: concierge@mayuralooms.com</span>
            <span className="text-ivory/70">Hours: Mon–Sat 10:00 to 19:00 IST</span>
            <span className="text-teal font-semibold">Virtual Styling Available</span>
          </div>
        </div>

        {/* Giant "MAYURA" Wordmark inside an overflow-hidden container with padding-bottom */}
        <div className="w-full overflow-hidden flex items-center justify-center pt-8 pb-12">
          <h2 className="group cursor-default font-display uppercase tracking-tighter leading-none text-[clamp(4.5rem,19vw,18rem)] select-none text-transparent transition-colors duration-500 m-0 p-0">
            <span
              className="transition-all duration-500 group-hover:text-marigold"
              style={{
                WebkitTextStroke: "2px rgba(251,246,236,0.14)",
              }}
            >
              MAYURA
            </span>
          </h2>
        </div>

        {/* Bottom Bar: Copyright, Socials & Back to Top */}
        <div className="pt-6 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-xs text-ivory/60">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Mayura Looms Atelier. All rights reserved.</span>
            <span className="hidden sm:inline">Handcrafted with reverence in India.</span>
          </div>

          {/* 44px Circular Brand Social Buttons with Real SVGs */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Mayura Looms on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all duration-300 hover:bg-marigold hover:border-marigold hover:text-ink hover:-translate-y-1 cursor-pointer"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Mayura Looms on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all duration-300 hover:bg-marigold hover:border-marigold hover:text-ink hover:-translate-y-1 cursor-pointer"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Subscribe to Mayura Looms on YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all duration-300 hover:bg-marigold hover:border-marigold hover:text-ink hover:-translate-y-1 cursor-pointer"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-xs font-semibold tracking-button uppercase text-ivory hover:border-marigold hover:text-marigold transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
