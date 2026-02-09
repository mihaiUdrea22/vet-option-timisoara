import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type GalleryImage = { id: string; url: string; alt: string | null };

export default function Galerie() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
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
  const currentImage = activeImageIndex !== null ? galleryImages[activeImageIndex] : null;
  const visiblePages = useMemo(() => {
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, safePage + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [safePage, totalPages]);

  const closeLightbox = () => setActiveImageIndex(null);

  const goToNextImage = () => {
    if (galleryImages.length === 0 || activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % galleryImages.length);
  };

  const goToPrevImage = () => {
    if (galleryImages.length === 0 || activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    if (activeImageIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImageIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((prev) => {
          if (prev === null || galleryImages.length === 0) return prev;
          return (prev + 1) % galleryImages.length;
        });
      }
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => {
          if (prev === null || galleryImages.length === 0) return prev;
          return (prev - 1 + galleryImages.length) % galleryImages.length;
        });
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeImageIndex, galleryImages.length]);

  return (
    <>
      <PageSEO
        title="Galerie Foto"
        description="Galerie foto cu pacienții și echipa Vet Option Timișoara. Urmărește-ne pe Instagram și Facebook pentru povești din clinică."
        path="/galerie"
        keywords="galerie Vet Option, clinică veterinară Timișoara foto, pacienți câini pisici"
      />
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
                      className={`relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-500 cursor-zoom-in ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 30}ms` }}
                      onClick={() => setActiveImageIndex((safePage - 1) * pageSize + index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Deschide imaginea ${index + 1}`}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveImageIndex((safePage - 1) * pageSize + index);
                        }
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || 'Galerie'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 text-sm text-gray-600">
                  <span>
                    Pagina {safePage} / {totalPages} · {galleryImages.length} imagini
                  </span>
                  <div className="flex items-center gap-2 flex-wrap justify-center">
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
                    {visiblePages.map((pageNo) => (
                      <button
                        key={pageNo}
                        onClick={() => setPage(pageNo)}
                        className={`h-8 min-w-8 px-2 rounded-full border transition-colors ${
                          pageNo === safePage
                            ? 'bg-primary text-white border-primary'
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                        aria-label={`Mergi la pagina ${pageNo}`}
                      >
                        {pageNo}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {currentImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-8 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Vizualizare imagine"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/90 hover:text-white transition-colors"
              aria-label="Închide"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                goToPrevImage();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                goToNextImage();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Imaginea următoare"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <figure
              className="max-w-6xl w-full h-full flex flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={currentImage.url}
                alt={currentImage.alt || 'Imagine galerie'}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
              />
              <figcaption className="mt-4 text-white/90 text-sm text-center">
                {activeImageIndex !== null ? `${activeImageIndex + 1} / ${galleryImages.length}` : ''}
              </figcaption>
            </figure>
          </div>
        )}

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
