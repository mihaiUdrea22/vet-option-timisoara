// app/admin/articole/page.tsx
import { supabase } from "@/lib/supabaseClient";
import NewArticleForm from "@/components/NewArticleForm";
import DeleteArticleButton from "@/components/DeleteArticleButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminArticolePage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin – Articole</h1>
        <form action="/api/admin/logout" method="post">
          {/* dacă vrei logout direct, poți folosi client component; aici e simplu */}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Creare articol */}
        <div>
          <NewArticleForm
            onCreated={() => {
              // după creare dă un refresh paginii din browser ca să vezi articolul nou
            }}
          />
        </div>

        {/* Lista articole */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Articole existente</h2>
          {error && (
            <p className="text-red-600 text-sm mb-2">
              Eroare la încărcarea articolelor.
            </p>
          )}
          {!articles || articles.length === 0 ? (
            <p className="text-gray-600">Nu există articole încă.</p>
          ) : (
            <ul className="space-y-2 max-h-[600px] overflow-y-auto border rounded p-2">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{article.title}</span>
                    <span className="text-xs text-gray-500">
                      slug: {article.slug}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.created_at).toLocaleString("ro-RO")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/articole/${article.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Editează
                    </Link>
                    <DeleteArticleButton
                      articleId={article.id}
                      onDeleted={() => {
                        // după ștergere dă un refresh manual al paginii
                        window.location.reload();
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
