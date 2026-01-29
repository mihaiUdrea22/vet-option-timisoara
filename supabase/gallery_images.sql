-- Rulează în Supabase SQL Editor pentru a activa galeria în admin.
-- Tabel: gallery_images (imaginile din galeria publică)

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt TEXT,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Permite citire publică (pentru pagina Galerie)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gallery_images_select" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "gallery_images_insert" ON gallery_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "gallery_images_delete" ON gallery_images
  FOR DELETE USING (true);

-- În Storage, asigură-te că bucket-ul (ex: articles) are policy pentru folderul gallery:
-- - INSERT pentru anon (sau authenticated) pe path gallery/*
-- - DELETE pentru anon (sau authenticated) pe path gallery/*
