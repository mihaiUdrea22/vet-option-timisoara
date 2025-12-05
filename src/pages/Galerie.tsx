import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop', alt: 'Câine fericit la cabinet veterinar' },
  { src: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop', alt: 'Pisică la consultație' },
  { src: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=600&fit=crop', alt: 'Câine zâmbitor' },
  { src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=600&fit=crop', alt: 'Câine și pisică împreună' },
  { src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop', alt: 'Pisică după tratament' },
  { src: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=600&h=600&fit=crop', alt: 'Cabinet veterinar modern' },
  { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop', alt: 'Câini la plimbare' },
  { src: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop', alt: 'Pisică la control' },
  { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop', alt: 'Golden Retriever fericit' },
  { src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop', alt: 'Pisică portocalie' },
  { src: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=600&fit=crop', alt: 'Pisică la consultație veterinară' },
  { src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=600&fit=crop', alt: 'Câine la clinică' },
];

export default function Galerie() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Galerie Foto | Vet Option Timișoara - Cabinet Veterinar</title>
        <meta 
          name="description" 
          content="Galerie foto cu pacienții și echipa Vet Option Timișoara. Urmărește-ne pe Instagram și Facebook pentru povești din clinică." 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Galerie</span>
              <h1 className="section-title mt-4">Momente din clinică</h1>
              <p className="section-subtitle mx-auto mt-6">
                Pacienți fericiți, echipă dedicată și momente speciale din activitatea noastră de zi cu zi.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="section-padding bg-white" ref={ref}>
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-2xl overflow-hidden group transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <Instagram className="w-8 h-8 text-white mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">Vezi pe Instagram</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vetoptionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 text-white group hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <Instagram className="w-12 h-12" />
                  <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2">Urmărește-ne pe Instagram</h3>
                <p className="text-white/90 mb-4">
                  Povești de zi cu zi din clinică, pacienți fericiți și sfaturi utile pentru animalul tău.
                </p>
                <span className="text-white/80">@vetoptionclinic</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19ghUWcqjr/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877f2] rounded-3xl p-8 text-white group hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <Facebook className="w-12 h-12" />
                  <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2">Urmărește-ne pe Facebook</h3>
                <p className="text-white/90 mb-4">
                  Noutăți, evenimente speciale și informații importante pentru comunitatea noastră.
                </p>
                <span className="text-white/80">Vet Option Timișoara</span>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
