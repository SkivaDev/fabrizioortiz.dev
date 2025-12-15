"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Play } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Project {
  id: string;
  color: string;
  gradient: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  title: string;
  description: string;
  subtitle: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-(--color-surface) w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto border border-(--color-border)"
            >
              {/* Header Image/Video Placeholder */}
              <div
                className={`relative aspect-video w-full bg-gradient-to-br ${project.gradient} flex items-center justify-center p-8`}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Simulated Content */}
                <div className="w-full max-w-xl bg-(--color-surface) rounded-xl shadow-2xl overflow-hidden border border-(--color-border/20) transform scale-110">
                  <div className="h-6 bg-(--color-bg-tertiary) border-b border-(--color-border) flex items-center px-3 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="aspect-video bg-(--color-bg) flex items-center justify-center relative group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-(--color-accent) text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span
                      className="text-sm font-medium mb-1 block"
                      style={{ color: project.color }}
                    >
                      {project.subtitle}
                    </span>
                    <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={18} />
                      <span className="hidden sm:inline">Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Github size={18} />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg text-(--color-text-secondary) leading-relaxed">
                    {project.description}
                  </p>

                  {/* Additional details could go here */}
                  <div className="mt-8 p-6 bg-(--color-bg-secondary) rounded-xl border border-(--color-border)">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {/* This would ideally come from the project data features array */}
                      <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                        Responsive Design
                      </li>
                      <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                        Dark Mode Support
                      </li>
                      <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                        High Performance
                      </li>
                      <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                        Modern UI/UX
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
