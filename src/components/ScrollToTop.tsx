import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * La fiecare schimbare de rută, face scroll la topul paginii.
 * Folosim requestAnimationFrame ca scroll-ul să aibă loc după ce noua pagină s-a randat.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scroll = () => window.scrollTo(0, 0);
    // Rulează după ce browser-ul a randat frame-ul curent, ca noua pagină să fie deja vizibilă
    const id = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll); // al doilea rAF pentru după paint
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
