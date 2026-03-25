import { FAQItem } from "@/components/shared/FAQAccordion";
import { ProgrammaticPageData } from "@/pages/ProgrammaticPage";

const LOCATIONS = ["Madhyamgram", "Dum Dum", "Barasat", "New Town", "Sodepur"];

const SERVICES = [
  { id: "cavity-treatment", name: "Cavity Treatment", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png" },
  { id: "tooth-filling", name: "Tooth Filling", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png" },
  { id: "gum-treatment", name: "Gum Treatment", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774446256/ChatGPT_Image_Mar_25_2026_07_13_57_PM_jn8rx5.png" },
  { id: "wisdom-tooth-removal", name: "Wisdom Tooth Removal", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774446256/ChatGPT_Image_Mar_25_2026_07_13_57_PM_jn8rx5.png" },
  { id: "pediatric-dentistry", name: "Pediatric Dentistry", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774445606/ChatGPT_Image_Mar_25_2026_07_03_03_PM_u6xy4h.png" },
  { id: "smile-makeover", name: "Smile Makeover", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774445225/ChatGPT_Image_Mar_25_2026_06_56_37_PM_aitkt0.png" },
  { id: "dental-veneers", name: "Dental Veneers", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774446952/ChatGPT_Image_Mar_25_2026_07_25_35_PM_ddlvdh.png" },
  { id: "invisible-aligners", name: "Invisible Aligners", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774444854/ChatGPT_Image_Mar_25_2026_06_50_28_PM_fzivhx.png" },
  { id: "emergency-dentist", name: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774447246/WhatsApp_Image_2026-03-24_at_11.24.27_AM_seaivg.jpg" },
  { id: "full-mouth-rehab", name: "Full Mouth Rehabilitation", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774447120/ChatGPT_Image_Mar_25_2026_07_28_00_PM_ydo6ff.png" },
  { id: "root-canal-treatment", name: "Root Canal Treatment", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774444304/Before_and_after_root_canal_treatment_oyqcxh.png" },
  { id: "dental-implants", name: "Dental Implants", img: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774444125/45991c19-590a-4e4a-8ff9-f0f9a8b987d0_lhbsf1.png" },
];

const buildFaqs = (service: string, location: string, clinic: string): FAQItem[] => [
  {
    question: `Is there a good ${service} specialist near ${location}?`,
    answer: `Yes! ToothZone Dental Clinic in ${clinic} is the premier facility extending premium ${service} to patients from ${location}.`,
  },
  {
    question: `What is the cost of ${service} near ${location}?`,
    answer: `The cost of ${service} at ToothZone depends on your specific clinical requirements. We offer transparent and highly competitive pricing—making it significantly more affordable than city-center clinics while retaining premium standards.`,
  },
  {
    question: `Is ${service} painful?`,
    answer: `Not at all! At ToothZone, procedures like ${service} are performed utilizing modern local anesthesia protocols and painless rotary instruments, ensuring your comfort throughout the entire journey.`,
  },
  {
    question: `How far is ToothZone from ${location}?`,
    answer: `ToothZone Dental Clinic is positioned centrally in ${clinic}, just a brief commute from ${location} by road, train, or auto-rickshaw.`,
  },
  {
    question: `Can I book an emergency appointment for ${service} near ${location}?`,
    answer: `Absolutely. We process emergency and same-day priority appointments for urgent dental requirements like ${service} cases. Please call our clinic immediately for quick assistance.`,
  },
];

export const generateProgrammaticPages = (): ProgrammaticPageData[] => {
  const pages: ProgrammaticPageData[] = [];

  for (const location of LOCATIONS) {
    for (const service of SERVICES) {
      const isDumDum = location === "Dum Dum";
      const nearestClinic = isDumDum ? "Dum Dum" : "Madhyamgram";
      const slug = `${service.id}-${location.toLowerCase().replace(/\s+/g, "-")}`;
      const title = `${service.name} in ${location} | Best Dentist | ToothZone`;
      const metaDescription = `Looking for the best ${service.name} in ${location}? ToothZone Dental Clinic in ${nearestClinic} provides affordable, painless, and premium level ${service.name}. Book an appointment today!`;
      const keywords = `${service.name.toLowerCase()} in ${location.toLowerCase()}, best ${service.name.toLowerCase()} ${location.toLowerCase()}, dental clinic near ${location.toLowerCase()}, dentist ${location.toLowerCase()}`;

      pages.push({
        slug,
        title,
        metaDescription,
        keywords,
        canonical: `https://thetoothzone.vercel.app/${slug}`,
        h1: `${service.name} Near ${location}`,
        location: location,
        service: service.name,
        heroDesc: `ToothZone Dental Clinic is your trusted partner for premium ${service.name} in the ${location} area. We combine advanced technology with deeply empathetic patient care.`,
        aboutContent: [
          `When residents of ${location} search for a highly reputable and exceptionally skilled solution for ${service.name}, ToothZone Dental Clinic is consistently the top choice. Our advanced clinical facility located in ${nearestClinic} caters to a wide spectrum of specialized dental needs—uniquely tailored for you and your family.`,
          `Our elite team of BDS and highly experienced MDS specialists utilize state-of-the-art diagnostic tools like digital OPG X-rays and precisely calibrated instruments to perform flawless ${service.name}. At ToothZone, patient safety, total comfort, and rigorous ISO-grade instrument sterilization protocols always come first.`,
          `You no longer need to travel into the heavy traffic of central Kolkata to receive world-class ${service.name}. Our clinic provides flexible evening slots and weekend schedules, ensuring you can prioritize your oral health without disrupting your busy daily routine.`
        ],
        benefits: [
          `Painless ${service.name} with advanced anaesthesia`,
          `Highly experienced MDS specialists`,
          `Modern diagnostic tools & X-Rays`,
          `Strict ISO-grade instrument sterilization`,
          `Transparent & affordable pricing models`,
          `Evening and weekend appointments available`,
          `Immediate emergency dental slots`,
          isDumDum ? `Located directly in ${location}` : `Just a short drive from ${location}`
        ],
        faqs: buildFaqs(service.name, location, nearestClinic),
        heroImage: service.img,
        heroImageAlt: `${service.name} in ${location} - ToothZone Dental Clinic`,
      });
    }
  }

  return pages;
};
