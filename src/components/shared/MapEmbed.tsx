import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const MapEmbed = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg">
      <div className="bg-primary/5 border-b border-border/50 px-5 py-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-heading font-semibold text-foreground">
          ToothZone Dental Clinic — Madhyamgram, West Bengal
        </span>
      </div>
      {loaded ? (
        <iframe
          title="ToothZone Dental Clinic Madhyamgram location map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.9912628043655!2d88.43302887528835!3d22.700702579368714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f88f7a9d0b6c31%3A0x5b8d6e1a8c4d5f21!2sMadhyamgram%2C%20West%20Bengal%20700129!5e0!3m2!1sen!2sin!4v1711300000000!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Map showing ToothZone Dental Clinic location in Madhyamgram, West Bengal"
        />
      ) : (
        <div className="h-[350px] bg-secondary/40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <MapPin className="w-8 h-8 animate-bounce text-primary" />
            <span className="text-sm">Loading map…</span>
          </div>
        </div>
      )}
      <div className="bg-background px-5 py-3 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs text-muted-foreground">📍 Madhyamgram, North 24 Parganas, West Bengal — 700129</span>
        <a
          href="https://maps.google.com/?q=Madhyamgram+West+Bengal+700129"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary font-heading font-semibold hover:underline"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
};

export default MapEmbed;
