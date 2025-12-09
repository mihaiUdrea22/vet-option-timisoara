import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Multiple approaches to ensure we reach the very top
    
    // Method 1: Try window.scrollTo
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    
    // Method 2: Also try scrolling the document element and body
    // This ensures compatibility with different browsers
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    
    if (document.body) {
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        'fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
        'bg-primary hover:bg-primary-dark text-primary-foreground',
        'md:bottom-8 md:right-8 md:h-14 md:w-14',
        'hover:scale-110 active:scale-95',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-16 opacity-0 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
    </Button>
  );
}

