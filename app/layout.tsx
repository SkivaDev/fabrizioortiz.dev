import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google"; // Import Outfit
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// ... (metadata remains same) ...

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const metadata = messages.metadata as { title: string; description: string };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [
      "Fabrizio Ortiz",
      "Full-Stack Developer",
      "Software Engineer",
      "TypeScript",
      "NestJS",
      "Next.js",
      "React",
      "Portfolio",
    ],
    authors: [{ name: "Fabrizio Ortiz" }],
    creator: "Fabrizio Ortiz",
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: "https://fabrizioortiz.dev",
      siteName: "Fabrizio Ortiz Portfolio",
      locale: locale === "es" ? "es_PE" : "en_US",
      type: "website",
      images: [
        {
          url: "https://fabrizioortiz.dev/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Fabrizio Ortiz - Full-Stack Developer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://fabrizioortiz.dev/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
