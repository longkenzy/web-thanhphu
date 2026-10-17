// Cloudinary Helper Service
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "x13kyocz",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "thanhphu_uploads",
  apiKey: process.env.CLOUDINARY_API_KEY || "225856118158743",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "T5Orbj6X2aCS_kqKQ82E5Y7zYt8",
};

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudinaryConfig.cloudName);
}

/**
 * Upload an image file or base64 directly to Cloudinary
 */
export async function uploadToCloudinary(fileDataUrl: string, folder = "thanhphu_media"): Promise<string> {
  const { cloudName, apiKey, apiSecret, uploadPreset } = cloudinaryConfig;
  if (!cloudName) {
    console.warn("Cloudinary is not configured. Returning the provided URL/data.");
    return fileDataUrl;
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", fileDataUrl);

  if (apiKey && apiSecret) {
    // Signed upload: bảo mật cao, không yêu cầu cấu hình unsigned preset trên Cloudinary
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = await generateSha1(toSign);

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", folder);
    formData.append("signature", signature);
  } else {
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const resData = (await response.json()) as any;
  if (!response.ok) {
    throw new Error(resData.error?.message || "Failed to upload image to Cloudinary");
  }

  return resData.secure_url;
}

/**
 * Extracts Cloudinary public_id from a full URL
 * e.g. "https://res.cloudinary.com/x13kyocz/image/upload/v1727854123/thanhphu_media/abc123xyz.jpg"
 * -> "thanhphu_media/abc123xyz"
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return null;
  }

  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let pathAfterUpload = url.substring(uploadIndex + "/upload/".length);

    // Bỏ qua các transformation và tiền tố version (ví dụ: v1727854123/ hoặc w_500/v12345/)
    pathAfterUpload = pathAfterUpload.replace(/^(?:(?:[a-z]{1,2}_[a-zA-Z0-9_,-]+,?)+\/)?(?:v\d+\/)?/, "");

    // Loại bỏ đuôi mở rộng file (.jpg, .png, .webp)
    const lastDotIndex = pathAfterUpload.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
    }

    return pathAfterUpload;
  } catch (err) {
    console.error("Failed to parse Cloudinary public_id:", err);
    return null;
  }
}

/**
 * Extracts all Cloudinary image URLs from an HTML string (e.g. Quill rich-text content)
 */
export function extractCloudinaryUrlsFromHtml(html: string): string[] {
  if (!html || typeof html !== "string") return [];
  const urls: string[] = [];
  const regex = /https:\/\/res\.cloudinary\.com\/[^\s"'<>\\]+/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const cleanUrl = match[0].replace(/[),;.]+$/, "");
    if (!urls.includes(cleanUrl)) {
      urls.push(cleanUrl);
    }
  }
  return urls;
}

/**
 * Helper to compute SHA-1 hash for Cloudinary API signature
 */
async function generateSha1(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Deletes an image from Cloudinary by its full URL or public_id
 */
export async function deleteFromCloudinary(urlOrPublicId: string): Promise<{ success: boolean; result?: string; error?: string }> {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn("Cloudinary credentials missing, skipping deletion.");
    return { success: false, error: "Cloudinary credentials not configured" };
  }

  const publicId = urlOrPublicId.includes("http") ? extractCloudinaryPublicId(urlOrPublicId) : urlOrPublicId;
  if (!publicId) {
    return { success: false, error: "Invalid public_id or non-Cloudinary URL" };
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = await generateSha1(toSign);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return { success: res.ok, result: data.result };
  } catch (err: any) {
    console.error(`Error deleting Cloudinary image ${publicId}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Deletes multiple images from Cloudinary concurrently
 */
export async function deleteMultipleFromCloudinary(urlsOrPublicIds: (string | undefined | null)[]): Promise<number> {
  const validList = urlsOrPublicIds.filter((item): item is string => Boolean(item && item.includes("res.cloudinary.com")));
  if (validList.length === 0) return 0;

  const results = await Promise.allSettled(validList.map((url) => deleteFromCloudinary(url)));
  const successfulCount = results.filter((r) => r.status === "fulfilled" && r.value.success).length;
  return successfulCount;
}

/**
 * Lấy thông tin thống kê dung lượng và băng thông từ Cloudinary Admin API
 */
export async function getCloudinaryUsage(): Promise<any> {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Thông tin xác thực Cloudinary chưa được cấu hình đầy đủ");
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/usage`;
  const auth = typeof Buffer !== "undefined"
    ? Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")
    : btoa(`${apiKey}:${apiSecret}`);

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Lỗi Cloudinary API (${res.status})`);
  }

  return data;
}

