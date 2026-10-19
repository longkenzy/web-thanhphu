"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Route, Layers, Wrench, Check, ArrowRight } from "lucide-react";

// Advanced Interactive 3D Tilt Card Component with Parallax Depth & Dynamic Light Sheen
function Service3DCard({
  item,
}: {
  item: {
    tag: string;
    icon: any;
    title: string;
    desc: string;
    image: string;
    bullets: string[];
    link: string;
  };
}) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle & elegant 3D tilt calculation (-3.5 to +3.5 degrees)
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const shadowX = -rotate.y * 0.8;
  const shadowY = rotate.x * 0.8 + 8;

  return (
    <div
      style={{ perspective: "1200px" }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1200px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(8px) scale3d(1.012, 1.012, 1.012)`
            : "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)",
          boxShadow: isHovered
            ? `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 18px -4px rgba(237, 50, 55, 0.16), 0 6px 14px -3px rgba(15, 23, 42, 0.08)`
            : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.15s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white rounded-[3px] border border-slate-200 hover:border-[#ed3237]/60 overflow-hidden flex flex-col justify-between group cursor-pointer select-none"
      >
        {/* Dynamic 3D Glare / Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 70%)`,
          }}
        />

        {/* Top Image Section with 3D Depth */}
        <div style={{ transform: "translateZ(6px)", transformStyle: "preserve-3d" }}>
          <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient vignette over image bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

            {/* Blue Brand Badge popping out on Z axis */}
            <div
              className="absolute top-2.5 left-2.5 z-20"
              style={{
                transform: isHovered ? "translateZ(14px)" : "translateZ(0px)",
                transition: "transform 0.2s ease-out",
              }}
            >
              <span className="px-2.5 py-0.5 bg-[#3e4095] text-white text-[11px] font-bold uppercase tracking-wider rounded-[2px] shadow-md inline-block">
                {item.tag}
              </span>
            </div>
          </div>

          {/* Body Content with multi-layer 3D Depth */}
          <div className="p-3.5 sm:p-4 space-y-2.5" style={{ transform: "translateZ(8px)" }}>
            {/* Icon popping out */}
            <div
              className="w-7 h-7 rounded-[3px] bg-red-50 text-[#ed3237] flex items-center justify-center transition-all duration-300 group-hover:scale-108 group-hover:bg-[#ed3237] group-hover:text-white group-hover:shadow-md"
              style={{
                transform: isHovered ? "translateZ(12px)" : "translateZ(0px)",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>

            {/* Title */}
            <h3
              className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#ed3237] transition-colors leading-snug line-clamp-1"
              style={{
                transform: isHovered ? "translateZ(10px)" : "translateZ(0px)",
              }}
            >
              {item.title}
            </h3>

            {/* Short Description */}
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
              {item.desc}
            </p>

            {/* Dashed Separator + Bullets */}
            <div className="border-t border-dashed border-slate-200 pt-2.5 space-y-1.5">
              {item.bullets.map((b, bIdx) => (
                <div
                  key={bIdx}
                  className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-600 font-normal"
                >
                  <Check className="w-3.5 h-3.5 text-[#3e4095] shrink-0 mt-0.5" />
                  <span className="leading-tight">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Link Button */}
        <div
          className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1"
          style={{
            transform: isHovered ? "translateZ(8px)" : "translateZ(0px)",
            transition: "transform 0.2s ease-out",
          }}
        >
          <Link
            href={item.link}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ed3237] hover:text-[#3e4095] uppercase tracking-wider transition-all group-hover:gap-2.5"
          >
            <span>XEM CHI TIẾT</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const services = [
    {
      tag: "DÂN DỤNG & CÔNG NGHIỆP",
      icon: Building2,
      title: "Công Trình Dân Dụng & Công Nghiệp",
      desc: "Xây dựng, thi công lắp đặt, sửa chữa các công trình dân dụng và công trình công nghiệp.",
      image: "/xay-dung-dan-dung-cong-nghiep.png",
      bullets: [
        "Xây dựng mới & cải tạo sửa chữa",
        "Nhà cao tầng, văn phòng, nhà xưởng",
        "Kết cấu bê tông & thép tiền chế",
      ],
      link: "/linh-vuc-hoat-dong#dan-dung-cong-nghiep",
    },
    {
      tag: "GIAO THÔNG & HẠ TẦNG",
      icon: Route,
      title: "Giao Thông, Hạ Tầng & Cấp Thoát Nước",
      desc: "Xây dựng công trình giao thông (Cầu - Đường bộ), các công trình hạ tầng kỹ thuật, cấp thoát nước.",
      image: "/xay-dung-giao-thong-ha-tang.png",
      bullets: [
        "Công trình cầu & đường bộ",
        "Hạ tầng kỹ thuật khu đô thị, KCN",
        "Hệ thống cấp thoát nước ngầm",
      ],
      link: "/linh-vuc-hoat-dong#giao-thong-ha-tang",
    },
    {
      tag: "NHÔM KÍNH & uPVC",
      icon: Layers,
      title: "Cửa Nhựa Lõi Thép & Cửa Nhôm Kính",
      desc: "Sản xuất, thi công lắp đặt cửa nhựa lõi thép uPVC và hệ cửa nhôm kính cao cấp.",
      image: "/san-xuat-cua-nhua-upvc-nhom-kinh.png",
      bullets: [
        "Cửa nhựa uPVC lõi thép gia cường",
        "Cửa nhôm kính Xingfa & hệ châu Âu",
        "Vách kính mặt dựng kiến trúc cao cấp",
      ],
      link: "/linh-vuc-hoat-dong#nhom-kinh-upvc",
    },
    {
      tag: "THIẾT BỊ & VẬT LIỆU",
      icon: Wrench,
      title: "Máy Móc Thiết Bị & Vật Liệu Xây Dựng",
      desc: "Kinh doanh máy móc thiết bị cơ giới thi công và phân phối các loại vật liệu xây dựng.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      bullets: [
        "Kinh doanh & cho thuê thiết bị cơ giới",
        "Vật liệu xây dựng thô & hoàn thiện",
        "Kiểm định an toàn & giao hàng tận nơi",
      ],
      link: "/linh-vuc-hoat-dong#thiet-bi-vat-lieu",
    },
  ];

  return (
    <section id="services" className="py-6 sm:py-8 lg:py-10 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with compact spacing */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-6 sm:mb-8 reveal-on-scroll">
          <div>
            <span className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#ed3237] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md shadow-[#ed3237]/30">
              NĂNG LỰC CỐT LÕI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            LĨNH VỰC HOẠT ĐỘNG CHÍNH
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
            Mục tiêu hàng đầu của THÀNH PHÚ là cung cấp các dịch vụ chuyên nghiệp và hiệu quả nhất trong lĩnh vực Xây dựng - Dân dụng - Trang trí nội ngoại thất.
          </p>
        </div>

        {/* 4 Columns Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((item, idx) => (
            <div key={idx} className={`reveal-on-scroll delay-${(idx + 1) * 100}`}>
              <Service3DCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
