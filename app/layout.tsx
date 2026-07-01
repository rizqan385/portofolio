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
  title: "rizqanahmd | Full-Stack Web & Mobile Developer",
  description: "Portofolio resmi rizqanahmd (Rizqan Ahmad Maulana) - Full-Stack Web dan Mobile Developer yang berfokus pada Laravel, Go, dan web modern.",
  keywords: ["rizqanahmd", "Rizqan Ahmad Maulana", "rizqan portfolio", "web developer Depok", "fullstack developer Indonesia"],
  authors: [{ name: "Rizqan Ahmad Maulana" }],
  creator: "Rizqan Ahmad Maulana",
  openGraph: {
    title: "rizqanahmd | Portofolio Resmi",
    description: "Hubungi dan lihat proyek full-stack development terbaru dari rizqanahmd.",
    url: "https://rizqanahmd.vercel.app",
    siteName: "rizqanahmd Portfolio",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  verification: {
    google: "-hbVL6l7SqVpR7l97qPzvC3zCi1cSrtSA7wpfuyXQuo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <CustomCursor />
        <AudioPlayer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
