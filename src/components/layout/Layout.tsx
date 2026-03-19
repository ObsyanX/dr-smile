import { ReactNode } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    {/* Skip to content — accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-primary-foreground focus:font-heading focus:text-sm focus:shadow-lg"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main-content" className="flex-1 pt-14 md:pt-0">
      {children}
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileNav />
    {/* Spacer for mobile bottom nav */}
    <div className="h-20 md:hidden" aria-hidden="true" />
  </div>
);

export default Layout;
