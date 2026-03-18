import { Link, useLocation } from "react-router-dom";
import { Home, Stethoscope, Camera, User, Phone } from "lucide-react";

const items = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Stethoscope },
  { label: "Gallery", path: "/gallery", icon: Camera },
  { label: "About", path: "/about", icon: User },
  { label: "Contact", path: "/contact", icon: Phone },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 rounded-t-2xl shadow-[0_-4px_24px_-6px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-around py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        {items.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors duration-300 ${active ? "bg-primary/10" : ""}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
