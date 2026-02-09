import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/lib/seo';

/**
 * JSON-LD LocalBusiness pentru Google – afișare în rezultate căutare (adresă, program, telefon).
 */
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryCare',
  name: 'Vet Option Timișoara',
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: '+40723143405',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Ion Roată 48',
    addressLocality: 'Timișoara',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.7607,
    longitude: 21.2269,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: 'Urgențe ON CALL 24/7',
    },
  ],
  priceRange: '$$',
  description:
    'Clinică veterinară în Timișoara cu urgențe ON CALL 24/7. Chirurgie avansată, ATI, ortopedie și neurochirurgie pentru câini și pisici.',
};

export default function JsonLdLocalBusiness() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
    </Helmet>
  );
}
