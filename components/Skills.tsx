"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Skills data organized by category
const skillsData = {
  languages: [
    { name: "TypeScript", icon: "ts" },
    { name: "JavaScript", icon: "js" },
    { name: "SQL", icon: "sql" },
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
  ],
  frontend: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Astro", icon: "astro" },
    { name: "TailwindCSS", icon: "tailwind" },
    { name: "Redux", icon: "redux" },
    { name: "Zustand", icon: "zustand" },
    { name: "TanStack Query", icon: "tanstack" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "NestJS", icon: "nestjs" },
    { name: "Express", icon: "express" },
    { name: "Prisma", icon: "prisma" },
    { name: "PostgreSQL", icon: "postgres" },
    { name: "MySQL", icon: "mysql" },
    { name: "MongoDB", icon: "mongodb" },
  ],
  cloud: [
    { name: "Docker", icon: "docker" },
    { name: "AWS", icon: "aws" },
    { name: "Railway", icon: "railway" },
    { name: "Vercel", icon: "vercel" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
  ],
  tools: [
    { name: "Java", icon: "java" },
    { name: "Spring Boot", icon: "spring" },
    { name: "Postman", icon: "postman" },
    { name: "VS Code", icon: "vscode" },
    { name: "Swagger", icon: "swagger" },
  ],
};

// Simple icon component using initials/abbreviations
function SkillIcon({ name }: { name: string }) {
  // Get first 2-3 characters for icon
  const getInitials = (name: string) => {
    if (name === "TypeScript") return "TS";
    if (name === "JavaScript") return "JS";
    if (name === "TailwindCSS") return "TW";
    if (name === "PostgreSQL") return "PG";
    if (name === "MongoDB") return "MG";
    if (name === "Spring Boot") return "SB";
    if (name === "VS Code") return "VS";
    if (name === "TanStack Query") return "TQ";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">
      {getInitials(name)}
    </div>
  );
}

export function Skills() {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Object.keys(skillsData) as Array<keyof typeof skillsData>;

  return (
    <section id="skills" className="section">
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

          {/* Skills grid by category */}
          <div className="space-y-12 max-w-5xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-6">
                  {t(`categories.${category}`)}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillsData[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors cursor-default"
                    >
                      <SkillIcon name={skill.name} />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
