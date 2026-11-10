"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Instagram, PhoneCall } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const MENU_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Sarees", href: "#new-arrivals" },
  { name: "Collections", href: "#six-moods" },
  { name: "Occasion", href: "#occasions" },
  { name: "About", href: "#heritage" },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink text-ivory px-6 py-8 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-ivory/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9">
                <Image
                  src="/media/logo.svg"
                  alt="Mayura Looms"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display uppercase tracking-wider text-xl text-ivory">
                MAYURA LOOMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 hover:border-marigold transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-ivory" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="my-auto flex flex-col gap-4 py-8">
            {MENU_LINKS.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05, duration: 0.5, ease: "easeOut" }}
              >
                <button
                  onClick={() => {
                    onNavigate(link.href);
                    onClose();
                  }}
                  className="group flex w-full items-baseline justify-between py-2 text-left"
                >
                  <span className="font-heading text-3xl font-medium text-ivory/90 group-hover:text-marigold transition-colors">
                    {link.name}
                  </span>
                  <ArrowRight className="h-5 w-5 text-marigold opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer inside mobile menu */}
          <div className="pt-6 border-t border-ivory/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-button text-marigold">
                Atelier Concierge
              </span>
              <span className="text-xs font-sans text-ivory/60">+91 98200 45890</span>
            </div>
            <p className="text-xs font-sans text-ivory/50">
              Handwoven silk drapes crafted across 40 authentic heritage weaving clusters.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

