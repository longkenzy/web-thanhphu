"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  ChevronDown,
  Home,
  Building2,
  HardHat,
  Newspaper,
  Users,
  PhoneCall,
  MapPin,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  hotline?: string;
  phoneDisplay?: string;
  address?: string;
  workingHours?: string;
  email?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: { name: string; href: string }[];
}

export default function Header({
  hotline = "(028) 3553 0675",
  phoneDisplay = "(028) 3553 0675",
  address = "22A Vũ Ngọc Phan, Phường Bình Lợi Trung, Tp. Hồ Chí Minh",
  workingHours = "Thứ 2 – Thứ 7: 08:00 – 17:30",
  email = "thanhphuhcns@gmail.com",
}: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({
    "Giới thiệu": false,
    "DỰ ÁN": true,
  });

  const toggleMobileSubmenu = (name: string) => {
    setOpenMobileSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is opened
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { name: "Trang chủ", href: "/", icon: Home },
    {
      name: "Giới thiệu",
      href: "/gioi-thieu",
      icon: Building2,
      badge: "2 Mục",
      children: [
        { name: "Tổng quan doanh nghiệp", href: "/gioi-thieu" },
        { name: "Lĩnh vực hoạt động", href: "/linh-vuc-hoat-dong" },
      ],
    },
    {
      name: "DỰ ÁN",
      href: "/cong-trinh",
      icon: HardHat,
      badge: "5 Hạng mục",
      children: [
        { name: "Dân dụng & Cao tầng", href: "/cong-trinh?category=dan-dung-cao-tang" },
        { name: "Công nghiệp & Nhà xưởng", href: "/cong-trinh?category=cong-nghiep-nha-xuong" },
        { name: "Hạ tầng & Giao thông", href: "/cong-trinh?category=ha-tang-giao-thong" },
        { name: "Kết cấu thép & Nhôm kính", href: "/cong-trinh?category=ket-cau-thep-nhom-kinh" },
        { name: "Trang trí nội thất", href: "/cong-trinh?category=trang-tri-noi-that" },
      ],
    },
    { name: "Tin tức", href: "/tin-tuc", icon: Newspaper },
    { name: "Tuyển dụng", href: "/tuyen-dung", icon: Users },
    { name: "Liên hệ", href: "/lien-he", icon: PhoneCall },
  ];

  // Header should be solid on subpages or when scrolled
  const isSolid = isScrolled || (pathname !== "/" && pathname !== "");

  const phoneParts = phoneDisplay.split("/").map((p) => p.trim());

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
        {/* Topbar: Only appears on Homepage, disappears smoothly on scroll */}
        {isHomePage && (
          <div
            className={`w-full bg-[#18202c] text-slate-300 text-xs sm:text-[13px] border-b border-white/[0.08] transition-all duration-300 ease-in-out overflow-hidden z-20 ${
              isScrolled
                ? "max-h-0 opacity-0 -translate-y-full py-0 border-b-0 pointer-events-none"
                : "max-h-12 opacity-100 translate-y-0 py-1.5 sm:py-2"
            }`}
          >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* Left Group: Address & Working Hours */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <svg
                    className="w-3.5 h-3.5 text-[#f59e0b] fill-current shrink-0"
                    viewBox="0 0 24 24"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    aria-hidden="true"
                  >
                    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                  </svg>
                  <span className="truncate">{address}</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 sm:gap-2 shrink-0 text-slate-300/90">
                  <svg
                    className="w-3.5 h-3.5 text-[#f59e0b] fill-current shrink-0"
                    viewBox="0 0 24 24"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 5a1 1 0 1 0-2 0v4.586l3.293 3.293a1 1 0 0 0 1.414-1.414L13 10.586V7z" />
                  </svg>
                  <span>{workingHours}</span>
                </div>
              </div>

              {/* Right Group: Phone Numbers & Email */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Phone className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b] shrink-0" />
                  <div className="flex items-center gap-2">
                    {phoneParts.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-2">
                        {idx > 0 && <span className="text-slate-500 font-normal">/</span>}
                        <a
                          href={`tel:${item.replace(/[^0-9]/g, "")}`}
                          className="hover:text-white transition-colors"
                        >
                          {item}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-1.5 sm:gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-[#f59e0b] fill-current shrink-0"
                    viewBox="0 0 24 24"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    aria-hidden="true"
                  >
                    <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2.2 9 5.625L21 7.2V17H3V7.2zM12 11.125 4.6 6.5h14.8L12 11.125z" />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Main Navbar */}
        <div
          className={`relative w-full transition-all duration-300 ease-in-out ${
            isSolid
              ? "bg-white shadow-md border-b-2 border-[#ed3237] py-2 sm:py-3"
              : "bg-transparent py-2.5 sm:py-3.5 border-b border-white/10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between gap-4 min-h-[44px] sm:min-h-[48px]">
              {/* Logo - centered on mobile, left-aligned on desktop */}
              <Link
                href="/"
                className="flex items-center group shrink-0 z-10 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                <div className="relative h-10 w-40 sm:h-12 sm:w-48 lg:h-[52px] lg:w-[195px] xl:h-[56px] xl:w-[210px] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="Thành Phú Logo"
                    fill
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 195px, 210px"
                    className="object-contain max-lg:object-center lg:object-left drop-shadow-sm"
                  />
                </div>
              </Link>

              {/* Desktop Navigation - Centered Exactly in the Middle */}
              <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-2 2xl:space-x-3 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((item) => {
                  if (item.children) {
                    const isDropdownActive =
                      (item.href !== "/" && pathname.startsWith(item.href)) ||
                      Boolean(
                        item.children.some(
                          (child) =>
                            pathname === child.href ||
                            (child.href !== "/" &&
                              pathname.startsWith(child.href.split("?")[0]))
                        )
                      );
                    const isOpen = openDropdown === item.name;

                    return (
                      <div
                        key={item.name}
                        className="relative group py-2"
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`group/btn relative whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-[13px] 2xl:text-sm uppercase tracking-wider font-bold transition-all duration-300 rounded-[3px] hover:text-[#ed3237] flex items-center gap-1 cursor-pointer ${
                            isDropdownActive
                              ? "text-[#ed3237] font-bold"
                              : isSolid
                              ? "text-slate-700 hover:bg-slate-50"
                              : "text-white drop-shadow hover:text-[#ed3237]"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isOpen
                                ? "rotate-180 text-[#ed3237]"
                                : isDropdownActive
                                ? "text-[#ed3237]"
                                : isSolid
                                ? "text-slate-400 group-hover/btn:text-[#ed3237]"
                                : "text-white/80 group-hover/btn:text-[#ed3237]"
                            }`}
                          />
                          {/* Animated underline micro-interaction */}
                          <span
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#ed3237] rounded-full transition-all duration-300 ease-out ${
                              isDropdownActive || isOpen ? "w-4/5" : "w-0 group-hover/btn:w-4/5"
                            }`}
                          />
                        </Link>

                        {/* Dropdown Menu */}
                        <div
                          className={`absolute left-0 top-full pt-1.5 min-w-[240px] transition-all duration-200 z-50 ${
                            isOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="bg-white rounded-[3px] border border-slate-200 shadow-xl shadow-slate-900/10 py-1.5 overflow-hidden">
                            {item.children.map((sub) => {
                              const isSubActive = pathname === sub.href;

                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold transition-all ${
                                    isSubActive
                                      ? "text-[#ed3237] bg-red-50/70 font-bold"
                                      : "text-slate-700 hover:text-[#ed3237] hover:bg-red-50/50"
                                  }`}
                                >
                                  <span>{sub.name}</span>
                                  {isSubActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ed3237]" />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-[13px] 2xl:text-sm uppercase tracking-wider font-bold transition-all duration-300 rounded-[3px] hover:text-[#ed3237] ${
                        isActive
                          ? "text-[#ed3237] font-bold"
                          : isSolid
                          ? "text-slate-700 hover:bg-slate-50"
                          : "text-white drop-shadow hover:text-[#ed3237]"
                      }`}
                    >
                      <span>{item.name}</span>
                      {/* Animated underline micro-interaction */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#ed3237] rounded-full transition-all duration-300 ease-out ${
                          isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Compact Call Button with Logo Red (#ed3237) */}
              <div className="hidden lg:flex items-center shrink-0 z-10">
                <a
                  href={`tel:${hotline.replace(/\s+/g, "")}`}
                  title={`Gọi ngay: ${hotline}`}
                  className="whitespace-nowrap flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 shadow-md shadow-[#ed3237]/30 hover:shadow-lg hover:shadow-[#ed3237]/45 hover:scale-105 group bg-[#ed3237] hover:bg-[#d0282d] text-white border border-white/20"
                >
                  {/* Ringing Phone Icon with Pulse Beacon */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping" />
                    <div className="relative w-6 h-6 rounded-full bg-white text-[#ed3237] flex items-center justify-center transition-colors shadow-sm">
                      <Phone className="w-3 h-3 fill-current animate-phone-ring" />
                    </div>
                  </div>

                  {/* Only Phone Number */}
                  <span className="tracking-tight font-extrabold text-xs text-white drop-shadow-sm">{hotline}</span>
                </a>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="flex items-center gap-2 lg:hidden ml-auto">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 ${
                    isSolid
                      ? "bg-slate-100 text-slate-800 hover:bg-[#ed3237] hover:text-white border border-slate-200/80"
                      : "bg-white/15 text-white backdrop-blur-md hover:bg-white/30 border border-white/25"
                  }`}
                  aria-label="Toggle Navigation"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4 text-[#ed3237]" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                  <span>{mobileMenuOpen ? "Đóng" : "Menu"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (App-grade Luxury Corporate Style) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop with smooth fade-in */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md animate-backdrop-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container with slide-in animation from right */}
          <div className="fixed top-0 right-0 bottom-0 w-[88%] max-w-[360px] bg-white flex flex-col justify-between shadow-[-16px_0_40px_rgba(0,0,0,0.3)] z-10 rounded-l-3xl border-l border-slate-200/70 overflow-hidden animate-drawer-in">
            {/* 1. Header with Logo & Modern Close button */}
            <div className="px-5 py-4 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <Image
                  src="/logo.png"
                  alt="Thành Phú"
                  width={140}
                  height={36}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#ed3237] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                aria-label="Đóng menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-1.5 no-scrollbar">
              <div className="px-2 pb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Danh mục điều hướng</span>
                <span className="flex items-center gap-1 text-[#ed3237]">
                  <Sparkles className="w-3 h-3" />
                  <span>Thành Phú JSC</span>
                </span>
              </div>

              {navLinks.map((item) => {
                const IconComponent = item.icon;
                if (item.children) {
                  const isDropdownActive =
                    (item.href !== "/" && pathname.startsWith(item.href)) ||
                    Boolean(
                      item.children.some(
                        (child) =>
                          pathname === child.href ||
                          (child.href !== "/" &&
                            pathname.startsWith(child.href.split("?")[0]))
                      )
                    );
                  const isMobileSubOpen = Boolean(openMobileSubmenus[item.name]);

                  return (
                    <div key={item.name} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.name)}
                        className={`group flex items-center justify-between p-2 rounded-2xl text-[13px] font-bold tracking-wide transition-all ${
                          isDropdownActive
                            ? "bg-red-50/80 text-[#ed3237] shadow-sm shadow-red-100"
                            : "text-slate-800 hover:bg-slate-50 hover:text-[#ed3237]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isDropdownActive
                                ? "bg-[#ed3237] text-white shadow-md shadow-[#ed3237]/30"
                                : "bg-slate-100 text-slate-600 group-hover:bg-red-100 group-hover:text-[#ed3237]"
                            }`}
                          >
                            {IconComponent ? <IconComponent className="w-4 h-4" /> : <HardHat className="w-4 h-4" />}
                          </div>
                          <span className="uppercase text-xs tracking-wider">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-slate-100 text-slate-600">
                              {item.badge}
                            </span>
                          )}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                              isMobileSubOpen
                                ? "bg-red-100 text-[#ed3237] rotate-180"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </button>

                      {isMobileSubOpen && (
                        <div className="ml-5 pl-3 border-l-2 border-red-500/30 my-1 py-1 space-y-1 bg-slate-50/60 rounded-r-xl pr-2">
                          {item.children.map((sub) => {
                            const isSubActive = pathname === sub.href;

                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                  isSubActive
                                    ? "text-[#ed3237] bg-white font-bold shadow-sm"
                                    : "text-slate-600 hover:text-[#ed3237] hover:bg-white/80"
                                }`}
                              >
                                <span className="line-clamp-1">{sub.name}</span>
                                {isSubActive ? (
                                  <span className="w-2 h-2 rounded-full bg-[#ed3237] shrink-0" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between p-2 rounded-2xl text-[13px] font-bold tracking-wide transition-all ${
                      isActive
                        ? "bg-red-50/80 text-[#ed3237] shadow-sm shadow-red-100"
                        : "text-slate-800 hover:bg-slate-50 hover:text-[#ed3237]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#ed3237] text-white shadow-md shadow-[#ed3237]/30"
                            : "bg-slate-100 text-slate-600 group-hover:bg-red-100 group-hover:text-[#ed3237]"
                        }`}
                      >
                        {IconComponent ? <IconComponent className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                      </div>
                      <span className="uppercase text-xs tracking-wider">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-red-100 text-[#ed3237]">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? "text-[#ed3237]" : "text-slate-300"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 3. Bottom Action Hub: Floating VIP Hotline Card */}
            <div className="p-3 bg-slate-50 border-t border-slate-100">
              <div className="bg-gradient-to-br from-[#18202c] to-[#0f172a] rounded-2xl p-3.5 text-white shadow-xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">
                      Hỗ Trợ 24/7
                    </span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    <span>08:00 - 17:30</span>
                  </span>
                </div>

                {/* Direct Call Button */}
                <a
                  href={`tel:${hotline.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#ed3237] to-[#d0282d] hover:brightness-110 rounded-xl shadow-md shadow-[#ed3237]/35 active:scale-98 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 fill-current animate-phone-ring" />
                  <span>Gọi Hotline: {hotline}</span>
                </a>

                {/* Quick Dual Actions: Email & Address */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[11px]">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span className="truncate">Gửi Email</span>
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#ed3237]" />
                    <span className="truncate">Chỉ đường</span>
                  </a>
                </div>

                {/* Company Address */}
                <p className="text-[10px] text-slate-400 text-center truncate pt-0.5">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
