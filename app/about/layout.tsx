import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Kenali Rizqan Ahmad Maulana, full-stack developer dari Indonesia yang berfokus pada Laravel, React, Next.js, dan teknologi web modern.",
  openGraph: {
    title: "About rizqanahmd | Full-Stack Developer",
    description: "Kenali Rizqan Ahmad Maulana, full-stack developer dari Indonesia yang berfokus pada Laravel, React, Next.js, dan teknologi web modern.",
    url: "https://rizqanahmd.vercel.app/about",
  },
  alternates: {
    canonical: "https://rizqanahmd.vercel.app/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
