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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/30 rounded-t-2xl shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
