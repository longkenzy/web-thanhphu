import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NewsPost } from "@/types";
import { deleteMultipleFromCloudinary, extractCloudinaryUrlsFromHtml } from "@/lib/cloudinary";
import { formatDateDisplay, getTodayDisplayDate } from "@/lib/dateUtils";

export async function GET() {
  try {
    const news = await db.getNews();
    return NextResponse.json(news);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: NewsPost = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
    }

    if (!body.id) {
      body.id = "news-" + Date.now();
    }
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }
    if (body.date) {
      body.date = formatDateDisplay(body.date);
    } else {
      body.date = getTodayDisplayDate();
    }

    if (body.published === undefined) {
      body.published = true;
    }

    const saved = await db.saveNews(body);
    return NextResponse.json(saved);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const idsParam = searchParams.get("ids");
    let ids: string[] = [];

    if (idsParam) {
      ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (idParam) {
      ids = [idParam.trim()];
    } else {
      try {
        const text = await req.text();
        if (text) {
          const body = JSON.parse(text);
          if (Array.isArray(body?.ids)) {
            ids = body.ids.filter(Boolean);
          } else if (body?.id) {
            ids = [body.id];
          }
        }
      } catch {
        // no body
      }
    }

    if (ids.length === 0) {
      return NextResponse.json({ error: "Missing news id or ids" }, { status: 400 });
    }

    // 1. Tìm các bài viết để quét ảnh Cloudinary cần hủy (Thumbnail + Nội dung HTML)
    const allNews = await db.getNews();
    const targetPosts = allNews.filter((n) => ids.includes(n.id));

    const urlsToDelete: string[] = [];
    for (const post of targetPosts) {
      if (post.thumbnail && post.thumbnail.includes("res.cloudinary.com")) {
        urlsToDelete.push(post.thumbnail);
      }
      if (post.content) {
        const contentUrls = extractCloudinaryUrlsFromHtml(post.content);
        urlsToDelete.push(...contentUrls);
      }
    }

    if (urlsToDelete.length > 0) {
      await deleteMultipleFromCloudinary(urlsToDelete);
    }

    // 2. Xóa các bản ghi bài viết trong cơ sở dữ liệu
    let deletedCount = 0;
    for (const id of ids) {
      const success = await db.deleteNews(id);
      if (success) deletedCount++;
    }

    return NextResponse.json({ success: true, count: deletedCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
