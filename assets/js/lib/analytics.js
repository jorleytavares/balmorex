import { siteConfig } from "../content/site-content.js";
import { ensureConsentBanner, getConsent } from "./consent.js";

const trackedScrollMilestones = new Set();
const scrollMilestones = [25, 50, 75, 100];

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function pushEvent(eventName, payload = {}) {
  if (getConsent() !== "granted") {
    return;
  }
  const dataLayer = ensureDataLayer();
  dataLayer.push({ event: eventName, ...payload });
}

function maybeLoadTrackingScripts() {
  if (getConsent() !== "granted") {
    return;
  }
  if (siteConfig.tracking.gtmId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${siteConfig.tracking.gtmId}`;
    document.head.appendChild(script);
  }

  if (siteConfig.tracking.ga4Id) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.ga4Id}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    window.gtag("js", new Date());
    window.gtag("config", siteConfig.tracking.ga4Id);
  }
}

export function initAnalytics(articleSlug = "daily-comfort-presell") {
  ensureConsentBanner();
  maybeLoadTrackingScripts();
  window.addEventListener("dcj:consent", (event) => {
    if (event.detail?.value === "granted") {
      maybeLoadTrackingScripts();
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-track]");
    if (!link) {
      return;
    }

    const eventName = link.dataset.track;
    const payload = {
      location: link.dataset.location || "unknown",
      destination: link.href,
      articleSlug,
      offerVariant: link.dataset.offerVariant || undefined,
    };

    pushEvent(eventName, payload);
    if (window.gtag) {
      window.gtag("event", eventName, payload);
    }
  });

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 100;

    scrollMilestones.forEach((milestone) => {
      if (percentage >= milestone && !trackedScrollMilestones.has(milestone)) {
        trackedScrollMilestones.add(milestone);
        const eventName = `scroll_depth_${milestone}`;
        const payload = { location: "article", articleSlug };
        pushEvent(eventName, payload);
        if (window.gtag) {
          window.gtag("event", eventName, payload);
        }
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
