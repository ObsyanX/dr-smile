import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Stethoscope, Camera, User, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Stethoscope },
  { label: "Gallery", path: "/gallery", icon: Camera },
  { label: "About", path: "/about", icon: User },
  { label: "Contact", path: "/contact", icon: Phone },
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
      <div className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-[400ms] ${
            scrolled
              ? "bg-background/70 backdrop-blur-xl shadow-lg border border-border/50"
              : "bg-background/50 backdrop-blur-md border border-border/30"
          }`}
      >
        <Link to="/" className="px-4 font-heading font-bold text-primary text-lg tracking-tight">
          SmileCare
        </Link>

        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-all duration-[400ms] ease-in-out hover:scale-[1.03] ${
                active
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
              <span>{item.label}</span>
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-border/60 mx-1" />

        <Link to="/contact">
          <Button size="sm" className="rounded-full font-heading gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
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
                  className={`flex items-center gap-2 text-lg font-heading font-medium transition-colors ${
                    location.pathname === item.path ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="rounded-full font-heading mt-4 gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
