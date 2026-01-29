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
        <title>Vet Option Timișoara | Clinica Veterinară Urgențe ON CALL 24/7</title>
        <meta 
          name="description" 
          content="Clinică medicală veterinară în Timișoara cu urgențe ON CALL 24/7. Chirurgie avansată, ATI, ortopedie și neurochirurgie pentru câini și pisici. Sună acum: +40 723 143 405" 
        />
        <meta name="keywords" content="clinică veterinară Timișoara, urgențe veterinare ON CALL 24/7, chirurgie veterinară, ATI veterinar, ortopedie câini pisici" />
        <link rel="canonical" href="https://clinica-veterinara-timisoara.ro/" />
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
