import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rizqanahmd.vercel.app"),
  title: {
    default: "rizqanahmd | Full-Stack Web & Mobile Developer",
    template: "%s | rizqanahmd",
  },
  description: "Portofolio resmi rizqanahmd (Rizqan Ahmad Maulana) - Full-Stack Web dan Mobile Developer yang berfokus pada Laravel, Go, dan web modern.",
  keywords: ["rizqanahmd", "Rizqan Ahmad Maulana", "rizqan portfolio", "web developer Depok", "fullstack developer Indonesia", "Laravel developer", "Next.js developer", "React developer Indonesia"],
  authors: [{ name: "Rizqan Ahmad Maulana", url: "https://rizqanahmd.vercel.app" }],
  creator: "Rizqan Ahmad Maulana",
  publisher: "Rizqan Ahmad Maulana",
  openGraph: {
    title: "rizqanahmd | Full-Stack Web & Mobile Developer",
    description: "Hubungi dan lihat proyek full-stack development terbaru dari rizqanahmd.",
    url: "https://rizqanahmd.vercel.app",
    siteName: "rizqanahmd Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rizqanahmd | Full-Stack Developer",
    description: "Portofolio resmi Rizqan Ahmad Maulana - Full-Stack Web Developer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "-hbVL6l7SqVpR7l97qPzvC3zCi1cSrtSA7wpfuyXQuo",
  },
  alternates: {
    canonical: "https://rizqanahmd.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rizqan Ahmad Maulana",
              alternateName: "rizqanahmd",
              url: "https://rizqanahmd.vercel.app",
              jobTitle: "Full-Stack Web Developer",
              knowsAbout: ["Laravel", "React", "Next.js", "TypeScript", "Go", "MySQL", "Tailwind CSS"],
              sameAs: [
                "https://github.com/rizqan385",
                "https://www.instagram.com/rizqanahmd/",
              ],
            }),
          }}
        />
        <CustomCursor />
        <AudioPlayer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
