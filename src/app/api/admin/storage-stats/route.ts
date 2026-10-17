import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { getCloudflareD1DatabaseInfo } from "@/lib/db";
import { getCloudinaryUsage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function GET() {
  try {
    // 1. Kiểm tra xác thực quyền Admin
    const cookieStore = await cookies();
    const token = cookieStore.get("trunghai_admin_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ" }, { status: 401 });
    }

    // 2. Lấy đồng thời thông tin từ Cloudflare D1 & Cloudinary
    const [d1Result, cloudinaryResult] = await Promise.allSettled([
      getCloudflareD1DatabaseInfo(),
      getCloudinaryUsage(),
    ]);

    // Xử lý kết quả Cloudflare D1
    let d1Data: any = {
      status: "unconfigured",
      name: "Cloudflare D1",
      fileSize: 0,
      fileSizeFormatted: "0 B",
      maxSizeBytes: 524288000, // 500 MB (Cloudflare Free Tier limit per DB)
      maxSizeFormatted: "500 MB",
      usedPercent: 0,
      numTables: 0,
      region: "APAC",
    };

    if (d1Result.status === "fulfilled") {
      const res = d1Result.value;
      const fileSize = Number(res?.file_size || 0);
      const maxSizeBytes = 524288000; // 500 MB
      const usedPercent = Number(((fileSize / maxSizeBytes) * 100).toFixed(2));

      d1Data = {
        status: "ok",
        name: res?.name || "web-thanhphu",
        fileSize,
        fileSizeFormatted: formatBytes(fileSize, 1),
        maxSizeBytes,
        maxSizeFormatted: "500 MB",
        usedPercent,
        numTables: res?.num_tables || 0,
        region: res?.running_in_region || "APAC",
        createdAt: res?.created_at,
        version: res?.version,
      };
    } else {
      d1Data = {
        status: "error",
        name: "Cloudflare D1",
        fileSize: 0,
        fileSizeFormatted: "Không xác định",
        error: d1Result.reason?.message || "Không thể kết nối Cloudflare D1",
      };
    }

    // Xử lý kết quả Cloudinary CDN
    let cloudinaryData: any = {
      status: "unconfigured",
      plan: "Free",
      storageBytes: 0,
      storageFormatted: "0 B",
      objectsCount: 0,
      bandwidthBytes: 0,
      bandwidthFormatted: "0 B",
      creditsUsed: 0,
      creditsLimit: 25,
      creditsUsedPercent: 0,
    };

    if (cloudinaryResult.status === "fulfilled") {
      const res = cloudinaryResult.value;
      const storageBytes = Number(res?.storage?.usage || 0);
      const bandwidthBytes = Number(res?.bandwidth?.usage || 0);
      const objectsCount = Number(res?.objects?.usage || res?.resources || 0);
      const creditsUsed = Number(res?.credits?.usage || 0);
      const creditsLimit = Number(res?.credits?.limit || 25);
      const creditsUsedPercent = Number(
        (res?.credits?.used_percent || (creditsLimit > 0 ? (creditsUsed / creditsLimit) * 100 : 0)).toFixed(2)
      );

      cloudinaryData = {
        status: "ok",
        plan: res?.plan || "Free",
        storageBytes,
        storageFormatted: formatBytes(storageBytes, 1),
        objectsCount,
        bandwidthBytes,
        bandwidthFormatted: formatBytes(bandwidthBytes, 1),
        creditsUsed,
        creditsLimit,
        creditsUsedPercent,
        lastUpdated: res?.last_updated,
      };
    } else {
      cloudinaryData = {
        status: "error",
        plan: "Free",
        storageBytes: 0,
        storageFormatted: "Không xác định",
        error: cloudinaryResult.reason?.message || "Không thể kết nối Cloudinary CDN",
      };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      d1: d1Data,
      cloudinary: cloudinaryData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi máy chủ khi lấy dữ liệu dung lượng" },
      { status: 500 }
    );
  }
}
