"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[var(--color-border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span>© {currentYear} Fabrizio Ortiz.</span>
            <span>{t("rights")}</span>
          </div>

          {/* Center: Made with */}
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
            <span>{t("madeWith")}</span>
            <Heart size={14} className="text-red-500 fill-current" />
            <span>&</span>
            <span className="font-mono">Next.js</span>
          </div>

          {/* Right: Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={16} />
            <span className="hidden sm:inline">{t("backToTop")}</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
