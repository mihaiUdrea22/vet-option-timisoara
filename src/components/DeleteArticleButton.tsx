import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  articleId: string;
  onDeleted?: () => void;
};

export default function DeleteArticleButton({ articleId, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Sigur vrei să ștergi acest articol?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", articleId);

      if (error) {
        alert("Eroare la ștergerea articolului");
        return;
      }

      onDeleted?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 text-sm hover:underline disabled:opacity-60"
    >
      {loading ? "Se șterge..." : "Șterge"}
    </button>
  );
}
