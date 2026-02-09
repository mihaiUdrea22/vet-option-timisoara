import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabaseClient";
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
};

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        setError("Articolul nu a fost găsit.");
        setArticle(null);
      } else {
        setArticle(data as Article);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const articleUrl = slug ? `${SITE_URL}/articole/${slug}` : SITE_URL;
  const articleTitle = article?.title ? `${article.title} | ${SITE_NAME}` : `Articol | ${SITE_NAME}`;
  const articleDescription = article?.excerpt || "Articol de la Vet Option Timișoara.";
  const articleImage = article?.cover_image || DEFAULT_OG_IMAGE;

  return (
    <>
      <Helmet>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:site_name" content={SITE_NAME} />
        {article?.created_at && (
          <meta property="article:published_time" content={article.created_at} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={articleImage} />
        {article && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt || article.title,
              image: article.cover_image || DEFAULT_OG_IMAGE,
              datePublished: article.created_at,
              author: { "@type": "Organization", name: SITE_NAME },
              publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` } },
              mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
            })}
          </script>
        )}
      </Helmet>
      <Layout>
        <main className="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-32">
          <Link
            to="/articole"
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-2 mb-6"
          >
            ← Înapoi la educare și informare proprietar
          </Link>

          {loading && (
            <p className="text-muted-foreground">Se încarcă articolul...</p>
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {article && (
            <article className="bg-white border rounded-xl shadow-sm p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
              <p className="text-sm text-gray-500 mb-6">
                {new Date(article.created_at).toLocaleDateString("ro-RO")}
              </p>

              {article.cover_image && (
                <div className="mb-8 overflow-hidden rounded-lg border">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none prose-img:rounded-lg prose-img:border prose-headings:scroll-mt-24">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </article>
          )}
        </main>
      </Layout>
    </>
  );
}

