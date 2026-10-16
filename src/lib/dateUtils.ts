import type { NewsPost } from "../types";

/**
 * Chuyển đổi chuỗi ngày bất kỳ (DD/MM/YYYY, YYYY-MM-DD, ISO string...) thành timestamp (milliseconds)
 */
export function parseDateToTimestamp(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const str = String(dateStr).trim();

  // Định dạng DD/MM/YYYY hoặc DD-MM-YYYY (với giờ phút tùy chọn)
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:\s+(\d{1,2}):(\d{1,2}))?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const hours = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
    const minutes = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
    return new Date(year, month, day, hours, minutes).getTime();
  }

  // Định dạng YYYY-MM-DD hoặc YYYY/MM/DD (với giờ phút tùy chọn)
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const hours = ymdMatch[4] ? parseInt(ymdMatch[4], 10) : 0;
    const minutes = ymdMatch[5] ? parseInt(ymdMatch[5], 10) : 0;
    return new Date(year, month, day, hours, minutes).getTime();
  }

  const parsed = Date.parse(str);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Chuyển ngày sang định dạng hiển thị tiếng Việt chuẩn: DD/MM/YYYY
 */
export function formatDateDisplay(dateStr?: string | null): string {
  if (!dateStr) return getTodayDisplayDate();
  const str = String(dateStr).trim();

  // Đã là DD/MM/YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, "0");
    const m = dmyMatch[2].padStart(2, "0");
    const y = dmyMatch[3];
    return `${d}/${m}/${y}`;
  }

  // YYYY-MM-DD
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, "0");
    const d = ymdMatch[3].padStart(2, "0");
    return `${d}/${m}/${y}`;
  }

  const timestamp = parseDateToTimestamp(str);
  if (timestamp > 0) {
    const dateObj = new Date(timestamp);
    const d = String(dateObj.getDate()).padStart(2, "0");
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const y = dateObj.getFullYear();
    return `${d}/${m}/${y}`;
  }

  return str;
}

/**
 * Chuyển chuỗi ngày sang định dạng YYYY-MM-DD cho thẻ <input type="date" />
 */
export function toDateInputValue(dateStr?: string | null): string {
  if (!dateStr) {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const str = String(dateStr).trim();

  // YYYY-MM-DD
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, "0");
    const d = ymdMatch[3].padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // DD/MM/YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, "0");
    const m = dmyMatch[2].padStart(2, "0");
    const y = dmyMatch[3];
    return `${y}-${m}-${d}`;
  }

  const timestamp = parseDateToTimestamp(str);
  if (timestamp > 0) {
    const dateObj = new Date(timestamp);
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return "";
}

/**
 * Lấy ngày hôm nay theo định dạng DD/MM/YYYY
 */
export function getTodayDisplayDate(): string {
  const today = new Date();
  const d = String(today.getDate()).padStart(2, "0");
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const y = today.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Sắp xếp danh sách bài viết theo ngày xuất bản giảm dần (mới nhất lên đầu)
 */
export function sortNewsByDateDesc(newsList: NewsPost[]): NewsPost[] {
  return [...newsList].sort((a, b) => {
    const timeA = parseDateToTimestamp(a.date);
    const timeB = parseDateToTimestamp(b.date);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return (b.id || "").localeCompare(a.id || "");
  });
}
