import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Instagram, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type GalleryImage = { id: string; url: string; alt: string | null };

export default function GalleryPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, url, alt')
        .order('created_at', { ascending: false })
        .limit(8);
      if (!error) setGalleryImages((data ?? []).map((r) => ({ id: r.id, url: r.url, alt: r.alt })));
    };
    fetchImages();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Galerie</span>
          <h2 className="section-title mt-4">Momente din clinică</h2>
          <p className="section-subtitle mx-auto mt-4">
            Urmărește-ne pe Instagram pentru povești de zi cu zi din clinică și pacienții noștri fericiți.
          </p>
        </div>

        {/* Gallery grid */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative aspect-square rounded-2xl overflow-hidden group transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.url}
                  alt={image.alt || 'Galerie'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social CTA */}
        <div 
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <a
            href="https://www.instagram.com/vetoptionclinic"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Instagram className="w-5 h-5" />
            Urmărește-ne pe Instagram
          </a>
          <Link to="/galerie" className="btn-outline">
            Vezi galeria foto
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
