import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
  location?: string;
}

const MapEmbed = ({ location = "Madhyamgram" }: MapEmbedProps) => {
  const [loaded, setLoaded] = useState(false);
  const isDumDum = location.includes("Dum Dum") || location.includes("Dumdum");

  const clinicData = isDumDum ? {
    name: "ToothZone Dental Clinic — Dum Dum",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2119394445467!2d88.3957902!3d22.6085595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027733376dce25%3A0x7d897aace8f1b0d6!2sTooth%20Zone%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1774425132291!5m2!1sen!2sin",
    address: "📍 Jessore Rd, Basak Bagan, South Dumdum, Kolkata — 700048",
    mapUrl: "https://maps.app.goo.gl/7ZHCytdYZHkiDpKP8"
  } : {
    name: "ToothZone Dental Clinic — Madhyamgram",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.6863746349745!2d88.4608667!3d22.702716199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f4a179a7907%3A0x6c8760213fba18c8!2sTooth%20Zone%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1774425385717!5m2!1sen!2sin",
    address: "📍 9 No Railgate, Madhyamgram, West Bengal — 700130",
    mapUrl: "https://maps.app.goo.gl/caB9HBPh61tJKgX36"
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg">
      <div className="bg-primary/5 border-b border-border/50 px-5 py-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-heading font-semibold text-foreground">
          {clinicData.name}
        </span>
      </div>
      {loaded ? (
        <iframe
          title={`Map of ${clinicData.name}`}
          src={clinicData.embedUrl}
          width="100%"
          height="350"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Google Map showing ${clinicData.name}`}
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
        <span className="text-xs text-muted-foreground">{clinicData.address}</span>
        <a
          href={clinicData.mapUrl}
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
