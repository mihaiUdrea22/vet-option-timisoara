import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
};

export default function BlogPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error) setArticles(data ?? []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
          <h2 className="section-title mt-4">Educare și informare proprietar</h2>
          <p className="section-subtitle mx-auto mt-4">
            Informații utile pentru sănătatea și bunăstarea animalului tău de companie.
          </p>
        </div>

        {/* Articles grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-soft animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className={`bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={`/articole/${article.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {article.cover_image ? (
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                        <span className="text-4xl">📄</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Citește articolul
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nu există articole momentan. Revino curând pentru materiale de educare și informare.
          </p>
        )}

        {/* CTA - mereu vizibil */}
        {!loading && (
          <div className="text-center mt-12">
            <Link to="/articole" className="btn-outline">
              Vezi toate
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
