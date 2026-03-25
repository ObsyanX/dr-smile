import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TrustStats from "@/components/home/TrustStats";
import ServicesPreview from "@/components/home/ServicesPreview";
import SmileTransformations from "@/components/home/SmileTransformations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TechnologyGrid from "@/components/home/TechnologyGrid";
import Testimonials from "@/components/home/Testimonials";
import EmergencyBanner from "@/components/home/EmergencyBanner";
import ClinicLocations from "@/components/home/ClinicLocations";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => (
  <Layout>
    <SEOHead
      title="Best Dental Clinic in Madhyamgram | ToothZone Dental Care"
      description="ToothZone Dental Clinic — best dental clinic in Madhyamgram & Dum Dum. Root canal, teeth whitening, braces, implants & more. Affordable & painless. Book your appointment today!"
      canonical="https://thetoothzone.vercel.app/"
      keywords="dental clinic madhyamgram, dentist dum dum, root canal madhyamgram, teeth whitening dum dum, best dentist near me, dental implants madhyamgram, braces madhyamgram, emergency dentist madhyamgram"
    />
    <PageTransition>
      <HeroSection />
      <TrustStats />
      <ServicesPreview />
      <SmileTransformations />
      <WhyChooseUs />
      <TechnologyGrid />
      <Testimonials />
      <EmergencyBanner />
      <ClinicLocations />
      <FAQSection />
      <FinalCTA />
    </PageTransition>
  </Layout>
);

export default Index;
