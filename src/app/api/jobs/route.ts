import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { JobPosting } from "@/types";

export async function GET() {
  try {
    const jobs = await db.getJobs();
    return NextResponse.json(jobs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: JobPosting = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Tiêu đề tuyển dụng không được để trống" }, { status: 400 });
    }

    if (!body.id) {
      body.id = "job-" + Date.now();
    }

    const saved = await db.saveJob(body);
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
      return NextResponse.json({ error: "Thiếu ID tuyển dụng cần xóa" }, { status: 400 });
    }

    let deletedCount = 0;
    for (const id of ids) {
      const success = await db.deleteJob(id);
      if (success) deletedCount++;
    }

    return NextResponse.json({ success: true, count: deletedCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
