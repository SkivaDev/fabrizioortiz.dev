"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
} from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // EmailJS configuration - Replace with your own keys
      // Sign up at https://www.emailjs.com/ and get your keys
      await emailjs.sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        formRef.current!,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      );

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");

      // Reset status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section bg-[var(--color-bg-secondary)]">
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
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("form.namePlaceholder")}
                    required
                    disabled={formStatus === "sending"}
                    className="input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("form.emailPlaceholder")}
                    required
                    disabled={formStatus === "sending"}
                    className="input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("form.messagePlaceholder")}
                    required
                    disabled={formStatus === "sending"}
                    className="input textarea"
                    rows={5}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={formStatus !== "sending" ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== "sending" ? { scale: 0.98 } : {}}
                >
                  {formStatus === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <CheckCircle size={18} />
                      {t("form.success")}
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      <AlertCircle size={18} />
                      {t("form.error")}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t("form.send")}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Info cards */}
              <div className="space-y-4">
                <div className="card p-6 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                    <Mail size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Email
                    </p>
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      {t("info.email")}
                    </a>
                  </div>
                </div>

                <div className="card p-6 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                    <Phone size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Teléfono
                    </p>
                    <a
                      href={`tel:${t("info.phone").replace(/\s/g, "")}`}
                      className="font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      {t("info.phone")}
                    </a>
                  </div>
                </div>

                <div className="card p-6 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                    <MapPin size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Ubicación
                    </p>
                    <p className="font-medium">{t("info.location")}</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  {t("followMe")}
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/SkivaDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/fabrizio-ortiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
