import { HeroSection } from "../../components/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Paywall",
  description: "Welcome to the Paywall digital wallet application",
};

export default function Home() {

  return <HeroSection />;
}
