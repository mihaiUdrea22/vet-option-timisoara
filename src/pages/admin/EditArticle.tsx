import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import EditArticleForm from "@/components/EditArticleForm";

type Article = {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  content: string;
  created_at: string;
};

export default function AdminEditArticle() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Articolul nu a fost găsit");
        setArticle(null);
      } else {
        setArticle(data as Article);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Editează articol</h1>
          <p className="text-sm text-gray-500">
            ID: <span className="font-mono">{id}</span>
          </p>
        </div>
        <Link
          to="/admin/articole"
          className="text-sm text-blue-600 hover:underline"
        >
          Înapoi la listă
        </Link>
      </div>

      {loading && <p className="text-gray-600">Se încarcă articolul...</p>}
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {article && <EditArticleForm article={article} />}
    </main>
  );
}

