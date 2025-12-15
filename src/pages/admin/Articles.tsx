import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import NewArticleForm from "@/components/NewArticleForm";
import DeleteArticleButton from "@/components/DeleteArticleButton";
import { logoutAdmin } from "@/lib/adminAuth";
import { RefreshCw, ExternalLink, Copy } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

type Article = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  cover_image?: string | null;
  excerpt?: string | null;
};

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [copyMsg, setCopyMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, slug, created_at, cover_image, excerpt")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Eroare la încărcarea articolelor");
      setArticles([]);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(filter.toLowerCase().trim())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMsg("Copiat!");
    setTimeout(() => setCopyMsg(null), 1500);
  };

  return (
    <AdminLayout title="Articole">
      <div className="flex items-center justify-between mb-4 text-sm">
        {copyMsg && <span className="text-green-600">{copyMsg}</span>}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchArticles}
            disabled={loading}
            className="inline-flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-60"
            title="Reîncarcă"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:underline"
          >
            Delogare
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <NewArticleForm onCreated={fetchArticles} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">
              Articole existente ({articles.length})
            </h2>
          </div>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <div className="mb-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Caută după titlu..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {loading ? (
            <p className="text-gray-600">Se încarcă...</p>
          ) : !filtered.length ? (
            <p className="text-gray-600">Nu există articole încă.</p>
          ) : (
            <ul className="space-y-2 max-h-[600px] overflow-y-auto border rounded p-2">
              {filtered.map((article) => (
                <li
                  key={article.id}
                  className="flex items-start justify-between gap-3 border-b pb-3 last:border-b-0"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                      {article.cover_image ? (
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Fără img"
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium line-clamp-2">
                        {article.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleString("ro-RO")}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <span className="font-mono truncate max-w-[180px]">
                          {article.slug}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(article.slug)}
                          className="hover:text-blue-600"
                          title="Copiază slug"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <a
                          href={`/articole/${article.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Public
                        </a>
                      </div>
                      {article.excerpt && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/articole/${article.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Editează
                    </Link>
                    <DeleteArticleButton
                      articleId={article.id}
                      onDeleted={fetchArticles}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

