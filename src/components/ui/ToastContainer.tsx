"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { CheckCircle2, Heart, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[80] flex flex-col gap-3 pointer-events-none max-w-sm w-full"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3.5 rounded-[18px] bg-ink/95 text-ivory p-3.5 shadow-teal border border-ivory/15 backdrop-blur-md"
          >
            {/* Thumbnail */}
            {toast.image ? (
              <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-[10px] bg-ivory">
                <Image
                  src={toast.image}
                  alt={toast.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marigold/20 text-marigold">
                {toast.type === "cart" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Heart className="h-5 w-5 fill-clay text-clay" />
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-sans text-[11px] font-semibold tracking-button uppercase text-marigold">
                {toast.title}
              </span>
              <p className="font-heading text-[14px] text-ivory/90 truncate leading-snug">
                {toast.description}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-ivory/40 hover:text-ivory transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

