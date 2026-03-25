declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackButtonClick = (buttonName: string) => {
  trackEvent(`${buttonName}_click`, "button", buttonName);
};

export const trackArticleClick = (articleSlug: string) => {
  trackEvent("article_click", "article", articleSlug);
};

export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", "engagement", `${depth}%`, depth);
};

export const trackNavClick = (linkName: string) => {
  trackEvent("nav_click", "navigation", linkName);
};

export const trackFooterClick = (linkName: string) => {
  trackEvent("footer_click", "footer", linkName);
};

export const trackLegalPageView = (pageName: string) => {
  trackEvent("legal_page_view", "legal", pageName);
};
