import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Jelajahi proyek web dan mobile yang dikembangkan oleh rizqanahmd, termasuk Website Sekolah, Perpustakaan Digital, Buku Induk Siswa, dan Company Profile UMKM.",
  openGraph: {
    title: "Projects | rizqanahmd",
    description: "Jelajahi proyek web dan mobile yang dikembangkan oleh rizqanahmd.",
    url: "https://rizqanahmd.vercel.app/projects",
  },
  alternates: {
    canonical: "https://rizqanahmd.vercel.app/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
