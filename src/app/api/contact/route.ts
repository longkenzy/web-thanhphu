import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, category, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Vui lòng nhập họ tên và số điện thoại liên hệ" },
        { status: 400 }
      );
    }

    // Ghi log thông tin liên hệ gửi từ website
    console.log("[CONTACT_INQUIRY]", {
      name,
      phone,
      email,
      category,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Gửi thông tin liên hệ thành công! Thành Phú sẽ phản hồi sớm nhất.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
