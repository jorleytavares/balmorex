import { siteConfig } from "../content/site-content.js?v=2";

function toAbsoluteUrl(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${siteConfig.domain}${url}`;
  return `${siteConfig.domain}/${url}`;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizationName,
    url: siteConfig.domain,
    sameAs: [
      `${siteConfig.domain}/about-editorial-policy/`,
      `${siteConfig.domain}/sources-methodology/`,
      `${siteConfig.domain}/medical-review-policy/`,
    ],
  };
}

function buildBreadcrumbSchema(pathname, title) {
  const isHome = pathname === "/";
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteConfig.domain}/`,
    },
  ];

  if (!isHome) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: title,
      item: `${siteConfig.domain}${pathname}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function buildImageObject(key) {
  const meta = siteConfig.imageMeta?.[key] || {};
  const absolute = toAbsoluteUrl(siteConfig.images[key]);
  return {
    "@type": "ImageObject",
    url: absolute,
    contentUrl: absolute,
    name: meta.name,
    caption: meta.caption,
    description: meta.description,
  };
}

function buildHomeArticleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: siteConfig.articleTitle,
    description: siteConfig.articleDescription,
    inLanguage: siteConfig.locale,
    mainEntityOfPage: `${siteConfig.domain}/`,
    author: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.domain,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.domain,
    },
    image: ["hero", "knee", "stairs", "family"].map(buildImageObject),
    about: ["Joint comfort", "Mobility", "Topical application", "Healthy aging"],
  };
}

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function injectHomeSchemas() {
  injectSchemas([
    buildOrganizationSchema(),
    buildBreadcrumbSchema("/", "Home"),
    buildHomeArticleSchema(),
    buildFaqSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: siteConfig.articleTitle,
      url: `${siteConfig.domain}/`,
      inLanguage: siteConfig.locale,
    },
  ]);
}

export function injectLegalSchemas(pathname, title, description) {
  injectSchemas([
    buildOrganizationSchema(),
    buildBreadcrumbSchema(pathname, title),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${siteConfig.domain}${pathname}`,
      inLanguage: siteConfig.locale,
    },
  ]);
}

function injectSchemas(schemaObjects) {
  const existing = document.querySelectorAll("script[data-schema]");
  existing.forEach((node) => node.remove());

  schemaObjects.forEach((schemaObject) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "true";
    script.textContent = JSON.stringify(schemaObject);
    document.head.appendChild(script);
  });
}
