"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUp, ChevronRight } from "lucide-react";
import { CompanySettings } from "@/types";

interface FooterProps {
  settings: CompanySettings;
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#151f32] text-slate-200 border-t-2 border-[#ed3237] pt-14 sm:pt-16 pb-12 relative overflow-hidden">
      {/* Subtle ambient light gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3e4095]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ed3237]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-12 border-b border-slate-700/70">
          {/* Cột 1: Thông tin doanh nghiệp */}
          <div className="space-y-4 lg:col-span-3 xl:col-span-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Thành Phú Logo"
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-contain object-left drop-shadow"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              <strong className="text-white block font-bold mb-1 text-[15px]">{settings.name}</strong>
              Doanh nghiệp hoạt động chuyên sâu trong lĩnh vực thi công xây dựng dân dụng &amp; công nghiệp, công trình hạ tầng giao thông và kết cấu kỹ thuật cao.
            </p>
            <div className="pt-1 text-sm text-slate-300 space-y-1.5">
              <div>
                Mã số doanh nghiệp: <span className="text-white font-bold">{settings.taxCode || "0310001821"}</span>
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">Cấp bởi: Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh</div>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ed3237]" />
              <span>Liên Kết Nhanh</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Giới thiệu doanh nghiệp</span>
                </Link>
              </li>
              <li>
                <Link href="/linh-vuc-hoat-dong" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Lĩnh vực hoạt động</span>
                </Link>
              </li>
              <li>
                <Link href="/cong-trinh" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Công trình tiêu biểu</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Tin tức &amp; Sự kiện</span>
                </Link>
              </li>
              <li>
                <Link href="/tuyen-dung" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Cơ hội tuyển dụng</span>
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Liên hệ hợp tác</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hạng mục công trình */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ed3237]" />
              <span>Hạng Mục Công Trình</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  href="/cong-trinh?category=dan-dung-cao-tang"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Xây dựng dân dụng &amp; cao tầng</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-trinh?category=cong-nghiep-nha-xuong"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Công trình công nghiệp &amp; nhà xưởng</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-trinh?category=ha-tang-giao-thong"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Hạ tầng kỹ thuật &amp; giao thông</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-trinh?category=ket-cau-thep-nhom-kinh"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Kết cấu thép &amp; nhôm kính</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cong-trinh?category=trang-tri-noi-that"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ed3237] shrink-0" />
                  <span>Thi công trang trí nội thất</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ trụ sở & Fanpage */}
          <div className="space-y-4 lg:col-span-5 xl:col-span-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ed3237]" />
              <span>Liên Hệ Trụ Sở</span>
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ed3237] shrink-0 mt-1" />
                <span className="leading-snug">{settings.address || "22A Vũ Ngọc Phan, Phường Bình Lợi Trung, Tp. Hồ Chí Minh"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ed3237] shrink-0" />
                {settings.phone && settings.hotline && settings.phone !== settings.hotline ? (
                  <span className="font-semibold text-white">
                    <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} className="hover:text-red-400 transition-colors">
                      {settings.phone}
                    </a>{" "}
                    /{" "}
                    <a href={`tel:${settings.hotline.replace(/[^0-9]/g, "")}`} className="hover:text-red-400 transition-colors">
                      {settings.hotline}
                    </a>
                  </span>
                ) : (
                  <a
                    href={`tel:${(settings.hotline || settings.phone || "(028) 3553 0675").replace(/[^0-9]/g, "")}`}
                    className="font-semibold text-white hover:text-red-400 transition-colors"
                  >
                    {settings.hotline || settings.phone || "(028) 3553 0675"}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ed3237] shrink-0" />
                <a
                  href={`mailto:${settings.email || "thanhphuhcns@gmail.com"}`}
                  className="text-slate-200 hover:text-white transition-colors break-all"
                >
                  {settings.email || "thanhphuhcns@gmail.com"}
                </a>
              </div>
            </div>

            {/* Frame Facebook Fanpage */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Fanpage Facebook</span>
                </span>
                <a
                  href="https://www.facebook.com/xaylapthanhphu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#ed3237] hover:underline font-semibold"
                >
                  Xem trang ↗
                </a>
              </div>
              <div className="w-full max-w-[340px] overflow-hidden rounded-[3px] border border-slate-700 bg-white shadow-sm">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fxaylapthanhphu&tabs=&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                  width="340"
                  height="130"
                  style={{ border: "none", overflow: "hidden", height: "130px", minWidth: "180px" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Fanpage - Công ty CP Đầu tư Xây lắp Thành Phú"
                  className="w-full block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div>
            © {new Date().getFullYear()} CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">Tiêu chuẩn ISO 9001:2015 & OHSAS 18001</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-[3px] bg-slate-800 hover:bg-[#ed3237] text-slate-300 hover:text-white border border-slate-700 transition-all shadow"
              aria-label="Về đầu trang"
              title="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Logo Red Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-[3px] bg-[#ed3237] hover:bg-[#d0282d] text-white shadow-xl shadow-[#ed3237]/35 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Về đầu trang"
        title="Lên đầu trang"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </footer>
  );
}
