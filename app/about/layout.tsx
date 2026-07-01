import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About rizqanahmd | Full-Stack Developer",
  description: "Learn more about Rizqan Ahmad Maulana, a dedicated full-stack developer specializing in modern web technologies, scalable architectures, and beautiful UI/UX.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
