import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/80 pt-16 pb-8">
    <div className="container-dental">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <h3 className="font-heading font-bold text-xl text-primary-foreground mb-4">SmileCare</h3>
          <p className="text-sm leading-relaxed text-primary-foreground/60">
            Advanced dental care with modern technology and compassionate treatment for your entire family.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[{ l: "Home", p: "/" }, { l: "Services", p: "/services" }, { l: "Smile Gallery", p: "/gallery" }, { l: "About", p: "/about" }, { l: "Contact", p: "/contact" }].map(i => (
              <li key={i.p}><Link to={i.p} className="hover:text-primary transition-colors">{i.l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {["Dental Implants", "Teeth Whitening", "Root Canal", "Braces & Aligners", "Smile Design", "Pediatric Dentistry"].map(s => (
              <li key={s}><Link to="/services" className="hover:text-primary transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@smilecare.com</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> 123 Dental Avenue, Downtown, NY 10001</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-primary-foreground/40">© {new Date().getFullYear()} SmileCare Dental Clinic. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-primary-foreground/40">
          <span className="hover:text-primary-foreground/60 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary-foreground/60 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
