const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initAnalytics = () => {
  if (!GA_TRACKING_ID) {
    console.warn("Google Analytics tracking ID not found");
    return;
  }

  // Load GA script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID);
};

export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackDonation = (amount, method) => {
  trackEvent("donation", "Donations", method, amount);
};

export const trackFormSubmission = (formName) => {
  trackEvent("form_submit", "Forms", formName);
};
