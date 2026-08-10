"use client";

import { usePathname } from "next/navigation";
import { AppbarClient } from "./AppbarClient";
import Footer from "@repo/ui/footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const standalonePage =
    pathname === "/home" ||
    pathname === "/auth" ||
    pathname === "/Bank/hdfc" ||
    pathname === "/Bank/axis";
  const dashboardPage = ["/dashboard", "/transfer", "/p2p", "/transactions", "/contact", "/account"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const showAppbarAndFooter = !standalonePage && !dashboardPage;

  return (
    <>
      {showAppbarAndFooter && <AppbarClient />}

      {children}

      {showAppbarAndFooter && <Footer />}
    </>
  );
}
