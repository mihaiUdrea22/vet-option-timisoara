import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type GalleryImage = { id: string; url: string; alt: string | null };

export default function Galerie() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, url, alt')
        .order('created_at', { ascending: false });
      if (!error) setGalleryImages((data ?? []).map((r) => ({ id: r.id, url: r.url, alt: r.alt })));
      setLoading(false);
    };
    fetchImages();
  }, []);

  const totalPages = Math.max(1, Math.ceil(galleryImages.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedImages = useMemo(
    () => galleryImages.slice((safePage - 1) * pageSize, safePage * pageSize),
    [galleryImages, safePage]
  );

  return (
    <>
      <Helmet>
        <title>Galerie Foto | Vet Option Timișoara - Clinica Veterinară</title>
        <meta 
          name="description" 
          content="Galerie foto cu pacienții și echipa Vet Option Timișoara. Urmărește-ne pe Instagram și Facebook pentru povești din clinică." 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-36 pb-16 md:pb-20 bg-gradient-to-b from-teal-50/50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Galerie</span>
              <h1 className="section-title mt-4">Momente din clinică</h1>
              <p className="section-subtitle mx-auto mt-6">
                Pacienți fericiți, echipă dedicată și momente speciale din activitatea noastră de zi cu zi.
                Urmărește-ne pe rețelele sociale pentru mai multe povești.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="section-padding bg-white" ref={ref}>
          <div className="container-custom">
            {loading ? (
              <p className="text-center text-muted-foreground py-12">Se încarcă galeria…</p>
            ) : galleryImages.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                Nu există imagini în galerie momentan.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  {pagedImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-500 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 30}ms` }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || 'Galerie'}
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 text-sm text-gray-600">
                  <span>
                    Pagina {safePage} / {totalPages} · {galleryImages.length} imagini
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Înapoi
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      Înainte
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Social CTA */}
        <section className="py-20 bg-gray-50/70">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vetoptionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 md:p-10 text-white group hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between mb-5">
                  <Instagram className="w-14 h-14" />
                  <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-3">Urmărește-ne pe Instagram</h3>
                <p className="text-white/90 mb-5 text-[15px] leading-relaxed">
                  Povești de zi cu zi din clinică, pacienți fericiți și sfaturi utile pentru animalul tău.
                </p>
                <span className="text-white/80 font-medium">@vetoptionclinic</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19ghUWcqjr/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877f2] rounded-3xl p-8 md:p-10 text-white group hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between mb-5">
                  <Facebook className="w-14 h-14" />
                  <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-3">Urmărește-ne pe Facebook</h3>
                <p className="text-white/90 mb-5 text-[15px] leading-relaxed">
                  Noutăți, evenimente speciale și informații importante pentru comunitatea noastră.
                </p>
                <span className="text-white/80 font-medium">Vet Option Timișoara</span>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
