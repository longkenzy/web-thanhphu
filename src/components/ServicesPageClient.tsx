"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Building2,
  Route,
  Layers,
  Wrench,
  Factory,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { CompanySettings } from "@/types";

interface ServicesPageClientProps {
  settings: CompanySettings;
}

interface ServiceDetail {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  techHighlights: string[];
  equipmentList: string[];
}

export default function ServicesPageClient({ settings }: ServicesPageClientProps) {
  const servicesData: ServiceDetail[] = [
    {
      id: "dan-dung-cong-nghiep",
      tag: "DÂN DỤNG & CÔNG NGHIỆP",
      title: "Xây dựng, thi công lắp đặt, sửa chữa các công trình dân dụng, công trình công nghiệp",
      shortDesc: "Tổng thầu thi công xây lắp mới, cải tạo, sửa chữa các công trình dân dụng, khu đô thị, văn phòng và nhà xưởng công nghiệp quy mô lớn.",
      fullDesc:
        "Thành Phú đảm nhận vai trò tổng thầu thi công xây dựng trọn gói từ giai đoạn thi công móng, kết cấu bê tông cốt thép, khung nhà xưởng công nghiệp đến lắp đặt hoàn thiện và sửa chữa nâng cấp công trình. Chúng tôi áp dụng quy trình kiểm soát chất lượng đạt chuẩn ISO 9001:2015, bảo đảm công trình đạt tiến độ nhanh, độ bền kết cấu vững chắc và thẩm mỹ hiện đại.",
      image: "/xay-dung-dan-dung-cong-nghiep.png",
      iconName: "building",
      techHighlights: [
        "Thi công xây dựng mới các công trình dân dụng: tòa nhà văn phòng, khu căn hộ, nhà ở dân dụng",
        "Xây dựng công trình công nghiệp: nhà xưởng sản xuất, kho bãi logistics, kết cấu thép khẩu độ lớn",
        "Thi công lắp đặt hoàn thiện nội ngoại thất, hệ thống kỹ thuật công trình đồng bộ",
        "Dịch vụ bảo dưỡng, sửa chữa, cải tạo và nâng cấp chuyển đổi công năng các công trình hiện hữu",
        "Quản lý chất lượng thi công theo tiêu chuẩn ISO 9001:2015 và kiểm soát an toàn OHSAS 18001",
      ],
      equipmentList: [
        "Dàn cẩu tháp tự nâng tải trọng 8 – 16 tấn và hệ thống vận thăng lồng an toàn",
        "Xe bơm bê tông cần 52m cùng hệ cốp pha nhôm liền khối hiện đại",
        "Máy xoa nền bê tông đôi laser phẳng, máy cắt uốn cốt thép thủy lực tự động",
        "Trang thiết bị trắc đạc laser và kiểm định độ chịu lực kết cấu chính xác",
      ],
    },
    {
      id: "giao-thong-ha-tang",
      tag: "GIAO THÔNG & HẠ TẦNG",
      title: "Xây dựng các công trình giao thông (Cầu - Đường bộ). Các công trình hạ tầng kỹ thuật, cấp thoát nước",
      shortDesc: "Thi công đường giao thông, cầu đường bộ, san lấp mặt bằng, mạng lưới cấp thoát nước ngầm và hạ tầng kỹ thuật đô thị, KCN.",
      fullDesc:
        "Với kinh nghiệm triển khai nhiều dự án hạ tầng trọng điểm và sở hữu đoàn cơ giới hùng hậu, Thành Phú trực tiếp thi công các công trình giao thông đường bộ, cầu giao thông và hạ tầng kỹ thuật đồng bộ cho các khu công nghiệp, khu đô thị. Chúng tôi thi công mạng lưới cấp thoát nước mưa, thoát nước thải, cống hộp bê tông ly tâm và trạm xử lý nước đạt chuẩn bảo vệ môi trường.",
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80",
      iconName: "route",
      techHighlights: [
        "Thi công xây dựng các công trình giao thông cầu và đường bộ, nút giao thông kết nối",
        "Thảm bê tông nhựa asphalt, đổ bê tông xi măng mặt đường chất lượng cao, thoát nước êm thuận",
        "Xây dựng hoàn thiện hệ thống hạ tầng kỹ thuật cho các khu đô thị và khu công nghiệp",
        "Lắp đặt mạng lưới cống hộp bê tông cốt thép, đường ống cấp nước sạch và thoát nước ngầm",
        "San lấp mặt bằng khối lượng lớn với hệ thống máy móc cơ giới công suất cao",
      ],
      equipmentList: [
        "Đoàn xe ủi công suất lớn D6, D85 và máy đào bánh xích gầu 0.9 – 1.6 m³",
        "Dàn xe lu rung 16 – 25 tấn, máy rải thảm chuyên dụng kiểm soát độ chặt K98",
        "Cần cẩu bánh lốp và bánh xích lắp đặt cống hộp, cấu kiện dầm bê tông đúc sẵn",
        "Thiết bị trắc đạc định vị GPS cao độ và máy đo độ nén chặt nền móng",
      ],
    },
    {
      id: "nhom-kinh-upvc",
      tag: "NHÔM KÍNH & uPVC",
      title: "Sản xuất, thi công lắp đặt cửa nhựa lõi thép uPVC; cửa nhôm kính",
      shortDesc: "Nhà xưởng gia công trực tiếp và thi công lắp đặt hệ cửa nhựa uPVC gia cường lõi thép, hệ cửa nhôm kính, vách kính mặt dựng cao cấp.",
      fullDesc:
        "Thành Phú vận hành nhà xưởng gia công cơ khí chuyên nghiệp, sản xuất trực tiếp và lắp đặt hoàn thiện các sản phẩm cửa nhựa lõi thép uPVC và hệ cửa nhôm kính kiến trúc cao cấp. Dây chuyền cắt ép góc công nghệ cao bảo đảm độ kín khít tuyệt đối, cách âm, cách nhiệt vượt trội, chống ăn mòn và thẩm mỹ sắc nét cho mọi công trình dân dụng, tòa nhà cao tầng và biệt thự.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      iconName: "layers",
      techHighlights: [
        "Sản xuất cửa nhựa uPVC profile cao cấp với lõi thép mạ kẽm gia cường chống cong vênh",
        "Gia công lắp đặt cửa nhôm kính định hình (hệ Xingfa, hệ nhôm rãnh C châu Âu) chuẩn xác",
        "Thi công vách kính mặt dựng, lan can kính cường lực, mái kính an toàn cho công trình cao ốc",
        "Phụ kiện kim khí đồng bộ nhập khẩu, hệ gioăng cao su EPDM kép chống thấm nước và cách âm",
        "Kiểm định chất lượng nghiêm ngặt về khả năng chịu lực gió, áp lực nước và độ bền vận hành",
      ],
      equipmentList: [
        "Máy cắt nhôm 2 đầu kỹ thuật số và máy cắt thanh profile uPVC tự động độ chính xác cao",
        "Máy ép góc thủy lực kỹ thuật số, máy hàn cửa nhựa đa điểm liền mạch",
        "Máy phay đố, máy khoét khóa CNC công nghệ Đức",
        "Thiết bị hít kính chân không chuyên dụng phục vụ lắp dựng mặt dựng trên cao an toàn",
      ],
    },
    {
      id: "thiet-bi-vat-lieu",
      tag: "THIẾT BỊ & VẬT LIỆU",
      title: "Kinh doanh máy móc thiết bị và vật liệu xây dựng",
      shortDesc: "Cung cấp, cho thuê máy móc thiết bị cơ giới thi công và phân phối các loại vật liệu xây dựng hoàn thiện chất lượng cao.",
      fullDesc:
        "Nhằm chủ động nguồn lực và hỗ trợ đối tác tối ưu chi phí, Thành Phú triển khai mảng kinh doanh, cho thuê máy móc thiết bị cơ giới xây dựng và cung ứng vật liệu xây dựng chính hãng. Chúng tôi sở hữu kho bãi thiết bị đa dạng, được kiểm định an toàn định kỳ cùng nguồn vật liệu phong phú, nguồn gốc minh bạch, sẵn sàng đáp ứng tiến độ thi công khắt khe của các nhà thầu và chủ đầu tư.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      iconName: "wrench",
      techHighlights: [
        "Kinh doanh và cho thuê thiết bị cơ giới thi công: cẩu tháp, vận thăng, xe bơm bê tông, máy đào, xe lu",
        "Phân phối vật liệu xây dựng thô và hoàn thiện: thép xây dựng, xi măng, cát đá, gạch xây, sơn phủ",
        "Cung cấp vật tư nhôm thanh định hình, thanh profile uPVC và phụ kiện kim khí ngành cửa",
        "Đầy đủ chứng nhận kiểm định chất lượng, chứng chỉ xuất xưởng (CO/CQ) cho mọi chủng loại hàng hóa",
        "Chính sách bảo dưỡng, hỗ trợ kỹ thuật vận hành và vận chuyển linh hoạt tận chân công trường",
      ],
      equipmentList: [
        "Kho bãi tập kết thiết bị cơ giới rộng rãi cùng xưởng bảo dưỡng, sửa chữa cơ khí chuyên sâu",
        "Đoàn xe đầu kéo, xe tải cẩu vận chuyển máy móc thiết bị cơ động đến các tỉnh thành",
        "Hệ thống kho lưu trữ vật liệu xây dựng khô ráo, phương tiện bốc dỡ xe nâng công nghiệp",
        "Đội ngũ kỹ thuật viên cơ giới hỗ trợ chuyển giao công nghệ và xử lý sự cố kỹ thuật 24/7",
      ],
    },
  ];

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "building":
        return <Building2 className="w-5 h-5" />;
      case "route":
        return <Route className="w-5 h-5" />;
      case "layers":
        return <Layers className="w-5 h-5" />;
      case "wrench":
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
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
            <li className="text-[#ed3237] font-semibold">Lĩnh vực hoạt động</li>
          </ol>
        </nav>

        {/* Page Title Header */}
        <div className="pb-6 border-b border-slate-200 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-red-50 border border-red-200/80 text-[#ed3237] text-xs font-bold uppercase tracking-wider mb-2.5">
            <HardHat className="w-3.5 h-3.5" />
            <span>Năng lực cốt lõi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            LĨNH VỰC HOẠT ĐỘNG
          </h1>
        </div>

        {/* Strategic Goal Statement matching user prompt */}
        <div className="bg-white rounded-[4px] p-6 sm:p-8 lg:p-9 shadow-sm mb-10 reveal-on-scroll">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-red-50 text-[#ed3237] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-[#ed3237] uppercase tracking-wider">
                MỤC TIÊU HÀNG ĐẦU CỦA THÀNH PHÚ
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Mục tiêu hàng đầu của <strong className="font-bold text-slate-900">THÀNH PHÚ</strong> là cung cấp các dịch vụ chuyên nghiệp và hiệu quả nhất trong lĩnh vực: <strong className="font-bold text-[#ed3237]">Xây dựng - Dân dụng - Trang trí nội ngoại thất</strong>. Cụ thể là: Các công trình dân dụng &amp; công nghiệp; các công trình giao thông; hạ tầng kỹ thuật; cấp thoát nước; nhôm kính; cửa nhựa lõi thép uPVC; kinh doanh máy móc thiết bị và vật liệu xây dựng.
              </p>
            </div>
          </div>
        </div>

        {/* Main Services Deep-Dive Listing */}
        <div className="space-y-10">
          {servicesData.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className="bg-white rounded-[4px] shadow-sm hover:shadow-md transition-shadow overflow-hidden reveal-on-scroll"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Visual / Image Side (5 cols) */}
                  <div
                    className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-slate-100 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-[#ed3237] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-[2px] shadow">
                        {service.tag}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Details */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-[3px] bg-[#3e4095] text-white flex items-center justify-center shrink-0 shadow">
                          {getServiceIcon(service.iconName)}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200 line-clamp-1">
                          {service.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side (7 cols) */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#ed3237] uppercase tracking-wider">
                          <HardHat className="w-3.5 h-3.5" />
                          <span>LĨNH VỰC HOẠT ĐỘNG #{index + 1}</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                          {service.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                          {service.fullDesc}
                        </p>
                      </div>

                      {/* Tech Highlights Grid */}
                      <div className="pt-2">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#3e4095]" />
                          <span>Năng lực thực hiện &amp; Hạng mục chuyên môn</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {service.techHighlights.map((hl, hlIdx) => (
                            <div
                              key={hlIdx}
                              className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-[3px]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#ed3237] shrink-0 mt-0.5" />
                              <span className="leading-snug font-medium">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Equipment / Facilities */}
                      <div className="pt-1">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Factory className="w-4 h-4 text-[#ed3237]" />
                          <span>Hạ tầng nhà xưởng &amp; Thiết bị chuyên dụng</span>
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600">
                          {service.equipmentList.map((eq, eqIdx) => (
                            <li key={eqIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3e4095] mt-1.5 shrink-0" />
                              <span className="leading-snug">{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Contact CTA Box */}
        <div className="mt-12 bg-white rounded-[4px] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Cần Tư Vấn &amp; Hợp Tác Triển Khai Dự Án?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Đội ngũ kỹ sư và chuyên viên kỹ thuật của Thành Phú luôn sẵn sàng phục vụ và giải đáp tận tình.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ed3237] hover:bg-[#d0282d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[3px] shadow transition-colors"
            >
              <span>LIÊN HỆ BÁO GIÁ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${(settings.hotline || settings.phone || "").replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-[3px] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#ed3237]" />
              <span>{settings.hotline || settings.phone || "(028) 3553 0675"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
