import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabaseClient";

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

  return (
    <>
      <Helmet>
        <title>
          {article?.title
            ? `${article.title} | Vet Option`
            : "Articol | Vet Option"}
        </title>
        {article?.excerpt && (
          <meta name="description" content={article.excerpt} />
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

