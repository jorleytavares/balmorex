import { siteConfig } from "../content/site-content.js";
import { renderFooter, renderHeader, renderLegalContent } from "../components/renderers.js";
import { initAnalytics } from "../lib/analytics.js";
import { injectLegalSchemas } from "../lib/schema.js";

const pageKey = document.body.dataset.page;
const page = siteConfig.legalPages[pageKey];

if (!page) {
  throw new Error(`Unknown legal page: ${pageKey}`);
}

const headerMount = document.querySelector('[data-mount="header"]');
const footerMount = document.querySelector('[data-mount="footer"]');
const legalMount = document.querySelector('[data-mount="legal-page"]');
const canonical = document.querySelector('link[rel="canonical"]');
const pathname = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;

if (canonical) {
  canonical.href = `${siteConfig.domain}${pathname}`;
}

document.title = `${page.title} | ${siteConfig.siteName}`;
document.querySelector('meta[name="description"]').setAttribute("content", page.description);

headerMount.innerHTML = renderHeader(pathname);
footerMount.innerHTML = renderFooter();
legalMount.innerHTML = renderLegalContent(page);

injectLegalSchemas(pathname, page.title, page.description);
initAnalytics(pageKey);
