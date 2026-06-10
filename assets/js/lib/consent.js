const storageKey = "dcj_consent_v1";

export function getConsent() {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value) {
  if (value !== "granted" && value !== "denied") {
    return;
  }
  try {
    window.localStorage.setItem(storageKey, value);
  } catch {}
  window.dispatchEvent(new CustomEvent("dcj:consent", { detail: { value } }));
}

function buildBanner() {
  const wrapper = document.createElement("div");
  wrapper.className = "cookie-banner";
  wrapper.setAttribute("aria-live", "polite");
  wrapper.setAttribute("aria-label", "Cookie notice");

  wrapper.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__copy">
        <strong>Cookies & measurement</strong>
        <span>We use cookies for analytics and advertising measurement.</span>
      </div>
      <div class="cookie-banner__actions">
        <a class="cookie-banner__link" href="/privacy-policy/">Read Privacy Policy</a>
        <button class="cookie-banner__button cookie-banner__button--secondary" type="button" data-consent="denied">Disable</button>
        <button class="cookie-banner__button" type="button" data-consent="granted">OK</button>
      </div>
    </div>
  `;

  wrapper.addEventListener("click", (event) => {
    const target = event.target.closest("[data-consent]");
    if (!target) return;
    const value = target.getAttribute("data-consent");
    setConsent(value);
    wrapper.remove();
  });

  return wrapper;
}

export function ensureConsentBanner() {
  const existing = document.querySelector(".cookie-banner");
  if (existing) return;

  const current = getConsent();
  if (current) return;

  document.body.appendChild(buildBanner());
}
