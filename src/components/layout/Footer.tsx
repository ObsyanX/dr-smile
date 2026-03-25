import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Smile Gallery", path: "/gallery" },
  { label: "About Us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Book Appointment", path: "/contact" },
];

const localPages = [
  { label: "Dental Clinic Madhyamgram", path: "/dental-clinic-madhyamgram" },
  { label: "Dentist Dum Dum", path: "/dentist-dum-dum" },
  { label: "Root Canal Madhyamgram", path: "/root-canal-madhyamgram" },
  { label: "Teeth Whitening Dum Dum", path: "/teeth-whitening-dum-dum" },
  { label: "Emergency Dentist", path: "/emergency-dentist-madhyamgram" },
  { label: "Dental Implants", path: "/dental-implants-madhyamgram" },
];

const services = [
  "Dental Implants",
  "Teeth Whitening",
  "Root Canal",
  "Braces & Aligners",
  "Smile Design",
  "Pediatric Dentistry",
];

const Footer = () => (
  <footer className="relative bg-foreground text-primary-foreground/70 overflow-hidden">
    {/* Subtle gradient accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container-dental pt-20 pb-10">
      {/* Top section — brand + columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-block mb-5">
            <h3 className="font-heading font-bold text-2xl text-primary-foreground tracking-tight">
              Tooth<span className="text-primary">Zone</span>
            </h3>
          </Link>
          <p className="text-sm leading-relaxed mb-3 max-w-xs">
            Best dental clinic in Madhyamgram. Advanced dental care for Madhyamgram, Dum Dum &amp; all of North Kolkata.
          </p>
          <p className="text-xs text-primary-foreground/40 mb-5">📍 Madhyamgram, West Bengal — 700129</p>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919804214790"
              className="w-10 h-10 rounded-full border border-primary-foreground/15 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:roy.tamaall@gmail.com"
              className="w-10 h-10 rounded-full border border-primary-foreground/15 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
              aria-label="Email us"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  {item.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Local SEO Pages */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-5">
            Local Clinics
          </h4>
          <ul className="space-y-3">
            {localPages.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  {item.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-5">
            Treatments
          </h4>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service}>
                <Link
                  to="/services"
                  className="text-sm hover:text-primary transition-colors duration-300"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Hours */}
        <div className="lg:col-span-3">
          <h4 className="font-heading font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-5">
            Visit Us
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Madhyamgram, North 24 Parganas,<br />West Bengal — 700129</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:+919804214790" className="hover:text-primary transition-colors">
                +91 9804214790
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a href="mailto:roy.tamaall@gmail.com" className="hover:text-primary transition-colors">
                roy.tamaall@gmail.com
              </a>
            </li>
          </ul>
          <div className="mt-5 pt-4 border-t border-primary-foreground/10">
            <p className="text-xs text-primary-foreground/40 mb-3 font-heading font-medium uppercase tracking-wider tracking-[0.1em]">Hours</p>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Madhyamgram Clinic</span>
                <div className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span className="text-primary-foreground/90 font-medium">6:15 PM – 9:00 PM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Dum Dum Clinic</span>
                <div className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span className="text-primary-foreground/90 font-medium">10:30 AM – 2:00 PM</span>
                </div>
              </div>
              <div className="flex justify-between text-xs pt-1 opacity-60">
                <span>Sunday</span>
                <span className="text-destructive/80 font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} ToothZone Dental Clinic. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-primary-foreground/30">
          <span className="hover:text-primary-foreground/50 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary-foreground/50 cursor-pointer transition-colors">Terms of Service</span>
          <Link to="/admin/login" className="hover:text-primary-foreground/50 transition-colors">Admin</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
