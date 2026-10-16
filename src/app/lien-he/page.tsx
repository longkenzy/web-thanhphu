import { Metadata } from "next";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/ContactPageClient";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.getSettings();

  return {
    title: `LIÊN HỆ & TRỤ SỞ CHÍNH | ${settings.name}`,
    description: `Thông tin liên hệ chính thức của ${settings.name}. Địa chỉ trụ sở tại ${settings.address}, Hotline: ${settings.hotline || settings.phone}, Email: ${settings.email}. Bản đồ chỉ đường Google Maps trực quan.`,
    keywords: [
      "Liên hệ Thành Phú",
      "Địa chỉ Công ty Thành Phú",
      "Thành Phú JSC",
      "Trụ sở Thành Phú JSC",
      "Số điện thoại Thành Phú",
      "Bản đồ Thành Phú JSC",
      "Nhà thầu xây dựng Thành Phú",
    ],
    alternates: {
      canonical: "https://trunghaico.vn/lien-he",
    },
    openGraph: {
      title: `LIÊN HỆ & TRỤ SỞ CHÍNH | ${settings.name}`,
      description: `Thông tin liên hệ chính thức, mạng lưới điều hành và địa chỉ văn phòng của ${settings.name}.`,
      url: "https://trunghaico.vn/lien-he",
      siteName: settings.name,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: settings.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `LIÊN HỆ & TRỤ SỞ CHÍNH | ${settings.name}`,
      description: `Thông tin liên hệ chính thức và bản đồ văn phòng của ${settings.name}.`,
      images: ["/logo.png"],
    },
  };
}

export default async function ContactPage() {
  const settings = await db.getSettings();

  // Structured Data Schema (JSON-LD) cho Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://trunghaico.vn/lien-he/#webpage",
        url: "https://trunghaico.vn/lien-he",
        name: `Liên Hệ & Trụ Sở Chính | ${settings.name}`,
        description: `Thông tin liên hệ chính thức và bản đồ chỉ đường Google Maps của ${settings.name}.`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://trunghaico.vn/#website",
          url: "https://trunghaico.vn",
          name: settings.name,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Trang chủ",
              item: "https://trunghaico.vn",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Liên hệ",
              item: "https://trunghaico.vn/lien-he",
            },
          ],
        },
      },
      {
        "@type": "Organization",
        "@id": "https://trunghaico.vn/#organization",
        name: settings.name,
        alternateName: settings.shortName || "Thành Phú JSC",
        url: "https://trunghaico.vn",
        logo: "https://trunghaico.vn/logo.png",
        telephone: settings.hotline || settings.phone || "(028) 3553 0675",
        email: settings.email || "thanhphuhcns@gmail.com",
        taxID: settings.taxCode || "0310001821",
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address || "22A Vũ Ngọc Phan, Phường Bình Lợi Trung, Tp. Hồ Chí Minh",
          addressLocality: "Thành phố Hồ Chí Minh",
          addressRegion: "Hồ Chí Minh",
          addressCountry: "VN",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-[#ed3237] selection:text-white">
        {/* Navigation Header */}
        <Header
          hotline={settings.hotline || settings.phone}
          phoneDisplay={settings.phone && settings.hotline ? `${settings.phone} / ${settings.hotline}` : settings.hotline}
          address={settings.address}
          email={settings.email}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <ContactPageClient settings={settings} />
        </main>

        {/* Footer */}
        <Footer settings={settings} />
      </div>
    </>
  );
}
