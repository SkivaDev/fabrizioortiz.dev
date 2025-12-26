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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import Image from "next/image";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("sending");

    try {
      // EmailJS configuration - Uses environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      setFormStatus("success");
      reset();

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

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    {...register("user_name")}
                    type="text"
                    id="name"
                    placeholder={t("form.namePlaceholder")}
                    disabled={formStatus === "sending"}
                    className={`input ${
                      errors.user_name
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {errors.user_name && (
                    <p className="mt-1 text-xs text-red-500">
                      {t("validation.name")}
                    </p>
                  )}
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
                    {...register("user_email")}
                    type="email"
                    id="email"
                    placeholder={t("form.emailPlaceholder")}
                    disabled={formStatus === "sending"}
                    className={`input ${
                      errors.user_email
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {errors.user_email && (
                    <p className="mt-1 text-xs text-red-500">
                      {t("validation.email")}
                    </p>
                  )}
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
                    {...register("message")}
                    id="message"
                    placeholder={t("form.messagePlaceholder")}
                    disabled={formStatus === "sending"}
                    className={`input textarea ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    rows={5}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {t("validation.message")}
                    </p>
                  )}
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
                <div className="card p-6 md:p-8 flex items-center gap-5">
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

                <div className="card p-6 md:p-8 flex items-center gap-5">
                  <div className="p-3 rounded-xl bg-[var(--color-accent-subtle)]">
                    {/* <Phone size={24} className="text-[var(--color-accent)]" /> */}
                    <Image
                      src="/icons/whatsapp-logo.svg"
                      alt="WhatsApp Logo"
                      width={24}
                      height={24}
                      className="text-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Teléfono
                    </p>
                    <a
                      href={`https://wa.me/51936889247`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      {t("info.phone")}
                    </a>
                  </div>
                </div>

                <div className="card p-6 md:p-8 flex items-center gap-5">
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
