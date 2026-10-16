import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Partner } from "@/types";
import { deleteMultipleFromCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    const partners = await db.getPartners();
    return NextResponse.json(partners);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Cập nhật thứ tự toàn bộ partners nếu nhận mảng reorder
    if (body.reorder && Array.isArray(body.reorder)) {
      for (let i = 0; i < body.reorder.length; i++) {
        const item: Partner = body.reorder[i];
        await db.savePartner({ ...item, orderIndex: i });
      }
      const updated = await db.getPartners();
      return NextResponse.json(updated);
    }

    // 2. Thêm hoặc cập nhật một đối tác
    const partner: Partner = body;
    if (!partner.name || !partner.name.trim()) {
      return NextResponse.json({ error: "Vui lòng nhập tên đối tác" }, { status: 400 });
    }

    if (!partner.logo || !partner.logo.trim()) {
      return NextResponse.json({ error: "Vui lòng tải lên logo đối tác" }, { status: 400 });
    }

    if (!partner.id) {
      partner.id = "partner-" + Date.now();
    }

    partner.name = partner.name.trim();
    partner.website = partner.website ? partner.website.trim() : "";
    partner.orderIndex = typeof partner.orderIndex === "number" ? partner.orderIndex : 0;
    partner.active = partner.active !== false;

    const saved = await db.savePartner(partner);
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
      return NextResponse.json({ error: "Thiếu ID đối tác cần xóa" }, { status: 400 });
    }

    // 1. Quét tìm logo trên Cloudinary để tự động hủy trên CDN nếu có
    const allPartners = await db.getPartners();
    const targets = allPartners.filter((p) => ids.includes(p.id));

    const urlsToDelete: string[] = [];
    for (const partner of targets) {
      if (partner.logo && partner.logo.includes("res.cloudinary.com")) {
        urlsToDelete.push(partner.logo);
      }
    }

    if (urlsToDelete.length > 0) {
      await deleteMultipleFromCloudinary(urlsToDelete);
    }

    // 2. Xóa các bản ghi đối tác trong cơ sở dữ liệu
    let deletedCount = 0;
    for (const id of ids) {
      const success = await db.deletePartner(id);
      if (success) deletedCount++;
    }

    return NextResponse.json({ success: true, count: deletedCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
