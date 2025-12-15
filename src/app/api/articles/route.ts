// app/api/articles/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

export async function GET() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
