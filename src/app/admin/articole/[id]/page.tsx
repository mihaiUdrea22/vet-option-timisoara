// app/admin/articole/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import EditArticleForm from "@/components/EditArticleForm";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

export default async function AdminEditArticlePage({ params }: Props) {
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article || error) {
    return notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Admin – Editează articol</h1>
      <EditArticleForm article={article} />
    </main>
  );
}
