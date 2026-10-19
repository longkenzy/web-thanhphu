const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cloudName = "x13kyocz";
const apiKey = "225856118158743";
const apiSecret = "T5Orbj6X2aCS_kqKQ82E5Y7zYt8";
const folder = "thanhphu_services";

const imagesToUpload = [
  {
    key: "civil_industrial",
    filePath: path.join(__dirname, "../public/xay-dung-dan-dung-cong-nghiep.png"),
    title: "Xây dựng, thi công lắp đặt, sửa chữa các công trình dân dụng, công trình công nghiệp"
  },
  {
    key: "transport_infrastructure",
    filePath: path.join(__dirname, "../public/xay-dung-giao-thong-ha-tang.png"),
    title: "Xây dựng các công trình giao thông (Cầu - Đường bộ). Các công trình hạ tầng kỹ thuật, cấp thoát nước"
  },
  {
    key: "doors_aluminum",
    filePath: path.join(__dirname, "../public/san-xuat-cua-nhua-upvc-nhom-kinh.png"),
    title: "Sản xuất, thi công lắp đặt cửa nhựa lõi thép uPVC; cửa nhôm kính"
  },
  {
    key: "equipment_materials",
    filePath: path.join(__dirname, "../public/kinh-doanh-may-moc-thiet-bi-vat-lieu-xay-dung.webp"),
    title: "Kinh doanh máy móc thiết bị và vật liệu xây dựng"
  }
];

async function uploadFile(item) {
  console.log(`Uploading ${item.title}...`);
  if (!fs.existsSync(item.filePath)) {
    throw new Error(`File not found: ${item.filePath}`);
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(toSign).digest('hex');

  const fileBuffer = fs.readFileSync(item.filePath);
  const ext = path.extname(item.filePath).replace('.', '') === 'webp' ? 'webp' : 'png';
  const base64Data = `data:image/${ext};base64,` + fileBuffer.toString('base64');

  const formData = new FormData();
  formData.append('file', base64Data);
  formData.append('folder', folder);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.error?.message || 'Upload failed');
  }

  console.log(`✓ Uploaded ${item.key}: ${resData.secure_url}`);
  return { ...item, url: resData.secure_url };
}

async function main() {
  const results = {};
  for (const item of imagesToUpload) {
    const uploaded = await uploadFile(item);
    results[item.key] = uploaded.url;
  }
  console.log("\nALL RESULTS:\n", JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error("Upload error:", err);
  process.exit(1);
});
