import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import slugify from "slugify";
import { supabase } from "@/lib/supabaseClient";
import { uploadImage } from "@/lib/uploadImage";

type Props = {
  onCreated?: () => void;
};

export default function NewArticleForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [contentFont, setContentFont] = useState(14);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const insertMarkdown = (
    before: string,
    after: string = "",
    placeholder = ""
  ) => {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const current = content;
    const selected = current.slice(start, end) || placeholder;
    const next =
      current.slice(0, start) + before + selected + after + current.slice(end);
    setContent(next);
    // repoziționare cursors
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const prefixSelection = (prefix: string, placeholder = "Element") => {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const current = content;
    const selected = current.slice(start, end);
    const block = selected || placeholder;
    const lines = block.split("\n").map((line) => (line ? `${prefix}${line}` : prefix));
    const next =
      current.slice(0, start) + lines.join("\n") + current.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      const pos = start + prefix.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const publicUrl = await uploadImage(file);
      setCoverImage(publicUrl);
    } catch (err: any) {
      setUploadError(err.message || "Eroare la upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const slug = slugify(title, { lower: true, strict: true });
      const { error } = await supabase.from("articles").insert({
        title,
        excerpt: excerpt || null,
        cover_image: coverImage || null,
        content,
        slug,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMsg("Articol creat cu succes!");
      setTitle("");
      setExcerpt("");
      setCoverImage("");
      setContent("");
      onCreated?.();
    } catch (err: any) {
      setErrorMsg(err.message || "Eroare la crearea articolului");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Adaugă articol nou</h2>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Titlu *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Excerpt (scurt rezumat)
          </label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Cover image</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="URL imagine (opțional)"
          />
          <div className="p-3 border rounded bg-amber-50 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || !file}
                className="text-sm px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60"
              >
                {uploading ? "Se încarcă..." : "Încarcă imagine"}
              </button>
            </div>
            <p className="text-xs text-amber-700">
              Încarcă imaginea înainte de a salva articolul. După upload, câmpul
              URL se completează automat.
            </p>
            {uploadError && (
              <p className="text-red-600 text-xs">{uploadError}</p>
            )}
            {coverImage && (
              <p className="text-xs text-green-700">Imagine setată.</p>
            )}
          </div>
          {coverImage && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Preview imagine:</p>
              <img
                src={coverImage}
                alt="Cover preview"
                className="max-h-48 rounded border"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Conținut (Markdown) *
          </label>
          <div className="flex flex-wrap gap-2 mb-2 text-xs">
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("**", "**", "bold")}
            >
              Bold
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("_", "_", "italic")}
            >
              Italic
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("# ", "", "Titlu")}
            >
              Titlu
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("- ", "", "Element listă")}
            >
              Listă
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => prefixSelection("- ", "Element listă")}
              title="Bullets pentru selecție/linii"
            >
              Bullets
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => prefixSelection("1. ", "Element numerotat")}
              title="Listă numerotată"
            >
              Numerotat
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("> ", "", "Citat")}
            >
              Citat
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("![alt](", ")", "link-imagine")}
            >
              Imagine (md)
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => insertMarkdown("[text](", ")", "link")}
            >
              Link
            </button>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-gray-500">Dimensiune selectată</span>
              {[16, 18, 20, 24].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="px-2 py-1 border rounded hover:bg-gray-50"
                  onClick={() =>
                    insertMarkdown(
                      `<span style="font-size:${size}px">`,
                      "</span>",
                      "text"
                    )
                  }
                >
                  {size}px
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[11px] text-gray-500">Font</span>
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-50"
                onClick={() =>
                  setContentFont((f) => Math.max(12, Math.min(24, f - 1)))
                }
                title="Micșorează fontul"
              >
                -
              </button>
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-50"
                onClick={() =>
                  setContentFont((f) => Math.max(12, Math.min(24, f + 1)))
                }
                title="Mărește fontul"
              >
                +
              </button>
              <button
                type="button"
                className="px-2 py-1 border rounded hover:bg-gray-50"
                onClick={() => setContentFont(14)}
                title="Reset font"
              >
                Reset
              </button>
            </div>
          </div>
          <textarea
            ref={contentRef}
            className="w-full border rounded px-3 py-2 font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
            style={{ fontSize: `${contentFont}px` }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Poți folosi Markdown: <code>**bold**</code>, <code>*italic*</code>,{" "}
            <code># Titlu</code>, liste etc.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Se salvează..." : "Salvează articolul"}
        </button>
      </form>

      {/* Preview Markdown */}
      {content && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Preview conținut</h3>
          <div className="prose max-w-none" style={{ fontSize: `${contentFont}px` }}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
