"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Home,
  ChevronRight,
  Navigation,
  Briefcase,
  Wrench,
  Users,
  FileDown,
  Sparkles,
  Building2,
} from "lucide-react";
import { CompanySettings } from "@/types";

interface ContactPageClientProps {
  settings: CompanySettings;
}

export default function ContactPageClient({ settings }: ContactPageClientProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2200);
  };

  const address = settings.address || "22A Vũ Ngọc Phan, Phường Bình Lợi Trung, Tp. Hồ Chí Minh";
  const hotline = settings.hotline || settings.phone || "(028) 3553 0675";
  const email = settings.email || "thanhphuhcns@gmail.com";
  const taxCode = settings.taxCode || "0310001821";
  const companyName = settings.name || "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ";

  const googleMapsEmbedUrl =
    "https://maps.google.com/maps?q=22A+V%C5%A9+Ng%E1%BB%8Dc+Phan,+Ph%C6%B0%E1%BB%9Dng+B%C3%ACnh+L%E1%BB%A3i+Trung,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=22A+V%C5%A9+Ng%E1%BB%8Dc+Phan,+Ph%C6%B0%E1%BB%9Dng+B%C3%ACnh+L%E1%BB%A3i+Trung,+H%E1%BB%93+Ch%C3%AD+Minh";

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pt-28 sm:pt-32 pb-16 selection:bg-[#ed3237] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
            <li className="flex items-center gap-1.5">
              <Link
                href="/"
                className="flex items-center gap-1 text-slate-600 hover:text-[#ed3237] transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Trang chủ</span>
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <li className="text-[#ed3237] font-semibold">Liên hệ</li>
          </ol>
        </nav>

        {/* Clean Hero Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-red-50 text-[#ed3237] text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KẾT NỐI VÀ HỢP TÁC • THÀNH PHÚ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Thông Tin Liên Hệ &amp; Trụ Sở Chính
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Thành Phú luôn sẵn sàng giải đáp, tiếp nhận thông tin đối tác và tư vấn các giải pháp kỹ thuật tối ưu
            cho mọi công trình trên toàn quốc.
          </p>
        </div>

        {/* Main Side-by-Side Split: Direct Contact Info (Left) + Interactive Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* CỘT TRÁI (5/12): Thông Tin Doanh Nghiệp & Kênh Liên Hệ Nhanh */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white rounded-[4px] border border-slate-200 p-6 sm:p-7 shadow-xs flex-1 flex flex-col justify-between">
              {/* Company Identity */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                <div className="relative w-12 h-12 shrink-0 rounded-[3px] bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center">
                  <Image src="/logo.png" alt="" width={42} height={42} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#ed3237] tracking-wider uppercase block">
                    {settings.shortName || "THÀNH PHÚ"}
                  </span>
                  <h2 className="text-xs sm:text-[13px] font-black text-slate-900 leading-snug line-clamp-2">
                    {companyName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-slate-500 font-mono">MST: {taxCode}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(taxCode, "taxCode")}
                      className="text-[10px] font-semibold text-slate-600 hover:text-[#ed3237] inline-flex items-center gap-1 cursor-pointer"
                      title="Sao chép MST"
                    >
                      {copiedItem === "taxCode" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Core Contact Items List */}
              <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-around py-1">
                {/* 1. Trụ sở chính */}
                <div className="py-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Địa chỉ trụ sở
                      </div>
                      <div className="text-xs sm:text-[13px] font-semibold text-slate-900 mt-0.5 leading-snug">
                        {address}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ed3237] hover:underline cursor-pointer"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Chỉ đường</span>
                        </a>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(address, "address")}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          {copiedItem === "address" ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Hotline & Điện thoại */}
                <div className="py-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Hotline liên hệ 24/7
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 font-mono">
                        {hotline}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <a
                          href={`tel:${hotline.replace(/[^0-9]/g, "")}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#ed3237] hover:bg-[#d0282d] text-white text-[11px] font-bold transition-colors shadow-2xs cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Gọi ngay</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(hotline, "phone")}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 px-2 py-1 rounded-[3px] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          {copiedItem === "phone" ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Chép số</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Email */}
                <div className="py-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Thư điện tử
                      </div>
                      <div className="text-xs sm:text-[13px] font-semibold text-slate-900 mt-0.5 break-all">
                        {email}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3e4095] hover:underline cursor-pointer"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Gửi Email</span>
                        </a>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(email, "email")}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          {copiedItem === "email" ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Giờ làm việc */}
                <div className="pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Thời gian làm việc
                      </div>
                      <div className="text-xs sm:text-[13px] font-semibold text-slate-900 mt-0.5">
                        Thứ 2 – Thứ 7: 08:00 – 17:30
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Ban chỉ huy &amp; Kỹ thuật công trường thường trực 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action: Profile Năng Lực & Dự Án */}
            <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5">
                <FileDown className="w-4 h-4 text-[#ed3237] shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Hồ Sơ Năng Lực Doanh Nghiệp</div>
                  <div className="text-[11px] text-slate-500">Xem danh mục các công trình &amp; máy móc thiết bị</div>
                </div>
              </div>
              <Link
                href="/cong-trinh"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[3px] bg-slate-900 hover:bg-[#ed3237] text-white font-bold text-[11px] shadow-2xs transition-colors shrink-0"
              >
                <span>Xem dự án</span>
                <ChevronRight className="w-3 h-3 text-white/80" />
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI (7/12): Bản Đồ Google Maps Tương Tác Song Song (Side-by-side Map) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[4px] border border-slate-200 p-5 sm:p-6 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#ed3237] uppercase tracking-wider mb-0.5">
                      <MapPin className="w-4 h-4" />
                      <span>BẢN ĐỒ VỊ TRÍ TRỰC TUYẾN</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                      Định Vị Trụ Sở Trên Google Maps
                    </h2>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-slate-900 hover:bg-[#ed3237] text-white text-xs font-bold transition-colors shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở app Google Maps</span>
                  </a>
                </div>

                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] rounded-[3px] overflow-hidden border border-slate-200 bg-slate-100">
                  <iframe
                    title={`Bản đồ định vị ${companyName}`}
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>{address}</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ed3237] font-semibold hover:underline shrink-0"
                >
                  Xem hướng dẫn lộ trình &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Compact Department Strips (Kênh Liên Hệ Chuyên Trách Phía Dưới) */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            KÊNH LIÊN HỆ THEO PHÒNG BAN CHUYÊN TRÁCH
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Khối Dự án & Đấu thầu */}
            <div className="bg-white rounded-[4px] border border-slate-200 p-4 shadow-xs flex items-start gap-3 hover:border-slate-300 transition-colors">
              <div className="w-9 h-9 rounded-[3px] bg-blue-50 text-[#3e4095] flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase text-slate-900 tracking-wide">
                  Khối Dự Án &amp; Đấu Thầu
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Tiếp nhận hồ sơ mời thầu, dự toán kỹ thuật, liên danh &amp; phương án thi công.
                </p>
                <div className="text-[11px] font-semibold text-[#3e4095] mt-2 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#ed3237]" />
                  <span className="truncate">{email}</span>
                </div>
              </div>
            </div>

            {/* 2. Vật tư & Cơ giới */}
            <div className="bg-white rounded-[4px] border border-slate-200 p-4 shadow-xs flex items-start gap-3 hover:border-slate-300 transition-colors">
              <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase text-slate-900 tracking-wide">
                  Vật Tư &amp; Thiết Bị Cơ Giới
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Điều phối máy móc chuyên dụng, thiết bị thi công nền móng, kết cấu &amp; nhà xưởng.
                </p>
                <div className="text-[11px] font-semibold text-slate-700 mt-2 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#ed3237]" />
                  <span>Hotline: {hotline}</span>
                </div>
              </div>
            </div>

            {/* 3. Tuyển dụng & Nhân sự */}
            <div className="bg-white rounded-[4px] border border-slate-200 p-4 shadow-xs flex items-start gap-3 hover:border-slate-300 transition-colors">
              <div className="w-9 h-9 rounded-[3px] bg-amber-50 text-[#f59e0b] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase text-slate-900 tracking-wide">
                  Tuyển Dụng &amp; Nhân Sự
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Tiếp nhận CV kỹ sư công trình, trắc đạc, chỉ huy trưởng &amp; cán bộ kỹ thuật.
                </p>
                <div className="mt-2">
                  <Link
                    href="/tuyen-dung"
                    className="text-[11px] font-bold text-[#ed3237] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Xem các vị trí đang tuyển</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
