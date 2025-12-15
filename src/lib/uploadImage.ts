import { supabase } from "./supabaseClient";

const bucket =
  import.meta.env.VITE_SUPABASE_BUCKET || "articles";

export async function uploadImage(file: File) {
  const ext = file.name.split(".").pop() || "png";
  const filePath = `uploads/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/png",
    });

  if (error || !data) {
    throw new Error(
      error?.message || "Upload eșuat - verifică bucket-ul public în Supabase"
    );
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  if (!publicData?.publicUrl) {
    throw new Error("Nu am putut obține URL-ul public al imaginii");
  }

  return publicData.publicUrl;
}
