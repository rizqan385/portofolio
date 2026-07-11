import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi Rizqan Ahmad Maulana via Discord, WhatsApp, Instagram, GitHub, atau kirim email langsung. Siap berkolaborasi untuk proyek web development.",
  openGraph: {
    title: "Contact rizqanahmd",
    description: "Hubungi Rizqan Ahmad Maulana via Discord, WhatsApp, Instagram, GitHub, atau email langsung.",
    url: "https://rizqanahmd.vercel.app/contact",
  },
  alternates: {
    canonical: "https://rizqanahmd.vercel.app/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
