"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, Sparkles } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Frontend", value: "React, Next.js" },
  { icon: Server, label: "Backend", value: "NestJS, Node.js" },
  { icon: Cloud, label: "Cloud", value: "AWS, Docker" },
  { icon: Sparkles, label: "Experience", value: "2+ años" },
];

export function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-[var(--color-bg-secondary)]">
      <div className="container">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </h2>
            <div className="w-12 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Avatar placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-sm mx-auto"
            >
              {/* Profile image placeholder */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-border)] flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[var(--color-border)] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[var(--color-text-tertiary)]">
                      FO
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Placeholder para foto de perfil
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[var(--color-border)] rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--color-accent-subtle)] rounded-xl -z-10" />
            </motion.div>

            {/* Right: Text content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("paragraph1")}
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("paragraph2")}
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("paragraph3")}
              </p>
            </motion.div>
          </div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="card p-6 md:p-8 text-center"
              >
                <item.icon
                  size={24}
                  className="mx-auto mb-3 text-[var(--color-accent)]"
                />
                <p className="text-sm text-[var(--color-text-muted)] mb-1">
                  {item.label}
                </p>
                <p className="font-medium">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
