import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | rizqanahmd",
  description: "Explore web and mobile applications developed by rizqanahmd, including E-Commerce, Digital Library, and School Management systems.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
