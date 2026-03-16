import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const MobileActionBar = () => (
  <div className="fixed bottom-[72px] left-0 right-0 z-40 md:hidden px-4 pb-2">
    <div className="flex items-center gap-2 p-2 rounded-2xl bg-foreground/95 backdrop-blur-xl shadow-lg">
      <a href="tel:+15551234567" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground text-sm font-medium">
        <Phone className="w-4 h-4" /> Call
      </a>
      <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366]/20 text-[#25D366] text-sm font-medium">
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
      <Link to="/contact" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
        <Calendar className="w-4 h-4" /> Book
      </Link>
    </div>
  </div>
);

export default MobileActionBar;
