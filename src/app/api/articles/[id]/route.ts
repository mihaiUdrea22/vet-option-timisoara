// app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

type RouteParams = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: RouteParams) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const body = await req.json();
    const { title, excerpt, content, coverImage } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const { data, error } = await supabase
      .from("articles")
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !data) {
      console.error(error);
      return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
