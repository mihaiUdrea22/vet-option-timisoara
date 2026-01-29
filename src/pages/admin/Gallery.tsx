import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabaseClient";
import { uploadGalleryImage } from "@/lib/uploadImage";
import { ImagePlus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
  storage_path: string | null;
  created_at: string;
};

const bucket = import.meta.env.VITE_SUPABASE_BUCKET || "articles";

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const { toast } = useToast();

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("gallery_images")
      .select("id, url, alt, storage_path, created_at")
      .order("created_at", { ascending: false });

    if (err) {
      setError("Eroare la încărcarea imaginilor.");
      setImages([]);
    } else {
      setImages(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Selectează o imagine.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const { url, path } = await uploadGalleryImage(file);
      const { error: insertErr } = await supabase.from("gallery_images").insert({
        url,
        alt: alt.trim() || null,
        storage_path: path,
      });
      if (insertErr) throw insertErr;
      toast({ title: "Imagine adăugată în galerie." });
      setFile(null);
      setAlt("");
      fetchImages();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Eroare la upload.";
      toast({ title: msg, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm("Ștergi această imagine din galerie?")) return;
    setDeletingId(img.id);
    try {
      if (img.storage_path) {
        await supabase.storage.from(bucket).remove([img.storage_path]);
      }
      const { error: deleteErr } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", img.id);
      if (deleteErr) throw deleteErr;
      toast({ title: "Imagine ștearsă." });
      setImages((prev) => prev.filter((i) => i.id !== img.id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Eroare la ștergere.";
      toast({ title: msg, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout title="Galerie">
      <div className="space-y-6">
        {/* Form adăugare */}
        <form
          onSubmit={handleAdd}
          className="border rounded-2xl p-5 bg-white space-y-4"
        >
          <h2 className="font-semibold text-lg">Adaugă imagine în galerie</h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Imagine
              <input
                type="file"
                accept="image/*"
                className="border rounded-lg px-3 py-2"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-600 flex-1 min-w-[200px]">
              Descriere (alt, opțional)
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="ex: Pacient în recuperare"
                className="border rounded-lg px-3 py-2"
              />
            </label>
            <div className="flex items-end">
              <Button type="submit" disabled={uploading || !file}>
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImagePlus className="w-4 h-4" />
                )}
                <span className="ml-2">{uploading ? "Se încarcă…" : "Adaugă"}</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Listă imagini */}
        <div className="border rounded-2xl p-5 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Imagini în galerie ({images.length})</h2>
            <Button variant="outline" size="sm" onClick={fetchImages} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="ml-2">Reîmprospătează</span>
            </Button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          {loading ? (
            <p className="text-gray-500 py-8">Se încarcă imaginile…</p>
          ) : images.length === 0 ? (
            <p className="text-gray-500 py-8">Nu există imagini în galerie. Adaugă prima imagine mai sus.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative group rounded-xl overflow-hidden border bg-gray-50"
                >
                  <img
                    src={img.url}
                    alt={img.alt || "Galerie"}
                    className="w-full aspect-square object-cover"
                  />
                  {img.alt && (
                    <p className="p-2 text-xs text-gray-600 truncate border-t">{img.alt}</p>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(img)}
                      disabled={deletingId === img.id}
                    >
                      {deletingId === img.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
