import Layout from "@/components/layout/Layout";
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
  </Layout>
);

export default Index;
