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
  Send,
  MessageSquare,
  Briefcase,
  Wrench,
  Users,
  CheckCircle2,
  FileDown,
  Sparkles,
  Building,
} from "lucide-react";
import { CompanySettings } from "@/types";

interface ContactPageClientProps {
  settings: CompanySettings;
}

export default function ContactPageClient({ settings }: ContactPageClientProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "dan-dung-cao-tang",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Vui lòng nhập họ và tên của bạn");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Vui lòng cung cấp số điện thoại liên hệ");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          category: "dan-dung-cao-tang",
          message: "",
        });
      } else {
        const data = await res.json();
        setFormError(data.error || "Có lỗi xảy ra khi gửi tin nhắn, vui lòng thử lại");
      }
    } catch {
      setFormError("Không thể kết nối đến máy chủ, vui lòng thử gọi hotline trực tiếp");
    } finally {
      setIsSubmitting(false);
    }
  };

  const address = settings.address || "22A Vũ Ngọc Phan, Phường Bình Lợi Trung, Tp. Hồ Chí Minh";
  const hotline = settings.hotline || settings.phone || "(028) 3553 0675";
  const email = settings.email || "thanhphuhcns@gmail.com";
  const taxCode = settings.taxCode || "0312019045";
  const companyName = settings.name || "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ";

  const googleMapsEmbedUrl =
    "https://maps.google.com/maps?q=22A+V%C5%A9+Ng%E1%BB%8Dc+Phan,+Ph%C6%B0%E1%BB%9Dng+B%C3%ACnh+L%E1%BB%A3i+Trung,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=22A+V%C5%A9+Ng%E1%BB%8Dc+Phan,+Ph%C6%B0%E1%BB%9Dng+B%C3%ACnh+L%E1%BB%A3i+Trung,+H%E1%BB%93+Ch%C3%AD+Minh";

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pt-28 sm:pt-32 pb-20 selection:bg-[#ed3237] selection:text-white">
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
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-red-50 text-[#ed3237] text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KẾT NỐI VÀ HỢP TÁC • THÀNH PHÚ JSC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Liên Hệ &amp; Tư Vấn Dự Án
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Thành Phú JSC luôn sẵn sàng lắng nghe, tư vấn giải pháp kỹ thuật tối ưu và đồng hành cùng các chủ đầu tư,
            đối tác trong mọi công trình trên toàn quốc.
          </p>
        </div>

        {/* Main 2-Column Split: Direct Contact Info (Left) + Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* CỘT TRÁI (5/12): Thông Tin Doanh Nghiệp & Kênh Liên Hệ Nhanh */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-[4px] border border-slate-200 p-6 sm:p-7 shadow-xs">
              {/* Company Identity */}
              <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
                <div className="relative w-12 h-12 shrink-0 rounded-[3px] bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center">
                  <Image src="/logo.png" alt="" width={42} height={42} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#ed3237] tracking-wider uppercase block">
                    {settings.shortName || "THÀNH PHÚ JSC"}
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
              <div className="divide-y divide-slate-100 pt-1">
                {/* 1. Trụ sở chính */}
                <div className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Trụ sở làm việc
                      </div>
                      <div className="text-xs sm:text-[13px] font-semibold text-slate-900 mt-0.5 leading-snug">
                        {address}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
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
                <div className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Hotline tư vấn &amp; Báo giá
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 font-mono">
                        {hotline}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
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
                <div className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Thư điện tử chính thức
                      </div>
                      <div className="text-xs sm:text-[13px] font-semibold text-slate-900 mt-0.5 break-all">
                        {email}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
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
                <div className="pt-4">
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
            <div className="bg-slate-100/90 border border-slate-200/80 rounded-[4px] p-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileDown className="w-4 h-4 text-[#ed3237] shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Hồ Sơ Năng Lực Doanh Nghiệp</div>
                  <div className="text-[11px] text-slate-500">Xem các công trình tiêu biểu &amp; máy móc thiết bị</div>
                </div>
              </div>
              <Link
                href="/cong-trinh"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[3px] bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-[11px] shadow-2xs transition-colors shrink-0"
              >
                <span>Xem dự án</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI (7/12): Form Gửi Yêu Cầu Tư Vấn / Báo Giá Trực Tuyến Hiện Đại */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[4px] border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ed3237] uppercase tracking-wider mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>TIẾP NHẬN YÊU CẦU TRỰC TUYẾN</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Gửi Yêu Cầu Tư Vấn &amp; Báo Giá
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Quý khách vui lòng để lại thông tin, đội ngũ kỹ sư Thành Phú JSC sẽ liên hệ lại trong vòng 24h làm việc.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Gửi thông tin thành công!</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                      Cảm ơn Quý khách đã tin tưởng Thành Phú JSC. Chúng tôi đã nhận được yêu cầu và sẽ liên hệ lại
                      qua số điện thoại cung cấp trong thời gian sớm nhất.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Gửi thêm yêu cầu khác</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-[3px] bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Họ tên */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên của bạn / Tên đơn vị <span className="text-[#ed3237]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An - Công ty ABC"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#ed3237] focus:ring-1 focus:ring-[#ed3237]/20 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Điện thoại & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại liên hệ <span className="text-[#ed3237]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#ed3237] focus:ring-1 focus:ring-[#ed3237]/20 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#ed3237] focus:ring-1 focus:ring-[#ed3237]/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Lĩnh vực / Chuyên mục quan tâm */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hạng mục công trình / Dịch vụ cần tư vấn
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#ed3237] focus:ring-1 focus:ring-[#ed3237]/20 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="dan-dung-cao-tang">Xây dựng dân dụng và cao tầng</option>
                      <option value="cong-nghiep-nha-xuong">Công trình công nghiệp và nhà xưởng</option>
                      <option value="ha-tang-giao-thong">Hạ tầng kỹ thuật và giao thông</option>
                      <option value="ket-cau-thep-nhom-kinh">Kết cấu thép và nhôm kính</option>
                      <option value="trang-tri-noi-that">Thi công trang trí nội thất</option>
                      <option value="hop-tac-dau-thau">Hợp tác liên danh &amp; Dự thầu</option>
                      <option value="yeu-cau-khac">Yêu cầu tư vấn khác</option>
                    </select>
                  </div>

                  {/* Nội dung chi tiết */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nội dung yêu cầu / Thông tin sơ bộ về dự án
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Mô tả tóm tắt quy mô công trình, địa điểm thi công hoặc yêu cầu khảo sát, báo giá..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-[#ed3237] focus:ring-1 focus:ring-[#ed3237]/20 focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {/* Nút gửi */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-[3px] bg-[#ed3237] hover:bg-[#d0282d] text-white font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Đang gửi thông tin...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Gửi thông tin liên hệ</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-400 block mt-2">
                      * Mọi thông tin gửi qua website được bảo mật theo chính sách quyền riêng tư của công ty.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width Interactive Google Maps Card */}
        <div className="bg-white rounded-[4px] border border-slate-200 p-6 sm:p-7 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#ed3237] uppercase tracking-wider mb-0.5">
                <MapPin className="w-4 h-4" />
                <span>BẢN ĐỒ VỊ TRÍ TRỤ SỞ</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                Vị Trí Văn Phòng Trên Google Maps
              </h2>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-slate-900 hover:bg-[#ed3237] text-white text-xs font-bold transition-colors shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở trên ứng dụng Google Maps</span>
            </a>
          </div>

          <div className="relative w-full h-[360px] sm:h-[440px] rounded-[3px] overflow-hidden border border-slate-200 bg-slate-100">
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

          <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
              <span>Địa chỉ: {address}</span>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ed3237] font-semibold hover:underline"
            >
              Chỉ đường chi tiết đến văn phòng &rarr;
            </a>
          </div>
        </div>

        {/* 3 Compact Department Strips (Kênh Liên Hệ Chuyên Trách Gọn Gàng) */}
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
