import type { Metadata } from "next";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: "rizqanahmd | Creative Developer Portfolio",
  description: "Welcome to the creative portfolio of rizqanahmd. Discover my latest works, technical skills, and passion for building beautiful digital experiences.",
};

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
