import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Project } from "@/types";
import { deleteMultipleFromCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    const projects = await db.getProjects();
    return NextResponse.json(projects);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: Project = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
    }

    if (!body.id) {
      body.id = "proj-" + Date.now();
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

    const saved = await db.saveProject(body);
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
      return NextResponse.json({ error: "Missing project id or ids" }, { status: 400 });
    }

    // 1. Quét toàn bộ ảnh trên Cloudinary từ tất cả các dự án cần xóa
    const allUrlsToDelete: string[] = [];
    for (const id of ids) {
      const project = await db.getProjectById(id);
      if (project) {
        if (project.thumbnail && project.thumbnail.includes("res.cloudinary.com")) {
          allUrlsToDelete.push(project.thumbnail);
        }
        if (Array.isArray(project.gallery)) {
          project.gallery.forEach((img) => {
            if (img && img.includes("res.cloudinary.com")) {
              allUrlsToDelete.push(img);
            }
          });
        }
      }
    }

    if (allUrlsToDelete.length > 0) {
      await deleteMultipleFromCloudinary(allUrlsToDelete);
    }

    // 2. Xóa các bản ghi dự án trong cơ sở dữ liệu
    let deletedCount = 0;
    for (const id of ids) {
      const success = await db.deleteProject(id);
      if (success) deletedCount++;
    }

    return NextResponse.json({ success: true, count: deletedCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
