import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact rizqanahmd | Establish Communication",
  description: "Get in touch with Rizqan Ahmad Maulana. Reach out via Discord, WhatsApp, Instagram, GitHub, or direct email.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
