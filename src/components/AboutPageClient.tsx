"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Eye, Target, Gem, Sparkles, Quote } from "lucide-react";
import { CompanySettings } from "@/types";

interface AboutPageClientProps {
  settings: CompanySettings;
}

// Reusable 8-Point Rosette Icon matching Image 1
function RosetteIcon({ color = "#ed3237" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 2l1.6 3.6 3.8-1.2-.4 4 3.7 1.5-2.5 3.1 2.5 3.1-3.7 1.5.4 4-3.8-1.2L12 22l-1.6-3.6-3.8 1.2.4-4-3.7-1.5 2.5-3.1-2.5-3.1 3.7-1.5-.4-4 3.8 1.2L12 2z" />
    </svg>
  );
}

// 3D Tilt Container with Mouse Parallax & Dynamic Light Glare
function TiltCard({
  children,
  className = "",
  maxTilt = 5,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
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

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.16 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const shadowX = -rotate.y * 1.1;
  const shadowY = rotate.x * 1.1 + 8;

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1200px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(10px) scale3d(1.015, 1.015, 1.015)`
            : "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)",
          boxShadow: isHovered
            ? `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 24px -4px rgba(237, 50, 55, 0.16), 0 12px 24px -4px rgba(15, 23, 42, 0.10)`
            : "0 2px 6px 0 rgba(0, 0, 0, 0.04)",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.15s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative transition-colors select-none ${className}`}
      >
        {/* Dynamic Light Sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}



export default function AboutPageClient({ settings }: AboutPageClientProps) {
  // Timeline Milestones matching Image 3
  const timelineMilestones = [
    {
      year: "2010",
      yearColor: "text-[#ed3237]",
      title: "Thành Lập Doanh Nghiệp",
      desc: "Khởi đầu với tên gọi Công ty CP Xây dựng TTNT Thành Phú, tập trung vào thiết kế thi công nội thất và hoàn thiện công trình dân dụng.",
    },
    {
      year: "2015",
      yearColor: "text-[#f59e0b]",
      title: "Mở Rộng Quy Mô Thi Công",
      desc: "Nâng cấp thành Công ty CP Đầu tư Xây lắp Thành Phú, chính thức tham gia thi công các dự án nhà cao tầng và hạ tầng kỹ thuật đô thị.",
    },
    {
      year: "2020",
      yearColor: "text-[#ed3237]",
      title: "Đầu Tư Nhà Xưởng Cơ Khí",
      desc: "Vận hành nhà máy chế tạo kết cấu thép và xưởng gia công cửa nhựa uPVC, vách kính mặt dựng công nghệ Đức, khép kín chuỗi giá trị xây lắp.",
    },
    {
      year: "2026",
      yearColor: "text-[#f59e0b]",
      title: "Chuyển Đổi Số & Bền Vững",
      desc: "Áp dụng công nghệ số hóa mô hình BIM, quản trị hiện đại, sẵn sàng đấu thầu và đảm nhận các siêu dự án công nghiệp & thương mại lớn.",
    },
  ];



  return (
    <div className="bg-white text-slate-800 pt-20 sm:pt-24 selection:bg-[#ed3237] selection:text-white">
      {/* 1. TỔNG QUAN DOANH NGHIỆP (PHẦN 1 - KHỚP 100% HÌNH 1) */}
      <section className="pt-6 sm:pt-10 pb-14 sm:pb-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 reveal-fade-left">
              {/* Badge matching Image 1: TỔNG QUAN DOANH NGHIỆP */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-[3px] bg-[#ed3237] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md shadow-[#ed3237]/25">
                  TỔNG QUAN DOANH NGHIỆP
                </span>
              </div>

              {/* Title matching Image 1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2] uppercase">
                Hành trình kiến tạo và phát triển
              </h1>

              {/* Paragraphs matching Image 1 */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Sự ra đời và phát triển của <strong className="font-bold text-slate-900">Công ty Cổ phần Đầu tư Xây lắp Thành Phú</strong> là dấu mốc khẳng định hành trình nỗ lực, học hỏi, lao động và sáng tạo không ngừng của <strong className="font-bold text-slate-900">Chủ tịch Phạm Hoàng Anh</strong> cùng những cộng sự đồng hành.
                </p>
                <p>
                  Trải qua nhiều thăng trầm, Thành Phú đã biến khó khăn thành cơ hội, thử thách thành động lực, từng bước khẳng định vị thế bằng bản lĩnh, niềm tin và khát vọng vươn lên. Từ những nền tảng ban đầu, tập thể Thành Phú hôm nay tiếp tục đồng lòng tiến về phía trước, viết tiếp hành trình phát triển và những giá trị bền vững cho tương lai.
                </p>
              </div>

              {/* 2 Feature Cards matching Image 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Khối 1: PHÁP LÝ MINH BẠCH (Red border-l) */}
                <div className="border-l-[3.5px] border-[#ed3237] pl-3.5 py-1.5 space-y-1 bg-slate-50/70 rounded-r-[3px]">
                  <div className="flex items-center gap-2">
                    <RosetteIcon color="#ed3237" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                      PHÁP LÝ MINH BẠCH
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Mã số doanh nghiệp {settings.taxCode || "0310001821"}, đầy đủ chứng chỉ năng lực xây dựng Hạng I từ Bộ Xây Dựng.
                  </p>
                </div>

                {/* Khối 2: QUẢN LÝ TIÊU CHUẨN (Amber/Gold border-l matching Image 1) */}
                <div className="border-l-[3.5px] border-[#f59e0b] pl-3.5 py-1.5 space-y-1 bg-slate-50/70 rounded-r-[3px]">
                  <div className="flex items-center gap-2">
                    <RosetteIcon color="#f59e0b" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                      QUẢN LÝ TIÊU CHUẨN
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Áp dụng toàn diện hệ thống ISO 9001:2015 và an toàn vệ sinh lao động OHSAS 18001.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Company Building Image with TiltCard & Floating 380+ Badge */}
            <div className="lg:col-span-5 relative reveal-fade-right group">
              <TiltCard className="rounded-[4px] overflow-hidden bg-slate-900 border border-slate-200 shadow-xl">
                <div className="relative min-h-[360px] sm:min-h-[420px] aspect-[4/3] sm:aspect-[16/12] w-full overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/x13kyocz/image/upload/v1792392592/thanhphu_about/toanhavanphong.png"
                    alt="Tòa nhà văn phòng Công ty Cổ phần Đầu tư Xây lắp Thành Phú"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Overlays for contrast and depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Red Badge: THÀNH PHÚ XD */}
                  <div className="absolute top-4 left-4 z-10" style={{ transform: "translateZ(14px)" }}>
                    <span className="inline-block px-3 py-1 rounded-[2px] bg-[#ed3237] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                      THÀNH PHÚ XD
                    </span>
                  </div>

                  {/* Bottom Text Panel with Red Left Indicator */}
                  <div
                    className="absolute bottom-4 left-4 right-4 z-10 p-3.5 sm:p-4 rounded-[3px] bg-slate-950/80 border-l-4 border-[#ed3237] backdrop-blur-md space-y-0.5"
                    style={{ transform: "translateZ(12px)" }}
                  >
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      Trụ sở văn phòng làm việc
                    </h3>
                    <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ed3237]">
                      CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Floating Solid Dark 3D Badge with 380+ Project Deliveries matching Image 1 */}
              <div
                className="absolute -bottom-6 right-2 sm:-right-4 z-20"
                style={{ perspective: "1000px" }}
              >
                <div className="p-4 sm:p-5 rounded-[3px] bg-[#0c1017] text-white border border-slate-800 border-b-4 border-b-[#ed3237] shadow-2xl shadow-black/80 min-w-[170px] sm:min-w-[190px] transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-amber-400 drop-shadow">
                    380+
                  </div>
                  <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider mt-1 text-white leading-snug">
                    DỰ ÁN BÀN GIAO THÀNH CÔNG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRIẾT LÝ PHÁT TRIỂN / TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI (PHẦN 2 - KHỚP HÌNH 2) */}
      <section className="py-14 sm:py-18 lg:py-20 bg-slate-50/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header matching Image 2 */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-14 reveal-on-scroll">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-[2px] bg-[#ed3237] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md shadow-[#ed3237]/30">
                TRIẾT LÝ PHÁT TRIỂN
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
              Kim chỉ nam soi sáng mọi quyết định và hành động của tập thể cán bộ công nhân viên Thành Phú.
            </p>
          </div>

          {/* 1. TẦM NHÌN & SỨ MỆNH (Bố cục 2 cột thoáng đãng, loại bỏ hoàn toàn viền rườm rà) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* TẦM NHÌN */}
            <div className="bg-white rounded-[4px] p-7 sm:p-9 lg:p-10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start space-y-4 reveal-on-scroll">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  TẦM NHÌN
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal pt-1">
                Trở thành một trong những công ty hàng đầu Việt Nam và Khu vực trong lĩnh vực thiết kế, xây dựng dân dụng &amp; công nghiệp; giao thông; hạ tầng kỹ thuật; cấp thoát nước; trang trí nội thất.
              </p>
            </div>

            {/* SỨ MỆNH */}
            <div className="bg-white rounded-[4px] p-7 sm:p-9 lg:p-10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start space-y-4 reveal-on-scroll">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3e4095] flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  SỨ MỆNH
                </h3>
              </div>

              <div className="space-y-3 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  Xây dựng những công trình quy mô lớn với công nghệ hiện đại, đạt tiến độ, chất lượng và thẩm mỹ cao.
                </p>
                <p>
                  Cung cấp sản phẩm chất lượng và dịch vụ thương mại tốt nhất, đem đến sự hài lòng khách hàng, tạo lợi ích cho nhà đầu tư.
                </p>
                <p>
                  Thực hiện chế độ đãi ngộ hợp lý về vật chất và tinh thần đối với cán bộ công nhân viên, tạo ra giá trị mới cho các cổ đông, đóng góp tích cực cho cộng đồng, góp phần vào sự phát triển kinh tế xã hội của đất nước.
                </p>
              </div>
            </div>
          </div>

          {/* 2. GIÁ TRỊ CỐT LÕI */}
          <div className="mt-8 sm:mt-10 bg-white rounded-[4px] shadow-sm p-7 sm:p-9 lg:p-10 reveal-on-scroll">
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0">
                <Gem className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                GIÁ TRỊ CỐT LÕI
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  num: "01",
                  title: "Định hướng khách hàng",
                  desc: "Là nền tảng hoạt động.",
                },
                {
                  num: "02",
                  title: "Sản phẩm hoàn mỹ",
                  desc: "Cam kết Chất lượng – Tiến độ - An toàn.",
                },
                {
                  num: "03",
                  title: "Dịch vụ hoàn hảo",
                  desc: "Chuyên nghiệp - Sáng tạo - Hiệu quả.",
                },
                {
                  num: "04",
                  title: "Môi trường làm việc thân thiện",
                  desc: "Đoàn kết – Hợp tác – Chia sẻ.",
                },
                {
                  num: "05",
                  title: "Phát triển bền vững",
                  desc: "Nâng cao chất lượng đời sống của CBCNV.",
                },
                {
                  num: "06",
                  title: "Trách nhiệm cộng đồng",
                  desc: "Chia sẻ trách nhiệm cộng đồng.",
                },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[4px] bg-slate-50/80 hover:bg-red-50/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black text-[#ed3237] bg-white px-2.5 py-0.5 rounded-[2px] shadow-2xs">
                        {val.num}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-snug">
                      {val.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. TRIẾT LÝ KINH DOANH */}
          <div className="mt-8 sm:mt-10 bg-white rounded-[4px] shadow-sm p-7 sm:p-9 lg:p-10 reveal-on-scroll">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  TRIẾT LÝ KINH DOANH
                </h3>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#ed3237] bg-red-50 px-3.5 py-1.5 rounded-[3px] self-start sm:self-auto">
                “UY TÍN – TẦM NHÌN – PHÁT TRIỂN”
              </div>
            </div>

            {/* 3 Trụ cột: Uy tín - Tầm nhìn - Phát triển */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 rounded-[4px] bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#ed3237] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase">
                    UY TÍN
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Là sản phẩm của doanh nghiệp tạo ra được khách hàng công nhận.
                </p>
              </div>

              <div className="p-5 rounded-[4px] bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase">
                    TẦM NHÌN
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Là các mục tiêu mà doanh nghiệp mong muốn đạt được.
                </p>
              </div>

              <div className="p-5 rounded-[4px] bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase">
                    PHÁT TRIỂN
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Là quy tắc nhân văn mà doanh nghiệp đặt ra để đảm bảo cân bằng lợi ích kinh tế xã hội.
                </p>
              </div>
            </div>

            {/* Khẳng định triết lý */}
            <div className="mt-6 p-5 rounded-[4px] bg-slate-50/80">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                Với triết lý kinh doanh <strong className="text-slate-900 not-italic font-bold">“Uy tín – Tầm nhìn – Phát triển”</strong>, THÀNH PHÚ muốn khẳng định: <span className="text-[#ed3237] font-semibold not-italic">“Tạo được niềm tin từ khách hàng, với tầm nhìn sâu rộng của tập thể Ban Lãnh Đạo công ty, THÀNH PHÚ chắc chắn sẽ phát triển ngày càng bền vững…”</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DẤU ẤN PHÁT TRIỂN / CHẶNG ĐƯỜNG HÌNH THÀNH & LỚN MẠNH (PHẦN 3 - KHỚP HÌNH 3) */}
      <section className="py-14 sm:py-18 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header matching Image 3 */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-14 reveal-on-scroll">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-[2px] bg-[#ed3237] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md shadow-[#ed3237]/30">
                DẤU ẤN PHÁT TRIỂN
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              CHẶNG ĐƯỜNG HÌNH THÀNH & LỚN MẠNH
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
              Những cột mốc đáng tự hào đánh dấu sự chuyển mình mạnh mẽ của Thành Phú qua từng thời kỳ.
            </p>
          </div>

          {/* 4 Timeline Columns Grid matching Image 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timelineMilestones.map((item, idx) => (
              <div key={idx} className={`reveal-on-scroll delay-${(idx + 1) * 100}`}>
                <TiltCard
                  className="bg-white rounded-[3px] border border-slate-200 hover:border-[#ed3237]/50 p-6 flex flex-col justify-between shadow-sm h-full"
                >
                  <div className="space-y-3" style={{ transform: "translateZ(10px)" }}>
                    <div className={`text-3xl sm:text-4xl font-black tracking-tight ${item.yearColor}`}>
                      {item.year}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THÔNG ĐIỆP CỦA CHỦ TỊCH */}
      <section className="py-14 sm:py-18 lg:py-20 bg-slate-50/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal-on-scroll">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              THÔNG ĐIỆP CỦA CHỦ TỊCH
            </h2>
          </div>

          {/* Letter Container */}
          <div className="bg-white rounded-[3px] border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 relative reveal-on-scroll overflow-hidden">
            {/* Top Red-Gold-Blue Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ed3237] via-[#f59e0b] to-[#3e4095]" />

            {/* Letter Header */}
            <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-slate-100">
              <div className="w-11 h-11 rounded-full bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 border border-red-100">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  CÔNG TY CP ĐẦU TƯ XÂY LẮP THÀNH PHÚ
                </h3>
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
              <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                CÔNG TY CP ĐẦU TƯ XÂY LẮP THÀNH PHÚ gửi đến toàn thể các quí vị lời chào trân trọng và cảm ơn sâu sắc vì sự tin tưởng, hợp tác tốt đẹp, bền vững và đồng hành cùng chúng tôi hướng đến thành công.
              </p>

              <p>
                Ngay từ khi thành lập, từ những bước đi chập chững đầu tiên, THÀNH PHÚ đã xác định mục tiêu trở thành doanh nghiệp hàng đầu về kinh doanh trong lĩnh vực thiết kế xây dựng dân dụng, công nghiệp, trang trí nội ngoại thất. Ý thức được sứ mệnh cao cả, đầy trách nhiệm và thách thức đó, mỗi thành viên trong đại gia đình THÀNH PHÚ luôn trăn trở trong tim một ngọn lửa thôi thúc, với một tấm lòng trong sáng, với niềm khát khao được cống hiến những gì tốt đẹp nhất cho cuộc đời.
              </p>

              <p>
                Từ những ngày đầu thành lập khó khăn gian khổ, cơ sở vật chất thiếu thốn, trang thiết bị thô sơ, toàn thể anh chị em cán bộ công nhân viên THÀNH PHÚ đã cùng Ban Tổng Giám Đốc đoàn kết, nổ lực phấn đấu, cầu thị, vượt lên chính mình, phát huy các thế mạnh để có sự phát triển vượt bậc.
              </p>

              <p>
                Trải qua hàng loạt những biến động của thị trường. THÀNH PHÚ vẫn luôn đứng vững và phát triển, khẳng định vị thế của mình trên thị trường Việt Nam, giữ vững niềm tin trong tâm trí khách hàng và các đối tác.
              </p>

              {/* 5 Core Requirements Highlight Box */}
              <div className="my-6 p-4 sm:p-5 rounded-[3px] bg-slate-50 border border-slate-200/90 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                  Là một nhà thầu chuyên nghiệp chúng tôi luôn tâm niệm một dự án phải đáp ứng được 5 (năm) yêu cầu cơ bản. Đó là:
                </p>
                <div className="inline-block px-4 py-2 rounded-[2px] bg-red-50 border border-red-200 text-[#ed3237] text-xs sm:text-sm font-black tracking-wide uppercase shadow-2xs">
                  &ldquo;CHẤT LƯỢNG – AN TOÀN – ĐÚNG TIẾN ĐỘ - BẢO HÀNH – GIÁ HỢP LÝ&rdquo;
                </div>
              </div>

              <p>
                Với đội ngũ quản lý, cán bộ kỹ thuật và công nhân chuyên ngành có kinh nghiệm, năng lực dồi dào, giàu nhiệt huyết kết hợp với hệ thống thiết bị máy móc đồng bộ, hiện đại, và từ cái tâm, cái tầm của những người dám nghĩ, dám làm, dám đi tiên phong. THÀNH PHÚ cam kết sẽ tiếp tục mang đến cho Quý khách hàng, Quý đối tác và các Cổ đông nhiều lợi ích hơn nữa. Chúng tôi có niềm tin vững chắc rằng THÀNH PHÚ đủ cơ sở để đạt những mục tiêu chiến lược đã đề ra, sẵn sàng vươn ra biển lớn và trở thành niềm tự hào của ngành.
              </p>

              <p>
                Qua tâm thư này với các tiêu chí phục vụ như trên chúng tôi mong muốn được hợp tác với Chủ đầu tư trong các dự án của quý vị.
              </p>
            </div>

            {/* Letter Sign-off */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-xs text-slate-400 italic">
                Thành phố Hồ Chí Minh, Việt Nam
              </div>
              <div className="text-left sm:text-right space-y-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  Trân trọng!
                </div>
                <div className="text-xs font-black text-[#ed3237] uppercase tracking-wider">
                  CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ
                </div>
                <div className="text-xs font-semibold text-slate-600 uppercase">
                  CÔNG TY CP ĐẦU TƯ XÂY LẮP THÀNH PHÚ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
