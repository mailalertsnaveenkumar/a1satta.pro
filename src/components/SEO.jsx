

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";

export default function SEO({ pagePath }) {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    if (!pagePath) return;
    // Auto-detect domain for multi-site SEO
    const site = window.location.hostname.replace(/^www\./, "");
    api
      .get(`/seo/get?page=${encodeURIComponent(pagePath)}&site=${encodeURIComponent(site)}`)
      .then((res) => setSeo(res.data))
      .catch(() => setSeo(null));
  }, [pagePath]);

  if (!seo) return null;

  return (
    <Helmet>
      {seo.metaTitle && <title>{seo.metaTitle}</title>}
      {seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      {seo.focusKeywords && seo.focusKeywords.length > 0 && (
        <meta name="keywords" content={seo.focusKeywords.join(", ")} />
      )}
      {seo.robots && <meta name="robots" content={seo.robots} />}
      {seo.author && <meta name="author" content={seo.author} />}
      {seo.publisher && <meta name="publisher" content={seo.publisher} />}
    </Helmet>
  );
}
