import { useEffect } from "react";
import { APP_NAME, APP_URL } from "@utils/constants";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const fullUrl = url ? `${APP_URL}${url}` : APP_URL;
  const defaultDescription =
    "Empowering children with learning challenges in Zambia. Specialized therapy for autism, Down syndrome, cerebral palsy, and developmental delays.";
  const metaDescription = description || defaultDescription;
  const defaultImage = `${APP_URL}/images/og-image.jpg`;
  const metaImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    updateMetaTag("name", "description", metaDescription);

    if (keywords) {
      updateMetaTag("name", "keywords", keywords);
    }

    // Open Graph tags for social media
    updateMetaTag("property", "og:title", fullTitle);
    updateMetaTag("property", "og:description", metaDescription);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:url", fullUrl);
    updateMetaTag("property", "og:image", metaImage);
    updateMetaTag("property", "og:site_name", APP_NAME);

    // Twitter Card tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", fullTitle);
    updateMetaTag("name", "twitter:description", metaDescription);
    updateMetaTag("name", "twitter:image", metaImage);

    // Canonical URL
    updateLinkTag("canonical", fullUrl);
  }, [fullTitle, metaDescription, keywords, type, fullUrl, metaImage]);

  // This component doesn't render anything
  return null;
};

// Helper function to update or create meta tags
function updateMetaTag(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

// Helper function to update or create link tags
function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default SEO;
