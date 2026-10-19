import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ | THÀNH PHÚ",
  description:
    "Nhà thầu hàng đầu Việt Nam về thi công hạ tầng giao thông, hầm đường bộ qua Đèo Cả, Cù Mông, Phước Tượng - Phú Gia, Quốc lộ 1 và các công trình giao thông trọng điểm.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3" },
      { url: "/icon.png?v=3", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ",
    description: "Nhà thầu tiên phong trong xây dựng công trình giao thông trọng điểm quốc gia.",
    url: "https://trunghaico.vn",
    siteName: "Thành Phú",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable} ${roboto.className} scroll-smooth`}>
      <body className={`${roboto.className} min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-[#ed3237] selection:text-white`}>
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
