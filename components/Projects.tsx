"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight, Play } from "lucide-react";

const projects = [
  {
    id: "clinica",
    color: "#0071e3",
    gradient: "from-blue-500/20 to-cyan-500/20",
    tech: ["NestJS", "Next.js 15", "PostgreSQL", "Redis", "AWS S3", "Docker"],
    github: "https://github.com/SkivaDev/clinica-peru",
    demo: "#",
    featured: true,
  },
  {
    id: "corredor",
    color: "#ff3b30",
    gradient: "from-red-500/20 to-orange-500/20",
    tech: ["React", "Spring Boot", "MySQL", "Google Maps API"],
    github: "https://github.com/SkivaDev/corredor-rojo",
    demo: "#",
    featured: true,
  },
  {
    id: "fakestore",
    color: "#34c759",
    gradient: "from-green-500/20 to-emerald-500/20",
    tech: ["NestJS", "Prisma", "JWT", "Docker", "Swagger"],
    github: "https://github.com/SkivaDev/fakestore-api",
    demo: "#",
    featured: false,
  },
  {
    id: "movieapp",
    color: "#af52de",
    gradient: "from-purple-500/20 to-pink-500/20",
    tech: ["React", "Sass", "TMDb API", "i18next"],
    github: "https://github.com/SkivaDev/movieapp",
    demo: "#",
    featured: false,
  },
];

export function Projects() {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="section">
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

          {/* Featured Projects */}
          <div className="space-y-24">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Project Image/Video Mockup */}
                  <motion.div
                    className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-[var(--color-border)] group cursor-pointer`}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Mockup placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-full max-w-md bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--color-border)]">
                        {/* Browser header mockup */}
                        <div className="h-8 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)] flex items-center px-3 gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                          <div className="flex-1 mx-4">
                            <div className="h-4 bg-[var(--color-border)] rounded-full max-w-[200px] mx-auto" />
                          </div>
                        </div>
                        {/* Content area mockup */}
                        <div className="p-6 space-y-4">
                          <div className="h-4 bg-[var(--color-border)] rounded w-3/4" />
                          <div className="h-4 bg-[var(--color-border)] rounded w-1/2" />
                          <div className="h-20 bg-[var(--color-border)] rounded mt-4" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-8 bg-[var(--color-border)] rounded" />
                            <div className="h-8 bg-[var(--color-border)] rounded" />
                            <div className="h-8 bg-[var(--color-border)] rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Play button overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                        initial={false}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play
                            size={24}
                            className="text-black ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner accent */}
                    <div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                  </motion.div>

                  {/* Project Info */}
                  <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                    <span
                      className="inline-block text-sm font-medium mb-2"
                      style={{ color: project.color }}
                    >
                      {t(`items.${project.id}.subtitle`)}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {t(`items.${project.id}.title`)}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                      {t(`items.${project.id}.description`)}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-8">
                      {(t.raw(`items.${project.id}.features`) as string[]).map(
                        (feature: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                          >
                            <ChevronRight
                              size={16}
                              className="mt-0.5 text-[var(--color-accent)]"
                            />
                            {feature}
                          </li>
                        )
                      )}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.demo}
                        className="btn btn-primary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={18} />
                        {t("viewDemo")}
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github size={18} />
                        {t("viewCode")}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Other Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h3 className="text-xl font-semibold text-center mb-12">
              {t("otherProjects")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="card p-6 hover-lift"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span
                          className="text-xs font-medium"
                          style={{ color: project.color }}
                        >
                          {t(`items.${project.id}.subtitle`)}
                        </span>
                        <h4 className="text-lg font-semibold">
                          {t(`items.${project.id}.title`)}
                        </h4>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.demo}
                          className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {t(`items.${project.id}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="badge text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
