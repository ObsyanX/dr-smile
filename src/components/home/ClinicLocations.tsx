import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const clinics = [
  {
    name: "SmileCare Downtown",
    address: "123 Dental Avenue, Downtown, NY 10001",
    days: "Mon – Fri",
    hours: "10:00 AM – 7:00 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80",
    mapUrl: "https://www.google.com/maps?q=40.7128,-74.0060",
    coords: { lat: 40.7128, lng: -74.0060 },
  },
  {
    name: "SmileCare Midtown",
    address: "456 Health Blvd, Midtown, NY 10018",
    days: "Mon – Sat",
    hours: "9:00 AM – 6:00 PM",
    image: "https://images.unsplash.com/photo-1631549916768-4e9861c6af09?w=500&q=80",
    mapUrl: "https://www.google.com/maps?q=40.7549,-73.9840",
    coords: { lat: 40.7549, lng: -73.9840 },
  },
  {
    name: "SmileCare Brooklyn",
    address: "789 Wellness St, Brooklyn, NY 11201",
    days: "Tue – Sat",
    hours: "10:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80",
    mapUrl: "https://www.google.com/maps?q=40.6892,-73.9857",
    coords: { lat: 40.6892, lng: -73.9857 },
  },
];

const ClinicLocations = () => {
  const [mapClinic, setMapClinic] = useState<typeof clinics[0] | null>(null);

  return (
    <section className="section-padding bg-background">
      <div className="container-dental">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Locations</p>
            <h2 className="text-h2 font-heading font-bold text-foreground">Visit Our Clinics</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">We have multiple convenient locations to serve you better.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {clinics.map((clinic, i) => (
            <ScrollReveal key={clinic.name} delay={i * 0.1}>
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-foreground text-lg mb-3">{clinic.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-5">
                    <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />{clinic.address}</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary shrink-0" />{clinic.days}: {clinic.hours}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full flex-1 font-heading" onClick={() => setMapClinic(clinic)}>
                      <MapPin className="w-3 h-3 mr-1" /> View Map
                    </Button>
                    <Link to="/contact" className="flex-1">
                      <Button size="sm" className="rounded-full w-full font-heading">
                        <Calendar className="w-3 h-3 mr-1" /> Book
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Map modal */}
      <Dialog open={!!mapClinic} onOpenChange={() => setMapClinic(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading">{mapClinic?.name}</DialogTitle>
          </DialogHeader>
          {mapClinic && (
            <div className="space-y-4">
              <iframe
                title={`Map of ${mapClinic.name}`}
                src={`https://maps.google.com/maps?q=${mapClinic.coords.lat},${mapClinic.coords.lng}&z=15&output=embed`}
                className="w-full h-80 rounded-xl border-0"
                loading="lazy"
                allowFullScreen
              />
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                {mapClinic.address}
              </div>
              <a href={mapClinic.mapUrl} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full font-heading w-full">Open in Google Maps</Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClinicLocations;
