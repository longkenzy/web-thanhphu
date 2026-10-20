import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetailView from "@/components/ProjectDetailView";
import { stripHtml, decodeHtmlEntities } from "@/lib/textUtils";
import { sortNewsByDateDesc } from "@/lib/dateUtils";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Không tìm thấy công trình | Thành Phú",
    };
  }

  const pageUrl = `https://trunghaico.vn/cong-trinh/${project.slug}`;
  const metaDescription = `${project.title} - ${project.categoryName} tại ${project.location}. Quy mô: ${project.scale}. Tổng thầu thi công: Thành Phú.`;

  return {
    title: `${project.title} | ${project.categoryName} | Thành Phú`,
    description: metaDescription,
    keywords: [
      project.title,
      project.categoryName,
      project.location,
      "thi công hầm đường bộ",
      "hạ tầng giao thông",
      "Thành Phú",
      "đại công trình quốc gia",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | THÀNH PHÚ`,
      description: metaDescription,
      url: pageUrl,
      siteName: "Công ty Cổ phần Đầu tư Xây lắp Thành Phú",
      locale: "vi_VN",
      type: "article",
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Thành Phú`,
      description: metaDescription,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [project, allProjects, settings, allNews] = await Promise.all([
    db.getProjectBySlug(slug),
    db.getProjects(),
    db.getSettings(),
    db.getNews(),
  ]);

  if (!project || project.published === false) {
    notFound();
  }

  // Filter related projects: same category first, excluding current project and hidden projects
  const relatedProjects = allProjects
    .filter((p) => p.published !== false && p.id !== project.id && p.slug !== project.slug)
    .sort((a, b) => (a.category === project.category ? -1 : 1))
    .slice(0, 4);

  // Filter latest news (published only), sorted by newest date
  const latestNews = sortNewsByDateDesc(
    (allNews || []).filter((n) => n.published !== false)
  ).slice(0, 4);

  const pageUrl = `https://trunghaico.vn/cong-trinh/${project.slug}`;

  // Structured JSON-LD Data for Article & Breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://trunghaico.vn/#website",
          url: "https://trunghaico.vn",
          name: settings.name,
        },
        headline: decodeHtmlEntities(project.title),
        description: stripHtml(project.description),
        image: [project.thumbnail, ...(project.gallery || [])],
        datePublished: "2024-01-01T00:00:00+07:00",
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: settings.name,
          url: "https://trunghaico.vn",
        },
        publisher: {
          "@type": "Organization",
          name: settings.name,
          logo: {
            "@type": "ImageObject",
            url: "https://trunghaico.vn/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Công trình",
            item: "https://trunghaico.vn/cong-trinh",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: pageUrl,
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
      <ProjectDetailView
        project={project}
        relatedProjects={relatedProjects}
        settings={settings}
        latestNews={latestNews}
      />
      <Footer settings={settings} />
    </>
  );
}
