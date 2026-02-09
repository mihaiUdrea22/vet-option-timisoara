import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/PageSEO";
import { Clock, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/lib/supabaseClient";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
};

export default function Articole() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, cover_image, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Nu s-au putut încărca materialele.");
        setArticles([]);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Educare și informare proprietar | Vet Option Timișoara</title>
        <meta
          name="description"
          content="Materiale de educare și informare pentru proprietarii de animale de companie."
        />
      </Helmet>
      <Layout>
        <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Blog
              </span>
              <h1 className="section-title mt-4">Educare și informare proprietar</h1>
              <p className="section-subtitle mx-auto mt-6">
                Informații utile pentru sănătatea și bunăstarea animalului tău
                de companie, scrise de echipa noastră de medici veterinari.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50" ref={ref}>
          <div className="container-custom">
            {loading && (
              <p className="text-center text-muted-foreground">
                Se încarcă articolele...
              </p>
            )}
            {error && (
              <p className="text-center text-red-600 text-sm mb-4">{error}</p>
            )}
            {!loading && !articles.length && !error && (
              <p className="text-center text-muted-foreground">
                Nu există materiale momentan.
              </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
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
                        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                          Fără imagine
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>
                          {new Date(article.created_at).toLocaleDateString(
                            "ro-RO"
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {/* estimare generică */}
                          4-6 min
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                        Citește articolul
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
