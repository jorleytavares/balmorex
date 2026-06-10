import { siteConfig } from "../content/site-content.js";
import { renderFaqItems, renderFooter, renderHeader } from "../components/renderers.js";
import { initAnalytics } from "../lib/analytics.js";
import { injectHomeSchemas } from "../lib/schema.js";

function resolveOfferLabel(location) {
  if (location === "hero") {
    return { label: siteConfig.offerLabel, variant: "primary" };
  }

  const variants = Array.isArray(siteConfig.offerLabelVariants)
    ? siteConfig.offerLabelVariants.filter((value) => typeof value === "string" && value.trim().length > 0)
    : [];

  if (!variants.length) {
    return { label: siteConfig.offerLabel, variant: siteConfig.offerLabel };
  }

  const key = "dcj_offer_label_variant_v2";
  try {
    const stored = window.localStorage.getItem(key);
    if (stored && variants.includes(stored)) {
      return { label: stored, variant: stored };
    }
  } catch {}

  const selected = variants[Math.floor(Math.random() * variants.length)];
  try {
    window.localStorage.setItem(key, selected);
  } catch {}
  return { label: selected, variant: selected };
}

const headerMount = document.querySelector('[data-mount="header"]');
const footerMount = document.querySelector('[data-mount="footer"]');
const faqMount = document.querySelector('[data-mount="faq"]');
const heroImage = document.querySelector('[data-asset="hero-image"]');
const familyImage = document.querySelector('[data-asset="family-image"]');
const stairsImage = document.querySelector('[data-asset="stairs-image"]');
const canonical = document.querySelector('link[rel="canonical"]');
const offerLinks = document.querySelectorAll("[data-offer-link]");

if (canonical) {
  canonical.href = `${siteConfig.domain}/`;
}

document.title = `${siteConfig.articleTitle} | ${siteConfig.siteName}`;

if (headerMount) headerMount.innerHTML = renderHeader("/");
if (footerMount) footerMount.innerHTML = renderFooter();
if (faqMount) faqMount.innerHTML = renderFaqItems(siteConfig.faq);
if (heroImage) {
  heroImage.src = siteConfig.images.hero;
  heroImage.alt = siteConfig.imageAlt.hero;
}
if (familyImage) {
  familyImage.src = siteConfig.images.family;
  familyImage.alt = siteConfig.imageAlt.family;
}
if (stairsImage) {
  stairsImage.src = siteConfig.images.stairs;
  stairsImage.alt = siteConfig.imageAlt.stairs;
}
offerLinks.forEach((link) => {
  link.href = siteConfig.offerUrl;
  const resolvedOfferLabel = resolveOfferLabel(link.dataset.location || "");
  link.textContent = resolvedOfferLabel.label;
  link.dataset.offerVariant = resolvedOfferLabel.variant;
});

injectHomeSchemas();
initAnalytics();
