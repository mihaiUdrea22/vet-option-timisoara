import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EmergencyGuideSection from '@/components/home/EmergencyGuideSection';
import TeamPreviewSection from '@/components/home/TeamPreviewSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';

const HOME_TITLE = 'Vet Option Timișoara | Clinica Veterinară Urgențe ON CALL 24/7';
const HOME_DESCRIPTION =
  'Clinică medicală veterinară în Timișoara cu urgențe ON CALL 24/7. Chirurgie avansată, ATI, ortopedie și neurochirurgie pentru câini și pisici. Sună acum: +40 723 143 405';

export default function Index() {
  return (
    <>
      <PageSEO
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        keywords="clinică veterinară Timișoara, urgențe veterinare ON CALL 24/7, chirurgie veterinară, ATI veterinar, ortopedie câini pisici"
      />
      <Layout>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <EmergencyGuideSection />
        <TeamPreviewSection />
        <BlogPreviewSection />
        <GalleryPreviewSection />
      </Layout>
    </>
  );
}
