"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experienceItems = ["clinica", "corredor", "fakestore", "movieapp"];
const educationItems = ["utp", "platzi"];

export function Experience() {
  const t = useTranslations("experience");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section bg-[var(--color-bg-secondary)]">
      <div className="container">
        <div ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
            {/* Work Experience */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                  <Briefcase size={24} className="text-[var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-semibold">{t("projectsTitle")}</h3>
              </motion.div>

              {/* Timeline */}
              <div className="relative pl-8 border-l-2 border-[var(--color-border)] space-y-8">
                {experienceItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg-secondary)]" />

                    {/* Content */}
                    <div className="card p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold">
                          {t(`items.${item}.role`)}
                        </h4>
                        <span className="badge text-xs">
                          {t(`items.${item}.type`)}
                        </span>
                      </div>
                      <p className="text-[var(--color-accent)] text-sm mb-1">
                        {t(`items.${item}.company`)}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {t(`items.${item}.period`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                  <GraduationCap
                    size={24}
                    className="text-[var(--color-accent)]"
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("education.title")}
                </h3>
              </motion.div>

              {/* Education cards */}
              <div className="space-y-6">
                {educationItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="card p-6"
                  >
                    <h4 className="font-semibold mb-1">
                      {t(`education.${item}.degree`)}
                    </h4>
                    <p className="text-[var(--color-accent)] text-sm mb-1">
                      {t(`education.${item}.institution`)}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {t(`education.${item}.period`)}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Languages section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 card p-6"
              >
                <h4 className="font-semibold mb-4">{t("languages.title")}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("languages.spanish")}</span>
                    <span className="badge text-xs">
                      {t("languages.spanishLevel")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("languages.english")}</span>
                    <span className="badge text-xs">
                      {t("languages.englishLevel")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
