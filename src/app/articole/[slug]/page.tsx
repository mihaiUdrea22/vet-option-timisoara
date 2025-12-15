// app/articole/[slug]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { remark } from "remark";
import html from "remark-html";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: Props) {
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!article || error) {
    return notFound();
  }

  const processed = await remark()
    .use(html)
    .process(article.content || "");
  const contentHtml = processed.toString();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(article.created_at).toLocaleDateString("ro-RO")}
      </p>

      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-auto rounded mb-6"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
