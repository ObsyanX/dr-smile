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
      title="SmileCare Dental Clinic — Premium Dental Care"
      description="Advanced dental care with modern technology and compassionate treatment. Book your appointment for dental implants, teeth whitening, braces, and more."
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
