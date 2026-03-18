import { ReactNode } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-14 md:pt-0">
      {children}
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileNav />
  </div>
);

export default Layout;
