import { siteConfig } from "../content/site-content.js?v=2";

export function renderHeader(activePath) {
  const navLinks = siteConfig.navigation
    .map((item) => {
      const isActive = activePath === item.href;
      return `<a href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-brand" href="/">
          <span class="site-brand__title">${siteConfig.siteName}</span>
          <span class="site-brand__meta">${siteConfig.siteTagline}</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${navLinks}
        </nav>
      </div>
    </header>
  `;
}

export function renderFooter() {
  const legalLinks = siteConfig.legalLinks
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__about">
          <p><strong>${siteConfig.siteName}</strong></p>
          <p>${siteConfig.siteTagline}</p>
          <p>This website contains editorial content and may include affiliate links.</p>
        </div>
        <div class="legal-links" aria-label="Legal links">
          ${legalLinks}
        </div>
      </div>
    </footer>
  `;
}

export function renderStickyCta() {
  return `
    <aside class="sticky-cta card" aria-label="Sticky call to action">
      <div class="sticky-cta__copy">
        <strong>Ready to review the official page?</strong>
        <span>Check ingredients, directions, and product details on the official website.</span>
      </div>
      <a class="button-link" href="${siteConfig.offerUrl}" target="_blank" rel="sponsored noopener noreferrer" data-track="cta_click" data-location="sticky_mobile">${siteConfig.offerLabel}</a>
    </aside>
  `;
}

export function renderFaqItems(items) {
  return items
    .map(
      (item) => `
        <details class="faq-item card">
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("");
}

export function renderLegalContent(page) {
  const sections = page.sections
    .map((section) => {
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
      const bullets = section.bullets
        ? `<ul>${section.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`
        : "";
      const contact = section.contact
        ? `
          <div class="contact-grid">
            <article class="contact-card card">
              <h3>Email</h3>
              <p><a href="mailto:${section.contact.email}">${section.contact.email}</a></p>
            </article>
            <article class="contact-card card">
              <h3>Phone</h3>
              <p><a href="tel:${section.contact.phone.replace(/[^\d+]/g, "")}">${section.contact.phone}</a></p>
            </article>
            <article class="contact-card card">
              <h3>Hours</h3>
              <p>${section.contact.hours}</p>
            </article>
          </div>
        `
        : "";

      return `
        <section>
          <h2>${section.title}</h2>
          ${paragraphs}
          ${bullets}
          ${contact}
        </section>
      `;
    })
    .join("");

  return `
    <section class="legal-hero content-shell">
      <div class="legal-hero__box card">
        <span class="section-label">Trust & Transparency</span>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
        <p class="legal-meta">${page.updated}</p>
      </div>
    </section>
    <section class="content-shell">
      <article class="legal-main card">
        <p>${page.intro}</p>
        ${sections}
      </article>
    </section>
  `;
}
