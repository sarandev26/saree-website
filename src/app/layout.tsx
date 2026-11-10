import type { Metadata } from "next";
import { Cormorant_Garamond, Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SearchModal } from "@/components/shell/SearchModal";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { WishlistDrawer } from "@/components/shell/WishlistDrawer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAYURA LOOMS — Woven in Peacock Light · Premium Saree Boutique",
  description:
    "Heirloom Banarasi, Kanjivaram, Patola, and sheer organza silk sarees handwoven by India's finest master artisan lineages.",
  keywords: [
    "saree",
    "banarasi silk",
    "kanjivaram silk",
    "bridal saree",
    "handloom sarees",
    "mayura looms",
    "organza saree",
  ],
  icons: {
    icon: "/media/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cormorant.variable} ${anton.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="font-sans bg-ivory text-charcoal antialiased selection:bg-marigold selection:text-ink">
        <CartProvider>
          <ScrollProgressBar />
          {children}
          <SearchModal />
          <CartDrawer />
          <WishlistDrawer />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
