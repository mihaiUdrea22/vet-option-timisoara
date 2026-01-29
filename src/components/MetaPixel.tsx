import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: (action: string, ...args: unknown[]) => void;
  }
}

const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID as string | undefined;

/**
 * Meta (Facebook) Pixel – se încarcă doar dacă VITE_FACEBOOK_PIXEL_ID este setat.
 * Track-uiește PageView la încărcare și la fiecare schimbare de rută (SPA).
 */
export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    if (!PIXEL_ID || typeof window === 'undefined') return;

    const loadPixel = () => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
        return;
      }

      const f = window;
      const b = document;
      const e = 'script';
      const v = 'https://connect.facebook.net/en_US/fbevents.js';
      const n = (f.fbq = function (...args: unknown[]) {
        (n.callMethod ? n.callMethod.apply(n, args) : n.queue?.push(args)) as void;
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
      window.fbq('init', PIXEL_ID);
      window.fbq('track', 'PageView');
    };

    loadPixel();
  }, []);

  useEffect(() => {
    if (!PIXEL_ID || !window.fbq) return;
    window.fbq('track', 'PageView');
  }, [location.pathname]);

  if (!PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
