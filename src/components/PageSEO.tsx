import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';

type PageSEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string;
};

/**
 * Meta tags SEO pentru o pagină: title, description, canonical, Open Graph, Twitter.
 */
export default function PageSEO({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
}: PageSEOProps) {
  const url = path ? `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}` : SITE_URL;
  const fullTitle = path ? `${title} | ${SITE_NAME}` : title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
