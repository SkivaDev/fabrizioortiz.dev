"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiAmazonwebservices,
  SiRailway,
  SiVercel,
  SiGit,
  SiGithub,
  SiSpringboot,
  SiPostman,
  SiSwagger,
  SiReactquery,
} from "react-icons/si";
import { FaJava, FaDatabase, FaCode } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

// Skills data organized by category (optimized for recruiter readability)
const skillsData = {
  // Core programming languages - what recruiters search for first
  languages: [
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Java", icon: FaJava },
    { name: "SQL", icon: FaDatabase },
  ],
  // Frontend ecosystem - React-focused stack
  frontend: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Astro", icon: SiAstro },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss3 },
    { name: "Redux", icon: SiRedux },
    { name: "Zustand", icon: FaCode },
    { name: "TanStack Query", icon: SiReactquery },
  ],
  // Backend & APIs - Node.js + Java ecosystems
  backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "NestJS", icon: SiNestjs },
    { name: "Express", icon: SiExpress },
    { name: "Spring Boot", icon: SiSpringboot },
  ],
  // Databases & ORM - Data layer expertise
  databases: [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Prisma", icon: SiPrisma },
  ],
  // DevOps & Cloud - Deployment capabilities
  devops: [
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: SiAmazonwebservices },
    { name: "Vercel", icon: SiVercel },
    { name: "Railway", icon: SiRailway },
  ],
  // Developer Tools - Daily workflow
  tools: [
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "VS Code", icon: VscVscode },
    { name: "Postman", icon: SiPostman },
    { name: "Swagger", icon: SiSwagger },
  ],
};

function SkillIcon({ icon: Icon }: { icon: any }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
      <Icon size={20} />
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
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-default shadow-sm hover:shadow-md"
                    >
                      <SkillIcon icon={skill.icon} />
                      <span className="text-sm font-medium group-hover:text-[var(--color-text-primary)] transition-colors">
                        {skill.name}
                      </span>
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
