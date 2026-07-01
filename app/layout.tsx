import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
<meta name="google-site-verification" content="-hbVL6l7SqVpR7l97qPzvC3zCi1cSrtSA7wpfuyXQuo" />

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
  title: "rizqan — portfolio",
  description: "Full-stack web developer portfolio",
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
