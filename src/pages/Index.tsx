import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EmergencyGuideSection from '@/components/home/EmergencyGuideSection';
import TeamPreviewSection from '@/components/home/TeamPreviewSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Vet Option Timișoara | Cabinet Veterinar Urgențe NON STOP 24/7</title>
        <meta 
          name="description" 
          content="Cabinet medical veterinar în Timișoara cu urgențe NON STOP. Chirurgie avansată, ATI, ortopedie și neurochirurgie pentru câini și pisici. Sună acum: +40 723 143 405" 
        />
        <meta name="keywords" content="cabinet veterinar Timișoara, urgențe veterinare NON STOP, chirurgie veterinară, ATI veterinar, ortopedie câini pisici" />
        <link rel="canonical" href="https://vetoption.ro" />
      </Helmet>
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
