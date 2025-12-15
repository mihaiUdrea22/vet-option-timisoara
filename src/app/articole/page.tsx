// app/articole/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function ArticolePage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Articole veterinare</h1>

      {!articles || articles.length === 0 ? (
        <p className="text-gray-600">Momentan nu există articole.</p>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/articole/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(article.created_at).toLocaleDateString("ro-RO")}
              </p>
              {article.excerpt && (
                <p className="text-gray-700 mb-3">{article.excerpt}</p>
              )}
              <Link
                href={`/articole/${article.slug}`}
                className="text-blue-600 hover:underline"
              >
                Citește articolul →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
