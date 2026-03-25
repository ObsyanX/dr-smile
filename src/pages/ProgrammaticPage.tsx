import Layout from "@/components/layout/Layout";
import { generateProgrammaticPages } from "@/data/seoPages";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion, { FAQItem } from "@/components/shared/FAQAccordion";
import MapEmbed from "@/components/shared/MapEmbed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Star, CheckCircle } from "lucide-react";

// ─── Page Data Definitions ──────────────────────────────────────────────────

export interface ProgrammaticPageData {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
  h1: string;
  location: string;
  service: string;
  heroDesc: string;
  aboutContent: string[];
  benefits: string[];
  faqs: FAQItem[];
  heroImage: string;
  heroImageAlt: string;
}

// ─── Shared FAQ helpers ──────────────────────────────────────────────────────

const buildFaqs = (service: string, location: string): FAQItem[] => [
  {
    question: `Is there a good ${service} clinic near ${location}?`,
    answer: `Yes! ToothZone Dental Clinic in Madhyamgram is the nearest premium dental clinic serving ${location} and all surrounding areas. We offer ${service} with modern technology and experienced dentists.`,
  },
  {
    question: `What is the cost of ${service} near ${location}?`,
    answer: `The cost depends on the complexity of your case. Contact ToothZone Madhyamgram for a transparent, no-hidden-fee quote. We offer competitive pricing compared to Kolkata city clinics.`,
  },
  {
    question: `Is ${service} painful?`,
    answer: `No. At ToothZone, all procedures are performed with effective local anaesthesia and modern instruments. Patient comfort is our priority.`,
  },
  {
    question: `How far is ToothZone from ${location}?`,
    answer: `ToothZone Dental Clinic is located in Madhyamgram, easily accessible from ${location} by road, train, or auto in 15–30 minutes depending on your starting point.`,
  },
  {
    question: `Can I book an emergency appointment for ${service}?`,
    answer: `Yes. We offer emergency same-day appointments for urgent dental needs. Call us directly for immediate assistance.`,
  },
];

// ─── All Programmatic Page Configs ──────────────────────────────────────────

const customProgrammaticPages: ProgrammaticPageData[] = [
  {
    slug: "dentist-near-madhyamgram",
    title: "Dentist Near Madhyamgram (Painless, Affordable) | ToothZone",
    metaDescription: "Find the best dentist near Madhyamgram at ToothZone Dental Clinic. Full-service dental care — root canal, implants, whitening & more. Book today!",
    keywords: "dentist near madhyamgram, dental clinic near madhyamgram, best dentist madhyamgram, tooth pain treatment near madhyamgram",
    canonical: "https://thetoothzone.vercel.app/dentist-near-madhyamgram",
    h1: "Best Dentist Near Madhyamgram",
    location: "Madhyamgram",
    service: "General Dentistry",
    heroDesc: "ToothZone Dental Clinic is the most trusted dental practice near Madhyamgram. Full-service dental care including root canal, implants, braces, whitening, and paediatric dentistry — all under one roof.",
    aboutContent: [
      "When residents of Madhyamgram search for 'dentist near me', ToothZone Dental Clinic is the answer. Located in the heart of Madhyamgram, our clinic is designed to be the go-to dental facility for families across the area and surrounding localities.",
      "We provide comprehensive dental services ranging from routine check-ups and professional cleaning to advanced procedures like single-visit root canals, full arch dental implants, and complete smile makeovers. Our team of BDS and MDS qualified dentists brings years of experience and a genuine passion for patient care.",
      "Whether you need an emergency dental appointment near Madhyamgram at short notice, or want to plan a long-term orthodontic treatment, ToothZone is equipped and ready to help.",
    ],
    benefits: ["Full-service dental care near Madhyamgram", "Experienced BDS & MDS dental team", "Painless procedures with modern anaesthesia", "Affordable & transparent pricing", "Digital X-rays for accurate diagnosis", "Emergency & same-day appointments", "Child-friendly environment", "Open 6 days a week with evening slots"],
    faqs: buildFaqs("general dentistry", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png",
    heroImageAlt: "Dentist near Madhyamgram - ToothZone dental clinic",
  },
  {
    slug: "dental-clinic-near-dum-dum",
    title: "Dental Clinic Near Dum Dum (Modern, Affordable) | ToothZone",
    metaDescription: "Looking for a dental clinic near Dum Dum? ToothZone Madhyamgram is just 20 minutes away. Expert dentists, affordable care. Book now!",
    keywords: "dental clinic near dum dum, dentist near dum dum, best dental clinic dum dum, affordable dentist dum dum",
    canonical: "https://thetoothzone.vercel.app/dental-clinic-near-dum-dum",
    h1: "Dental Clinic Near Dum Dum — ToothZone Madhyamgram",
    location: "Dum Dum",
    service: "Full Dental Services",
    heroDesc: "The nearest full-service dental clinic to Dum Dum is ToothZone in Madhyamgram — just 20–25 minutes away. No need to travel to central Kolkata for quality dental care.",
    aboutContent: [
      "Dum Dum residents searching for a reliable dental clinic near them no longer need to travel to central Kolkata. ToothZone Dental Clinic in Madhyamgram is just a short 20–25 minute journey and offers the same standard of care as top Kolkata city clinics at significantly more competitive prices.",
      "We serve hundreds of patients from Dum Dum, Dum Dum Cantonment, Shyamnagar, and the broader North 24 Parganas area. Our advanced dental facility in Madhyamgram features digital OPG X-rays, fully sterilised instruments, rotary endodontic systems, LED whitening, and implant-grade titanium materials.",
      "Whether you are looking for a routine scaling near Dum Dum or need complex dental implants, our team at ToothZone provides personalised treatment plans that prioritise your comfort, health, and budget.",
    ],
    benefits: ["Just 20–25 min from Dum Dum", "Modern dental technology", "Full-service — single clinic for all needs", "Affordable vs Kolkata city clinics", "Emergency appointments available", "Evenings & Saturdays available", "Experienced dental team", "Family & paediatric dentistry"],
    faqs: buildFaqs("full dental services", "Dum Dum"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    heroImageAlt: "Dental clinic near Dum Dum - ToothZone Madhyamgram",
  },
  {
    slug: "braces-treatment-madhyamgram",
    title: "Braces & Aligners in Madhyamgram (Metal + Invisible) | ToothZone",
    metaDescription: "Get affordable braces and clear aligners in Madhyamgram at ToothZone. Metal, ceramic & Invisalign options. Expert orthodontist. Book today!",
    keywords: "braces treatment madhyamgram, orthodontist madhyamgram, aligners madhyamgram, braces near dum dum, Invisalign madhyamgram, teeth alignment madhyamgram",
    canonical: "https://thetoothzone.vercel.app/braces-treatment-madhyamgram",
    h1: "Braces & Aligners Treatment in Madhyamgram",
    location: "Madhyamgram",
    service: "Braces & Orthodontic Treatment",
    heroDesc: "Get a perfectly aligned smile with metal braces, ceramic braces, or clear aligners at ToothZone Madhyamgram. Expert orthodontic treatment for children and adults at affordable prices.",
    aboutContent: [
      "ToothZone Dental Clinic in Madhyamgram offers comprehensive orthodontic treatment including traditional metal braces, tooth-coloured ceramic braces, and modern clear aligners (similar to Invisalign). Whether you have crowded teeth, gaps, or a misaligned bite, our orthodontists can design a personalized treatment plan for you.",
      "Braces treatment at our Madhyamgram clinic typically takes 12–24 months depending on the complexity of your case. We provide regular monthly check-up appointments and are available for any adjustment-related queries. For adults who prefer discretion, our clear aligner option offers nearly invisible teeth straightening.",
      "Patients from Dum Dum, Barasat, Bangaon, and surrounding areas regularly choose ToothZone Madhyamgram for braces treatment for their children and themselves, benefiting from our competitive pricing and experienced orthodontic care.",
    ],
    benefits: ["Metal, ceramic & clear aligner options", "Expert orthodontists in Madhyamgram", "Affordable pricing & payment plans", "Braces for kids & adults", "Monthly adjustment appointments", "Clear aligner option for discretion", "Digital before-after simulation", "Serving Dum Dum & North Kolkata"],
    faqs: buildFaqs("braces & orthodontic", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png",
    heroImageAlt: "Braces treatment in Madhyamgram - ToothZone orthodontics",
  },
  {
    slug: "tooth-extraction-dum-dum",
    title: "Painless Tooth Extraction Near Dum Dum | ToothZone",
    metaDescription: "Need painless tooth extraction near Dum Dum? ToothZone Madhyamgram offers safe, affordable tooth removal with expert care. Emergency slots available.",
    keywords: "tooth extraction dum dum, tooth removal near dum dum, wisdom tooth extraction madhyamgram, painless tooth extraction near dum dum",
    canonical: "https://thetoothzone.vercel.app/tooth-extraction-dum-dum",
    h1: "Painless Tooth Extraction Near Dum Dum",
    location: "Dum Dum",
    service: "Tooth Extraction",
    heroDesc: "Safe, painless tooth extraction near Dum Dum at ToothZone Madhyamgram. Routine extractions, wisdom tooth removal, and emergency tooth removal — all with modern anaesthesia and expert care.",
    aboutContent: [
      "If you need a tooth extracted near Dum Dum, ToothZone Dental Clinic in Madhyamgram is your closest trusted option. We perform routine tooth extractions, impacted wisdom tooth removals, and emergency tooth removals — all under effective local anaesthesia to ensure you feel no pain during the procedure.",
      "Tooth extraction at our Madhyamgram clinic is a quick, safe procedure that takes 20–40 minutes in most cases. We use sterile instruments and proper post-extraction protocols to minimise the risk of dry socket and infection. You will receive detailed after-care instructions to ensure smooth healing.",
      "Patients from across the Dum Dum, Shyamnagar, and Dumdum Cantonment areas choose ToothZone for tooth extractions because of our gentle approach, affordable pricing, and the reassurance of having an experienced dental team handle their procedure.",
    ],
    benefits: ["Painless with effective local anaesthesia", "Wisdom tooth extraction specialists", "Emergency extraction available", "Proper post-extraction care protocol", "Affordable pricing near Dum Dum", "Sterile, safe instruments", "Quick 20–40 minute procedure", "Follow-up care included"],
    faqs: buildFaqs("tooth extraction", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    heroImageAlt: "Painless tooth extraction near Dum Dum at ToothZone Madhyamgram",
  },
  {
    slug: "teeth-scaling-madhyamgram",
    title: "Teeth Scaling & Cleaning in Madhyamgram (₹600 Onwards) | ToothZone",
    metaDescription: "Professional teeth scaling and cleaning in Madhyamgram at ToothZone. Remove plaque, tartar & stains. Prevent gum disease. Book your cleaning today!",
    keywords: "teeth scaling madhyamgram, teeth cleaning madhyamgram, dental cleaning near dum dum, plaque removal madhyamgram, gum treatment madhyamgram",
    canonical: "https://thetoothzone.vercel.app/teeth-scaling-madhyamgram",
    h1: "Professional Teeth Scaling & Cleaning in Madhyamgram",
    location: "Madhyamgram",
    service: "Teeth Scaling & Cleaning",
    heroDesc: "Prevent gum disease and maintain a healthy smile with professional teeth scaling and cleaning at ToothZone Madhyamgram. Removes stubborn plaque, tartar, and stains in a single comfortable session.",
    aboutContent: [
      "Professional teeth scaling (dental cleaning) is one of the most important preventive dental treatments you can get. At ToothZone Madhyamgram, our skilled dental hygienists use ultrasonic scalers and hand instruments to thoroughly remove plaque, tartar, and superficial stains from all surfaces of your teeth — including below the gum line where a toothbrush can never reach.",
      "Regular scaling at our Madhyamgram clinic every 6 months significantly reduces your risk of gum disease (periodontitis), prevents cavities, eliminates bad breath, and keeps your smile looking its healthiest. The procedure typically takes 30–60 minutes and involves little to no discomfort.",
      "Patients from Madhyamgram, Dum Dum, and surrounding areas choose ToothZone for their regular scaling appointments because of our gentle technique, modern ultrasonic equipment, and affordable pricing.",
    ],
    benefits: ["Ultrasonic scaling for thorough cleaning", "Removes tartar, plaque & stains", "Prevents gum disease & bad breath", "30–60 minute comfortable session", "Recommended every 6 months", "Freshens your breath instantly", "Non-invasive preventive treatment", "Affordable pricing in Madhyamgram"],
    faqs: buildFaqs("teeth scaling & cleaning", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    heroImageAlt: "Professional teeth scaling in Madhyamgram at ToothZone dental clinic",
  },
  {
    slug: "dental-implants-madhyamgram",
    title: "Dental Implants in Madhyamgram (Permanent, Affordable) | ToothZone",
    metaDescription: "Get premium dental implants in Madhyamgram at ToothZone. Permanent tooth replacement with titanium implants. Affordable price, expert team. Book now!",
    keywords: "dental implants madhyamgram, tooth implant madhyamgram, dental implant cost madhyamgram, implant dentist near dum dum, permanent tooth replacement madhyamgram",
    canonical: "https://thetoothzone.vercel.app/dental-implants-madhyamgram",
    h1: "Dental Implants in Madhyamgram — Permanent Tooth Replacement",
    location: "Madhyamgram",
    service: "Dental Implants",
    heroDesc: "Replace missing teeth permanently with high-quality titanium dental implants at ToothZone Madhyamgram. Natural-looking, lifetime-lasting results at affordable prices. Serving Dum Dum & North Kolkata.",
    aboutContent: [
      "Dental implants are the gold standard for replacing missing teeth, and ToothZone Madhyamgram is proud to offer affordable, high-quality implant treatment to patients across the Madhyamgram and Dum Dum areas. Our implants use medical-grade titanium that fuses with your jawbone, creating a permanent, stable foundation for a natural-looking artificial tooth.",
      "Unlike dentures that can slip or bridges that require grinding adjacent teeth, dental implants at our Madhyamgram clinic are designed to last a lifetime with proper care. They preserve your jawbone structure, restore your chewing ability fully, and are virtually indistinguishable from your natural teeth.",
      "We offer single-tooth implants, multiple implants, and full arch implant solutions (All-on-4). Our implant consultations are thorough — including 3D imaging assessment and a detailed treatment plan — so you always know exactly what to expect before committing to treatment.",
    ],
    benefits: ["Medical-grade titanium implants", "Permanent, lifetime-lasting results", "Looks and feels like natural teeth", "Preserves jawbone structure", "Single tooth to full arch options", "3D imaging for precise placement", "Affordable vs central Kolkata prices", "Expert implantologist in Madhyamgram"],
    faqs: buildFaqs("dental implants", "Madhyamgram"),
    heroImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    heroImageAlt: "Dental implants in Madhyamgram - permanent tooth replacement at ToothZone",
  },
  {
    slug: "emergency-dentist-madhyamgram",
    title: "Emergency Dentist Madhyamgram — Same-Day Appointment | ToothZone",
    metaDescription: "Need an emergency dentist in Madhyamgram? ToothZone offers same-day emergency dental appointments for tooth pain, broken teeth & more. Call now!",
    keywords: "emergency dentist madhyamgram, emergency dental clinic madhyamgram, tooth pain madhyamgram, urgent dentist near dum dum, emergency toothache treatment madhyamgram",
    canonical: "https://thetoothzone.vercel.app/emergency-dentist-madhyamgram",
    h1: "Emergency Dentist in Madhyamgram — Same-Day Appointments",
    location: "Madhyamgram",
    service: "Emergency Dental Treatment",
    heroDesc: "Suffering from severe tooth pain in Madhyamgram? ToothZone offers same-day emergency dental appointments. Don't suffer — call us immediately for urgent tooth pain, broken teeth, or lost fillings.",
    aboutContent: [
      "Dental emergencies don't wait for convenient appointment slots. When you are experiencing severe tooth pain, a broken tooth, a lost crown, or a dental injury in Madhyamgram or Dum Dum, ToothZone Dental Clinic is ready to help with same-day emergency appointments.",
      "Our Madhyamgram emergency dental services cover: severe toothache, cracked or knocked-out teeth, dental abscess, broken fillings or crowns, swollen gums, and orthodontic wire injuries. We prioritise emergency patients to ensure you receive prompt relief.",
      "Don't resort to painkillers and hope the pain goes away. Untreated dental emergencies in Madhyamgram can escalate into serious infections that spread to surrounding teeth and even systemic health issues. Call ToothZone immediately — our experienced team will see you as soon as possible.",
    ],
    benefits: ["Same-day emergency appointments", "Tooth pain relief — fast", "Broken & knocked-out tooth treatment", "Dental abscess drainage", "Lost fillings & crowns replaced", "Experienced emergency dental team", "Serving Dum Dum & Madhyamgram", "Call us any time during clinic hours"],
    faqs: buildFaqs("emergency dental treatment", "Madhyamgram"),
    heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    heroImageAlt: "Emergency dentist in Madhyamgram - ToothZone same day dental care",
  },
  {
    slug: "pediatric-dentist-dum-dum",
    title: "Kids Dentist Near Dum Dum (Gentle & Fun) | ToothZone",
    metaDescription: "Find the best pediatric dentist near Dum Dum at ToothZone Madhyamgram. Gentle, child-friendly dental care for toddlers to teens. Book today!",
    keywords: "pediatric dentist dum dum, kids dentist near dum dum, children dentist madhyamgram, child dental clinic near dum dum, baby teeth care madhyamgram",
    canonical: "https://thetoothzone.vercel.app/pediatric-dentist-dum-dum",
    h1: "Pediatric Dentist Near Dum Dum — Child-Friendly Care",
    location: "Dum Dum",
    service: "Pediatric Dentistry",
    heroDesc: "Give your child the best dental start with gentle, child-friendly pediatric dentistry at ToothZone Madhyamgram — the nearest kids dentist to Dum Dum. Fun, fear-free appointments for toddlers to teenagers.",
    aboutContent: [
      "Finding a trustworthy, gentle pediatric dentist near Dum Dum can feel challenging. ToothZone Dental Clinic in Madhyamgram is the answer — a child-friendly dental practice where your little ones feel safe, comfortable, and even excited about dental visits.",
      "Our pediatric dental team is experienced in treating children from as young as 18 months up to teenagers. We focus on preventive care — teaching children good brushing and flossing habits, applying sealants and fluoride treatments, and addressing early orthodontic concerns before they become bigger problems.",
      "We understand that a child's early dental experiences shape their relationship with dental care for life. That is why at ToothZone near Dum Dum, we invest time in making every child feel safe and at ease — using gentle techniques, a warm environment, and patience-first communication.",
    ],
    benefits: ["Child-friendly, fear-free environment", "Experienced paediatric dental team", "Preventive focus — sealants & fluoride", "Early orthodontic assessment", "Gentle anaesthesia for anxious kids", "Serving age 18 months to teenagers", "20–25 min from Dum Dum", "Parent education on home oral care"],
    faqs: buildFaqs("paediatric dentistry", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
    heroImageAlt: "Pediatric dentist near Dum Dum - child-friendly dental care at ToothZone Madhyamgram",
  },
  // ── 12 NEW PROGRAMMATIC PAGES ──────────────────────────────────────────────
  {
    slug: "cavity-treatment-madhyamgram",
    title: "Cavity Treatment in Madhyamgram (Painless Fillings) | ToothZone",
    metaDescription: "Get painless cavity treatment in Madhyamgram at ToothZone Dental Clinic. Tooth-coloured fillings, same-day treatment. Serving Dum Dum & North Kolkata.",
    keywords: "cavity treatment madhyamgram, tooth decay madhyamgram, dental cavity near dum dum, tooth decay filling madhyamgram",
    canonical: "https://thetoothzone.vercel.app/cavity-treatment-madhyamgram",
    h1: "Cavity Treatment in Madhyamgram — Painless Tooth Fillings",
    location: "Madhyamgram",
    service: "Cavity & Dental Decay Treatment",
    heroDesc: "Detect and treat tooth decay early at ToothZone Madhyamgram. Painless cavity treatment with tooth-coloured composite fillings that look completely natural. Same-day treatment available.",
    aboutContent: [
      "Dental cavities are the most common problem affecting patients in Madhyamgram and Dum Dum. Early treatment with tooth-coloured composite fillings saves teeth and prevents the need for expensive root canal therapy later.",
      "At ToothZone Madhyamgram, we use premium composite resins that blend seamlessly with your natural tooth shade. Most cavities are filled comfortably in a single 30–45 minute visit under effective local anaesthesia.",
      "Located near Madhyamgram Chowmatha, our clinic serves patients from Dum Dum, Barasat, and all of North Kolkata. Regular 6-monthly check-ups ensure cavities are caught early when they are cheapest and easiest to treat.",
    ],
    benefits: ["Tooth-coloured composite fillings", "Painless with local anaesthesia", "Same-day treatment in 30–45 min", "No mercury, no silver fillings", "Early detection prevents root canal", "Affordable pricing in Madhyamgram", "Digital X-rays for accurate detection", "6-monthly reminder service"],
    faqs: buildFaqs("cavity & dental decay treatment", "Madhyamgram"),
    heroImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    heroImageAlt: "Cavity treatment in Madhyamgram - painless tooth filling at ToothZone",
  },
  {
    slug: "tooth-filling-dum-dum",
    title: "Tooth Filling Near Dum Dum (Same Day, Painless) | ToothZone",
    metaDescription: "Looking for tooth filling near Dum Dum? ToothZone Madhyamgram offers same-day, painless tooth-coloured fillings. Just 20 min away. Book today!",
    keywords: "tooth filling dum dum, dental filling near dum dum, composite filling dum dum, tooth filling near me dum dum",
    canonical: "https://thetoothzone.vercel.app/tooth-filling-dum-dum",
    h1: "Painless Tooth Filling Near Dum Dum — Same Day",
    location: "Dum Dum",
    service: "Tooth Filling",
    heroDesc: "Need a tooth filling near Dum Dum? ToothZone Dental Clinic in Madhyamgram is just 20 minutes away. Natural tooth-coloured fillings, painless procedure, same-day appointments.",
    aboutContent: [
      "If you are searching for 'tooth filling near Dum Dum', ToothZone Dental Clinic in Madhyamgram is your nearest and best option. We provide same-day composite (tooth-coloured) fillings completed in a single comfortable appointment, just 20 minutes from Dum Dum.",
      "Our filling procedure begins with gentle decay removal under local anaesthesia, precise shaping, composite layering, and LED curing. The entire process takes 30–45 minutes — leaving with a fully restored, natural-looking tooth.",
      "Tooth fillings at our Madhyamgram clinic are significantly more affordable than central Kolkata clinics, without any compromise on material quality. We use premium composite resins that are durable and long-lasting.",
    ],
    benefits: ["Just 20 min from Dum Dum", "Same-day tooth filling appointment", "Tooth-coloured natural finish", "Painless under local anaesthesia", "Affordable vs Kolkata city prices", "No mercury amalgam", "Durable, long-lasting material", "Walk-ins welcome"],
    faqs: buildFaqs("tooth filling", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    heroImageAlt: "Tooth filling near Dum Dum - same-day dental filling at ToothZone Madhyamgram",
  },
  {
    slug: "gum-treatment-madhyamgram",
    title: "Gum Disease Treatment in Madhyamgram (Expert Care) | ToothZone",
    metaDescription: "Expert gum disease treatment in Madhyamgram at ToothZone. Deep scaling, gum surgery & periodontal therapy. Prevent tooth loss. Book today!",
    keywords: "gum treatment madhyamgram, gum disease near dum dum, periodontal treatment madhyamgram, bleeding gums treatment madhyamgram",
    canonical: "https://thetoothzone.vercel.app/gum-treatment-madhyamgram",
    h1: "Gum Disease Treatment in Madhyamgram — Expert Periodontal Care",
    location: "Madhyamgram",
    service: "Gum Disease Treatment",
    heroDesc: "Bleeding gums? Loose teeth? Don't ignore it. ToothZone Madhyamgram provides expert gum disease treatment — deep scaling, antibiotics, and periodontal therapy — to save your teeth and restore oral health.",
    aboutContent: [
      "Gum disease (periodontitis) is one of the leading causes of tooth loss among adults in Madhyamgram. It begins as gingivitis and, if untreated, progresses to periodontitis — destroying the bone and tissue that hold your teeth in place. The danger: gum disease is usually painless in its early stages.",
      "At ToothZone Madhyamgram, our gum treatment protocol includes professional deep scaling (removing tartar below the gum line), root planing, antibiotic therapy, and in advanced cases, minor gum surgery. We also provide personalised home care instructions to prevent recurrence.",
      "Early signs to watch for: gums that bleed when brushing, red or swollen gums, receding gums, persistent bad breath, and loose teeth. If you notice any of these in Madhyamgram or Dum Dum, visit ToothZone immediately.",
    ],
    benefits: ["Deep scaling & root planing", "Antibiotic gum therapy", "Prevents tooth loss", "Treats bleeding & swollen gums", "Bad breath elimination", "Personalised home care plan", "Experienced periodontist in Madhyamgram", "Affordable treatment near Dum Dum"],
    faqs: buildFaqs("gum disease treatment", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    heroImageAlt: "Gum disease treatment in Madhyamgram - periodontal care at ToothZone",
  },
  {
    slug: "wisdom-tooth-removal-dum-dum",
    title: "Wisdom Tooth Removal Near Dum Dum (Painless) | ToothZone",
    metaDescription: "Get painless wisdom tooth removal near Dum Dum at ToothZone Madhyamgram. Impacted & normal extractions, same-day available. Expert care. Book now!",
    keywords: "wisdom tooth removal dum dum, wisdom tooth extraction near dum dum, impacted wisdom tooth madhyamgram, akkal daath removal dum dum",
    canonical: "https://thetoothzone.vercel.app/wisdom-tooth-removal-dum-dum",
    h1: "Wisdom Tooth Removal Near Dum Dum — Painless Same Day",
    location: "Dum Dum",
    service: "Wisdom Tooth Removal",
    heroDesc: "Suffering from wisdom tooth pain near Dum Dum? ToothZone Madhyamgram specialises in painless wisdom tooth removal — including impacted cases. Same-day and emergency appointments available.",
    aboutContent: [
      "Wisdom tooth pain is one of the most common dental emergencies for patients from Dum Dum and Madhyamgram. Impacted wisdom teeth — partially or fully stuck under the gum — cause intense pain, swelling, and infection if untreated.",
      "At ToothZone near Dum Dum, we perform wisdom tooth removals including complex impacted cases under effective local anaesthesia. The procedure is planned with digital X-rays to assess tooth position and roots before extraction. Most removals are completed in 30–60 minutes.",
      "After wisdom tooth removal at our Madhyamgram clinic, we provide comprehensive aftercare guidance including diet instructions, pain management, and a follow-up appointment to ensure proper healing.",
    ],
    benefits: ["Impacted wisdom tooth specialists", "Painless under local anaesthesia", "Digital X-ray before procedure", "Same-day emergency appointments", "30–60 min procedure", "Full after-care instructions", "Follow-up appointment included", "Serving Dum Dum & North Kolkata"],
    faqs: buildFaqs("wisdom tooth removal", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    heroImageAlt: "Wisdom tooth removal near Dum Dum - painless extraction at ToothZone Madhyamgram",
  },
  {
    slug: "smile-design-madhyamgram",
    title: "Smile Design & Makeover in Madhyamgram | ToothZone Cosmetic",
    metaDescription: "Complete smile makeover in Madhyamgram at ToothZone. Veneers, whitening, contouring & composite bonding. Transform your smile. Book now!",
    keywords: "smile design madhyamgram, smile makeover near dum dum, veneers madhyamgram, cosmetic dentist madhyamgram, dental veneers dum dum",
    canonical: "https://thetoothzone.vercel.app/smile-design-madhyamgram",
    h1: "Smile Design & Full Smile Makeover in Madhyamgram",
    location: "Madhyamgram",
    service: "Smile Design & Makeover",
    heroDesc: "Transform your smile completely at ToothZone Madhyamgram. Veneers, whitening, contouring, and composite bonding — digitally planned for your face. Serving Dum Dum & North Kolkata.",
    aboutContent: [
      "Smile design at ToothZone Madhyamgram starts with a digital consultation — assessing your face shape, tooth proportions, gum line, and aesthetic goals — before designing a personalised treatment plan.",
      "A smile makeover may include: porcelain or composite veneers, professional whitening, gum contouring, composite bonding for chips and gaps, and dental crowns for severely damaged teeth. All combined to achieve your ideal smile.",
      "Patients from Dum Dum, Barasat, and across West Bengal choose ToothZone for smile design because we combine international cosmetic techniques with truly affordable pricing — bringing premium cosmetic dentistry to Madhyamgram.",
    ],
    benefits: ["Digital smile design preview", "Veneers (porcelain & composite)", "Gum contouring", "Composite bonding", "Whitening included in makeovers", "Customised for your face shape", "Affordable cosmetic dentistry", "Serving Dum Dum & North Kolkata"],
    faqs: buildFaqs("smile design & makeover", "Madhyamgram"),
    heroImage: "https://images.unsplash.com/photo-1581585837449-0bfc2b21b03c?w=800&q=80",
    heroImageAlt: "Smile design and smile makeover in Madhyamgram at ToothZone cosmetic dentistry",
  },
  {
    slug: "dentures-madhyamgram",
    title: "Dentures in Madhyamgram (Full & Partial, Affordable) | ToothZone",
    metaDescription: "Get affordable full or partial dentures in Madhyamgram at ToothZone. Natural-looking, comfortable fit. Serving Dum Dum & North Kolkata. Book now!",
    keywords: "dentures madhyamgram, full dentures near dum dum, partial dentures madhyamgram, false teeth madhyamgram, removable dentures near dum dum",
    canonical: "https://thetoothzone.vercel.app/dentures-madhyamgram",
    h1: "Full & Partial Dentures in Madhyamgram — Comfortable & Natural",
    location: "Madhyamgram",
    service: "Dentures (Full & Partial)",
    heroDesc: "Replace missing teeth with comfortable, natural-looking dentures at ToothZone Madhyamgram. Full dentures, partial dentures, and immediate dentures — all custom-made for you.",
    aboutContent: [
      "Missing teeth affect your ability to chew, speak, and maintain facial structure. Dentures remain one of the most accessible and cost-effective ways to restore a complete smile for patients in Madhyamgram and Dum Dum.",
      "At ToothZone Madhyamgram, we provide both full dentures (no remaining teeth) and partial dentures (some natural teeth remaining). All dentures are custom-fabricated using high-quality acrylic resins and porcelain teeth that mimic natural appearance and colour.",
      "Getting dentures at our Madhyamgram clinic involves 3–5 visits over 2–3 weeks: impressions, bite registration, try-in fitting, and final delivery. We provide detailed instructions on care, adjustment, and adhesive use.",
    ],
    benefits: ["Custom-made to your mouth shape", "Natural tooth colour matching", "Full & partial denture options", "Immediate dentures available", "Comfortable fit with adjustments", "Affordable vs dental implants", "3–5 visit process", "After-care and maintenance guidance"],
    faqs: buildFaqs("dentures", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    heroImageAlt: "Dentures in Madhyamgram - full and partial dentures at ToothZone dental clinic",
  },
  {
    slug: "bad-breath-treatment-madhyamgram",
    title: "Bad Breath Treatment in Madhyamgram (Permanent Fix) | ToothZone",
    metaDescription: "Get permanent bad breath treatment in Madhyamgram at ToothZone. Diagnose & fix the dental root cause. Serving Dum Dum & North Kolkata.",
    keywords: "bad breath treatment madhyamgram, halitosis treatment near dum dum, bad breath dentist madhyamgram, chronic bad breath near me",
    canonical: "https://thetoothzone.vercel.app/bad-breath-treatment-madhyamgram",
    h1: "Bad Breath Treatment in Madhyamgram — Permanent Solution",
    location: "Madhyamgram",
    service: "Bad Breath (Halitosis) Treatment",
    heroDesc: "Chronic bad breath is usually a dental problem, not just a hygiene issue. ToothZone Madhyamgram diagnoses and treats the root dental cause — gum disease, cavities, dry mouth — for a permanent solution.",
    aboutContent: [
      "Persistent bad breath (halitosis) is almost always caused by an underlying dental issue. For patients in Madhyamgram and Dum Dum, the most common dental causes include: advanced gum disease, untreated cavities, dental abscesses, dry mouth, and bacteria on the tongue.",
      "At ToothZone Madhyamgram, our bad breath treatment begins with a thorough examination to identify the exact cause. Treatment may include professional deep scaling, cavity treatment, gum therapy, and tongue cleaning instruction.",
      "Unlike temporary solutions like mouthwash, dental treatment at ToothZone Madhyamgram addresses the root cause of bad breath, providing long-lasting fresh breath and restored confidence.",
    ],
    benefits: ["Identifies the ROOT cause", "Professional scaling & debridement", "Gum disease treatment", "Cavity-related odour treatment", "Tongue cleaning guidance", "Long-lasting fresh breath", "Confidential, non-judgmental care", "Serving Madhyamgram & Dum Dum"],
    faqs: buildFaqs("bad breath treatment", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    heroImageAlt: "Bad breath treatment in Madhyamgram - halitosis treatment at ToothZone",
  },
  {
    slug: "teeth-sensitivity-treatment-dum-dum",
    title: "Tooth Sensitivity Treatment Near Dum Dum | ToothZone",
    metaDescription: "Get tooth sensitivity treatment near Dum Dum at ToothZone Madhyamgram. Pain from hot/cold? We fix it permanently. Same-day treatment. Book now!",
    keywords: "teeth sensitivity treatment dum dum, sensitive teeth near dum dum, hot cold pain teeth dum dum, tooth sensitivity madhyamgram",
    canonical: "https://thetoothzone.vercel.app/teeth-sensitivity-treatment-dum-dum",
    h1: "Tooth Sensitivity Treatment Near Dum Dum — Fast Relief",
    location: "Dum Dum",
    service: "Tooth Sensitivity Treatment",
    heroDesc: "Sharp pain when drinking cold water near Dum Dum? Tooth sensitivity is treatable. ToothZone Madhyamgram identifies the cause and provides fast, effective, long-lasting relief — just 20 mins from Dum Dum.",
    aboutContent: [
      "Tooth sensitivity is one of the most common dental complaints from patients visiting ToothZone from Dum Dum. The sharp, stabbing pain triggered by cold water, hot drinks, or sweet foods can make eating miserable — but it is very treatable.",
      "The most common causes include: enamel erosion, exposed tooth roots due to gum recession, teeth grinding, cracked teeth, and post-filling sensitivity. At ToothZone Madhyamgram, we pinpoint the exact cause with digital X-rays and clinical examination.",
      "Treatment may include desensitising agent application, fluoride varnish, dental bonding over exposed roots, gum graft for recession, or a mouth night guard for grinding. Many patients experience significant relief in a single appointment.",
    ],
    benefits: ["Fast, same-day relief possible", "Clinical diagnosis of cause", "Desensitising treatments", "Fluoride varnish application", "Night guard for grinding", "Bonding for exposed roots", "20 min from Dum Dum", "Affordable sensitivity treatment"],
    faqs: buildFaqs("tooth sensitivity treatment", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    heroImageAlt: "Tooth sensitivity treatment near Dum Dum at ToothZone Madhyamgram",
  },
  {
    slug: "teeth-grinding-treatment-dum-dum",
    title: "Teeth Grinding (Bruxism) Treatment Near Dum Dum | ToothZone",
    metaDescription: "Grinding teeth at night near Dum Dum? ToothZone Madhyamgram treats bruxism with custom night guards. Protect your teeth. Book now!",
    keywords: "teeth grinding treatment dum dum, bruxism near dum dum, night guard madhyamgram, jaw clenching treatment dum dum",
    canonical: "https://thetoothzone.vercel.app/teeth-grinding-treatment-dum-dum",
    h1: "Teeth Grinding (Bruxism) Treatment Near Dum Dum",
    location: "Dum Dum",
    service: "Teeth Grinding (Bruxism) Treatment",
    heroDesc: "Waking up with jaw pain or headaches near Dum Dum? You may be grinding your teeth at night. ToothZone Madhyamgram provides custom-fitted night guards and bruxism treatment to protect your teeth permanently.",
    aboutContent: [
      "Teeth grinding (bruxism) during sleep is more common in Dum Dum and Madhyamgram than most people realise. It causes progressive enamel wear, jaw joint pain (TMJ), morning headaches, and in severe cases, cracked teeth requiring expensive treatment.",
      "At ToothZone near Dum Dum, we diagnose bruxism through examination of tooth wear patterns, jaw muscle tenderness, and patient history. The primary treatment is a custom-fitted hard acrylic night guard — worn while sleeping — that cushions and prevents grinding damage.",
      "Our Madhyamgram clinic also addresses stress-related bruxism through lifestyle guidance, and where grinding has caused damage, we repair worn teeth with crowns or composite restorations.",
    ],
    benefits: ["Custom-fitted night guard", "Relieves jaw pain & headaches", "Prevents tooth wear & cracking", "TMJ disorder treatment", "Durable acrylic appliance", "Tooth restoration if damaged", "20 min from Dum Dum", "Expert diagnosis at Madhyamgram"],
    faqs: buildFaqs("teeth grinding (bruxism) treatment", "Dum Dum"),
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    heroImageAlt: "Teeth grinding bruxism treatment near Dum Dum - night guard at ToothZone Madhyamgram",
  },
  {
    slug: "dental-checkup-madhyamgram",
    title: "Dental Check-up & Consultation in Madhyamgram | ToothZone",
    metaDescription: "Book a comprehensive dental check-up in Madhyamgram at ToothZone. Same-day consultation, digital X-rays, full oral health assessment. Affordable.",
    keywords: "dental checkup madhyamgram, dental consultation madhyamgram, dental examination near dum dum, routine dental visit madhyamgram",
    canonical: "https://thetoothzone.vercel.app/dental-checkup-madhyamgram",
    h1: "Dental Check-up & Consultation in Madhyamgram",
    location: "Madhyamgram",
    service: "Dental Check-up & Consultation",
    heroDesc: "Book a comprehensive dental check-up at ToothZone Madhyamgram. Digital X-rays, full oral health assessment, early problem detection, and personalised treatment plan — all in one affordable visit.",
    aboutContent: [
      "A dental check-up every 6 months is the single most important thing you can do for your oral health. At ToothZone Madhyamgram, our comprehensive consultation includes: visual examination of all teeth and gums, digital X-ray assessment, oral cancer screening, gum health assessment, and a personalised treatment plan.",
      "Early detection saves teeth and money. A small cavity caught during a regular check-up at ToothZone Madhyamgram costs a fraction of what a root canal or extraction would cost if the same cavity is left to progress.",
      "Located near Madhyamgram Chowmatha, our consultations are available 6 days a week with both morning and evening slots. Easily accessible from Dum Dum, Barasat, and Bangaon.",
    ],
    benefits: ["Comprehensive oral health assessment", "Digital X-rays (low radiation)", "Oral cancer screening", "Gum health evaluation", "Personalised treatment plan", "Same-day results", "6-monthly reminder service", "Walk-ins welcome in Madhyamgram"],
    faqs: buildFaqs("dental check-up & consultation", "Madhyamgram"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png",
    heroImageAlt: "Dental check-up and consultation in Madhyamgram at ToothZone dental clinic",
  },
  {
    slug: "affordable-dental-clinic-kolkata-north",
    title: "Most Affordable Dental Clinic Near North Kolkata | ToothZone",
    metaDescription: "Looking for affordable dental care near North Kolkata? ToothZone Madhyamgram offers premium dental treatment at half the Kolkata city price. Book now!",
    keywords: "affordable dental clinic north kolkata, cheap dentist north kolkata, budget dental clinic near kolkata, dental clinic north 24 parganas",
    canonical: "https://thetoothzone.vercel.app/affordable-dental-clinic-kolkata-north",
    h1: "Most Affordable Dental Clinic Near North Kolkata — ToothZone",
    location: "North Kolkata",
    service: "Affordable Full-Service Dental Care",
    heroDesc: "Premium dental care at genuinely affordable prices in Madhyamgram — serving all of North Kolkata, Dum Dum, Barasat, and North 24 Parganas. Same quality as Kolkata city clinics at 30–40% less cost.",
    aboutContent: [
      "If you live anywhere in North Kolkata — Dum Dum, Barasat, Madhyamgram, Bangaon, Shyamnagar — you don't need to travel to Salt Lake or Park Street for quality dental care. ToothZone Dental Clinic brings premium urban-standard dental care to Madhyamgram at 30–40% less than Kolkata city prices.",
      "We offer the full range of modern dental treatments: root canal, implants, whitening, braces, smile design, paediatric dentistry, and emergency care — using the same technology and materials as the best city clinics.",
      "ToothZone is easily reachable from Dum Dum (20 min), Barasat (15 min), Bangaon (30 min), and Shyamnagar (25 min). Our clinic is located near Madhyamgram Chowmatha with convenient transport links.",
    ],
    benefits: ["30–40% less than Kolkata city prices", "Same quality & materials", "BDS & MDS qualified dentists", "Full-service: no referrals needed", "Easy from Dum Dum, Barasat, Bangaon", "Digital X-rays & modern equipment", "Open 6 days including evenings", "Emergency dental care available"],
    faqs: buildFaqs("affordable dental care", "North Kolkata"),
    heroImage: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png",
    heroImageAlt: "Most affordable dental clinic near North Kolkata - ToothZone Madhyamgram",
  },
  {
    slug: "dental-crown-bridge-madhyamgram",
    title: "Dental Crown & Bridge in Madhyamgram (Affordable) | ToothZone",
    metaDescription: "Get high-quality dental crowns and bridges in Madhyamgram at ToothZone. Metal, PFM & zirconia crowns. Affordable pricing near Dum Dum. Book today!",
    keywords: "dental crown madhyamgram, dental bridge madhyamgram, zirconia crown near dum dum, tooth cap madhyamgram, crown after root canal madhyamgram",
    canonical: "https://thetoothzone.vercel.app/dental-crown-bridge-madhyamgram",
    h1: "Dental Crowns & Bridges in Madhyamgram — Restore Your Smile",
    location: "Madhyamgram",
    service: "Dental Crown & Bridge",
    heroDesc: "Restore damaged or missing teeth with high-quality dental crowns and bridges at ToothZone Madhyamgram. Metal, PFM, and premium zirconia options — customised for natural appearance. Serving Dum Dum & North Kolkata.",
    aboutContent: [
      "Dental crowns completely cover a damaged, weakened, or root canal-treated tooth, restoring its shape, strength, and appearance. Dental bridges use adjacent teeth as anchors to replace missing teeth with fixed artificial replacements. Both are among the most commonly performed procedures at ToothZone Madhyamgram.",
      "We offer multiple materials for our Madhyamgram and Dum Dum patients: metal crowns (most durable, back teeth), PFM crowns (metal with porcelain coating, good balance), and full zirconia crowns (strongest ceramic, completely natural-looking — our most popular).",
      "Crown or bridge placement at our Madhyamgram clinic typically takes 2 visits over 1–2 weeks. We use precise shade matching to ensure your crown blends perfectly with surrounding teeth.",
    ],
    benefits: ["Zirconia, PFM & metal options", "Natural-looking shade matching", "2-visit process", "Root canal post-treatment crowns", "Long-lasting 10–15 year lifespan", "Bridges for missing teeth", "Affordable pricing in Madhyamgram", "Serving Dum Dum & North Kolkata"],
    faqs: buildFaqs("dental crown & bridge", "Madhyamgram"),
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    heroImageAlt: "Dental crown and bridge in Madhyamgram - zirconia crown at ToothZone",
  },
];

const generatedPages = generateProgrammaticPages();
const customSlugs = new Set(customProgrammaticPages.map((p) => p.slug));

export const programmaticPages: ProgrammaticPageData[] = [
  ...customProgrammaticPages,
  ...generatedPages.filter((p) => !customSlugs.has(p.slug)),
];

// ─── Page Component ──────────────────────────────────────────────────────────

interface ProgrammaticPageProps {
  page: ProgrammaticPageData;
}

const ProgrammaticPage = ({ page }: ProgrammaticPageProps) => {
  const isDumDum = page.location.includes("Dum Dum");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": `ToothZone Dental Clinic — ${page.service} ${page.location}`,
    "description": page.metaDescription,
    "url": page.canonical,
    "address": { 
      "@type": "PostalAddress", 
      "streetAddress": isDumDum ? "Jessore Rd, Basak Bagan" : "9 No Railgate, Madhyamgram",
      "addressLocality": isDumDum ? "South Dumdum" : "Madhyamgram", 
      "addressRegion": "West Bengal", 
      "postalCode": isDumDum ? "700048" : "700130",
      "addressCountry": "IN" 
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": isDumDum ? "22.608571" : "22.702722",
      "longitude": isDumDum ? "88.395793" : "88.460868"
    },
    "areaServed": [page.location, "Madhyamgram", "Dum Dum", "Kolkata"],
    "priceRange": "₹₹",
    "openingHours": isDumDum 
      ? ["Mo-Sa 10:30-14:00", "Su 18:15-21:00"]
      : ["Mo-Sa 18:15-21:00"],
  };

  return (
    <Layout>
      <SEOHead
        title={page.title}
        description={page.metaDescription}
        canonical={page.canonical}
        keywords={page.keywords}
        schema={schema}
        faqSchema={page.faqs}
      />
      <PageTransition>

        {/* Hero */}
        <section className="relative section-padding gradient-hero overflow-hidden">
          <div className="container-dental">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{page.location}, West Bengal</span>
                </div>
                <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-5 leading-tight">
                  {page.h1}
                </h1>
                <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">{page.heroDesc}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact"><Button size="lg" className="rounded-full font-heading px-8">Book Appointment</Button></Link>
                  <a href="tel:+919804214790">
                    <Button size="lg" variant="outline" className="rounded-full font-heading px-8 gap-2">
                      <Phone className="w-4 h-4" /> Call Now
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <span className="text-sm text-muted-foreground">4.9★ — Trusted by patients in {page.location}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={page.heroImage}
                    alt={page.heroImageAlt}
                    className="w-full h-80 object-cover"
                    loading="eager"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="section-padding bg-background">
          <div className="container-dental max-w-4xl">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
                {page.service} at ToothZone — Serving {page.location}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {page.aboutContent.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-secondary/30">
          <div className="container-dental max-w-4xl">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-8 text-center">
                Why Choose ToothZone for {page.service}?
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {page.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Map Embed — Location Signal */}
        <section className="section-padding bg-background">
          <div className="container-dental">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-3 text-center">
                Find ToothZone — Near {page.location}
              </h2>
              <p className="text-center text-muted-foreground mb-6 text-sm">
                Located in Madhyamgram, near Madhyamgram Chowmatha — easily accessible from {page.location} by road or train
              </p>
            </ScrollReveal>
            <MapEmbed />
          </div>
        </section>

        <FAQAccordion faqs={page.faqs} title={`FAQs — ${page.service} near ${page.location}`} />

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-dental text-center">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold mb-4">Book Your Appointment Today</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                ToothZone Dental Clinic Madhyamgram — serving {page.location} &amp; all of North Kolkata.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Appointment</Button></Link>
                <a
                  href={page.location.includes("Dum Dum") 
                    ? "https://maps.app.goo.gl/7ZHCytdYZHkiDpKP8" 
                    : "https://maps.app.goo.gl/caB9HBPh61tJKgX36"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="rounded-full font-heading px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <MapPin className="w-4 h-4 mr-2" /> Directions
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </PageTransition>
    </Layout>
  );
};

export default ProgrammaticPage;
