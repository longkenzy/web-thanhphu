import { Metadata } from "next";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPageClient from "@/components/ServicesPageClient";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.getSettings();

  return {
    title: `LĨNH VỰC HOẠT ĐỘNG | ${settings.name}`,
    description:
      "Mục tiêu hàng đầu của THÀNH PHÚ là cung cấp các dịch vụ chuyên nghiệp và hiệu quả nhất trong lĩnh vực: Xây dựng dân dụng & công nghiệp; các công trình giao thông (Cầu - Đường bộ); hạ tầng kỹ thuật; cấp thoát nước; nhôm kính; cửa nhựa lõi thép uPVC; kinh doanh máy móc thiết bị và vật liệu xây dựng.",
    keywords: [
      "lĩnh vực hoạt động Thành Phú",
      "xây dựng công trình dân dụng",
      "xây dựng công trình công nghiệp",
      "xây dựng công trình giao thông",
      "thi công cầu đường bộ",
      "hạ tầng kỹ thuật cấp thoát nước",
      "cửa nhựa lõi thép uPVC",
      "cửa nhôm kính",
      "kinh doanh máy móc thiết bị xây dựng",
      "vật liệu xây dựng Thành Phú",
      "Thành Phú",
    ],
    alternates: {
      canonical: "https://trunghaico.vn/linh-vuc-hoat-dong",
    },
    openGraph: {
      title: `LĨNH VỰC HOẠT ĐỘNG | ${settings.name}`,
      description:
        "Xây dựng dân dụng & công nghiệp; công trình giao thông (Cầu - Đường bộ); hạ tầng kỹ thuật; cấp thoát nước; cửa nhựa lõi thép uPVC; nhôm kính; kinh doanh thiết bị & vật liệu xây dựng.",
      url: "https://trunghaico.vn/linh-vuc-hoat-dong",
      siteName: settings.name,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Lĩnh vực hoạt động Thành Phú",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `LĨNH VỰC HOẠT ĐỘNG | ${settings.name}`,
      description:
        "Dịch vụ chuyên nghiệp trong lĩnh vực Xây dựng - Dân dụng - Trang trí nội ngoại thất - Hạ tầng kỹ thuật.",
      images: ["/logo.png"],
    },
  };
}

export default async function LinhVucHoatDongPage() {
  const settings = await db.getSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://trunghaico.vn/linh-vuc-hoat-dong/#webpage",
        url: "https://trunghaico.vn/linh-vuc-hoat-dong",
        name: `LĨNH VỰC HOẠT ĐỘNG | ${settings.name}`,
        description:
          "Dịch vụ chuyên nghiệp của THÀNH PHÚ trong lĩnh vực xây dựng dân dụng & công nghiệp, giao thông, hạ tầng kỹ thuật, nhôm kính uPVC và thiết bị vật tư xây dựng.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://trunghaico.vn/#website",
          url: "https://trunghaico.vn",
          name: "Thành Phú",
        },
        inLanguage: "vi-VN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://trunghaico.vn/linh-vuc-hoat-dong/#breadcrumb",
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
            name: "Giới thiệu",
            item: "https://trunghaico.vn/gioi-thieu",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Lĩnh vực hoạt động",
            item: "https://trunghaico.vn/linh-vuc-hoat-dong",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        hotline={settings.hotline}
        phoneDisplay={settings.phone}
        address={settings.address}
        email={settings.email}
      />
      <ServicesPageClient settings={settings} />
      <Footer settings={settings} />
    </>
  );
}
