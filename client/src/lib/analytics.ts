/**
 * GA4 (gtag.js) yardımcıları.
 *
 * Temel etiket client/index.html içinde yüklenir (G-T2L9ZPT2BS). Bu dosya:
 *  - gtag'e güvenli erişim (yüklenmeden önce çağrılırsa dataLayer'a kuyruklanır)
 *  - özel etkinlikler (trackEvent) ve kullanıcı özellikleri
 *  - otomatik dinleyiciler: tıklamalar, kaydırma derinliği, bölüm görünürlüğü,
 *    JS hataları, sayfa terk, kopyalama, yazdırma, görünürlük değişimi
 *
 * GA4 "Geliştirilmiş ölçüm" (page_view, scroll %90, outbound click, site search,
 * form_start/form_submit, video, file_download, tarayıcı geçmişi) GA tarafında açık;
 * buradaki etkinlikler onları tamamlar, kopyalamaz.
 */

export const GA_MEASUREMENT_ID = "G-T2L9ZPT2BS";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasGtag(): boolean {
  return typeof window !== "undefined";
}

export function gtag(...args: unknown[]): void {
  if (!hasGtag()) return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  // gtag() `arguments` nesnesini push eder; aynı şekli koruyoruz.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  gtag("event", name, params);
}

export function setUserProperties(props: GtagParams): void {
  gtag("set", "user_properties", props);
}

export function trackPageView(path: string, title?: string): void {
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
}

/* ------------------------------------------------------------------ */
/* Otomatik dinleyiciler                                               */
/* ------------------------------------------------------------------ */

let initialized = false;

function labelFor(el: Element): string {
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 100);
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 100);
  const title = el.getAttribute("title");
  if (title) return title.trim().slice(0, 100);
  const img = el.querySelector("img[alt]");
  if (img) return (img.getAttribute("alt") || "").slice(0, 100);
  return el.id || el.className?.toString().slice(0, 60) || el.tagName.toLowerCase();
}

function sectionFor(el: Element): string | undefined {
  const section = el.closest("section[id], footer, header, nav");
  if (!section) return undefined;
  return section.id || section.tagName.toLowerCase();
}

function initClickTracking(): void {
  document.addEventListener(
    "click",
    event => {
      const target = event.target as Element | null;
      if (!target) return;
      const el = target.closest(
        "a, button, [role=button], [role=tab], [role=menuitem], summary, input[type=submit]"
      );
      if (!el) return;

      const tag = el.tagName.toLowerCase();
      const href = el instanceof HTMLAnchorElement ? el.href : undefined;
      const params: GtagParams = {
        element: tag,
        label: labelFor(el),
        section: sectionFor(el),
        page_path: window.location.pathname,
      };

      if (href) {
        params.link_url = href;
        let isExternal = false;
        try {
          isExternal = new URL(href).hostname !== window.location.hostname;
        } catch {
          /* mailto:, tel: vb. */
        }
        if (href.startsWith("mailto:")) {
          trackEvent("contact_click", { method: "email", ...params });
          return;
        }
        if (href.startsWith("tel:")) {
          trackEvent("contact_click", { method: "phone", ...params });
          return;
        }
        if (href.includes("wa.me") || href.includes("whatsapp")) {
          trackEvent("contact_click", { method: "whatsapp", ...params });
          return;
        }
        if (/linkedin|twitter|x\.com|instagram|facebook|youtube|scholar\.google|orcid|researchgate|academia\.edu/i.test(href)) {
          trackEvent("social_click", { ...params });
          return;
        }
        if (href.includes("#") && !isExternal) {
          const hash = href.split("#")[1];
          trackEvent("nav_click", { target_section: hash || "top", ...params });
          return;
        }
        params.outbound = isExternal;
      }

      trackEvent("ui_click", params);
    },
    { capture: true, passive: true }
  );
}

function initScrollDepth(): void {
  const marks = [25, 50, 75, 100];
  const reached = new Set<number>();
  let ticking = false;

  const check = () => {
    ticking = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100);
    for (const m of marks) {
      if (pct >= m && !reached.has(m)) {
        reached.add(m);
        trackEvent("scroll_depth", { percent: m, page_path: window.location.pathname });
      }
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(check);
      }
    },
    { passive: true }
  );
}

function initSectionViews(): void {
  if (!("IntersectionObserver" in window)) return;
  const seen = new Set<string>();
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).id;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        trackEvent("section_view", { section: id, page_path: window.location.pathname });
      }
    },
    { threshold: 0.4 }
  );

  const observeAll = () => {
    document.querySelectorAll<HTMLElement>("section[id]").forEach(s => observer.observe(s));
  };
  observeAll();
  // SPA içinde sonradan render edilen bölümleri de yakala.
  const mo = new MutationObserver(() => observeAll());
  mo.observe(document.body, { childList: true, subtree: true });
}

function initEngagementSignals(): void {
  const start = Date.now();

  document.addEventListener("visibilitychange", () => {
    trackEvent(document.visibilityState === "hidden" ? "page_hidden" : "page_visible", {
      seconds_on_page: Math.round((Date.now() - start) / 1000),
      page_path: window.location.pathname,
    });
  });

  window.addEventListener("pagehide", () => {
    trackEvent("page_exit", {
      seconds_on_page: Math.round((Date.now() - start) / 1000),
      page_path: window.location.pathname,
      transport_type: "beacon",
    });
  });

  document.addEventListener("copy", () => {
    const sel = window.getSelection()?.toString().trim() ?? "";
    trackEvent("copy_text", { length: sel.length, page_path: window.location.pathname });
  });

  window.addEventListener("beforeprint", () => {
    trackEvent("print_page", { page_path: window.location.pathname });
  });

  // Zaman eşikleri: 10s, 30s, 60s, 180s
  for (const s of [10, 30, 60, 180]) {
    window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        trackEvent("time_on_page", { seconds: s, page_path: window.location.pathname });
      }
    }, s * 1000);
  }
}

function initErrorTracking(): void {
  window.addEventListener("error", e => {
    trackEvent("exception", {
      description: `${e.message} @ ${e.filename}:${e.lineno}`.slice(0, 150),
      fatal: false,
    });
  });
  window.addEventListener("unhandledrejection", e => {
    const reason = e.reason instanceof Error ? e.reason.message : String(e.reason);
    trackEvent("exception", { description: `unhandledrejection: ${reason}`.slice(0, 150), fatal: false });
  });
}

function initEnvironmentProperties(): void {
  const props: GtagParams = {
    screen_class: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
    color_scheme_pref: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    reduced_motion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    browser_language: navigator.language,
  };
  try {
    props.ui_language = localStorage.getItem("language") || "tr";
    props.ui_theme = localStorage.getItem("theme") || "light";
  } catch {
    /* storage kapalı olabilir */
  }
  setUserProperties(props);
}

/** main.tsx'ten bir kez çağrılır. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  initEnvironmentProperties();
  initClickTracking();
  initScrollDepth();
  initSectionViews();
  initEngagementSignals();
  initErrorTracking();
}
