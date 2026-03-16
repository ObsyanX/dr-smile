import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Smile Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* Desktop floating pill nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-400 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg border border-border/50"
            : "bg-background/40 backdrop-blur-md border border-white/20"
        }`}
      >
        <Link to="/" className="px-3 font-heading font-bold text-primary text-lg mr-2">
          SmileCare
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              location.pathname === item.path
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {item.label}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-full bg-primary/10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        ))}
        <Link to="/contact">
          <Button size="sm" className="ml-2 rounded-full font-heading">
            Book Appointment
          </Button>
        </Link>
      </motion.header>

      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <Link to="/" className="font-heading font-bold text-primary text-lg">
          SmileCare
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-14 z-40 md:hidden bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center gap-6 pt-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-heading font-medium transition-colors ${
                    location.pathname === item.path ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="rounded-full font-heading mt-4">Book Appointment</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
