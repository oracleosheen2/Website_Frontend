"use client";

import { usePathname } from "next/navigation";
import HeroHeader from "@/components/Hero/HeroHeader";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/contexts/CartContext";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/login" || pathname === "/register";

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!hideHeaderFooter && <HeroHeader />}

        <main className="flex-1">{children}</main>

        {!hideHeaderFooter && <Footer />}
      </div>
    </CartProvider>
  );
}
