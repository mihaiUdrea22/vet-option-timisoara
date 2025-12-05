import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Acasă', href: '/' },
  { name: 'Despre noi', href: '/despre' },
  { name: 'Servicii', href: '/servicii' },
  { name: 'Urgențe 24/7', href: '/urgente' },
  { name: 'Echipa', href: '/echipa' },
  { name: 'Recenzii', href: '/recenzii' },
  { name: 'Articole', href: '/articole' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Bar - Emergency Info */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground rounded-t-xl">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center md:justify-between py-2.5 md:py-2 gap-y-2 md:gap-y-0 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Urgențe NON STOP 24/7</span>
            </div>
            <a 
              href="tel:+40723143405" 
              className="flex md:inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-semibold bg-primary-foreground/15 md:bg-transparent px-4 py-2 md:p-0 rounded-lg w-full md:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>Sună acum: +40 723 143 405</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-[72px] md:top-[36px] left-0 right-0 z-50 transition-all duration-300 border-t-0 rounded-b-xl md:rounded-b-none ${
          isScrolled
            ? 'bg-background/98 backdrop-blur-lg shadow-sm'
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <span className="text-primary-foreground font-heading font-bold text-lg">VO</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-[17px] text-foreground block leading-tight">
                  Vet Option
                </span>
                <span className="text-xs text-muted-foreground">Timișoara</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary-light'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA button */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/contact">
                <Button className="btn-accent text-sm px-5 py-2.5 h-auto rounded-xl">
                  Programează consultație
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Meniu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in-down">
            <div className="container-custom py-5 space-y-1.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary-light'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-5 space-y-3 border-t border-border mt-4">
                <a href="tel:+40723143405" className="btn-primary w-full text-center">
                  <Phone className="w-4 h-4" />
                  Urgențe: +40 723 143 405
                </a>
                <Link to="/contact" className="btn-accent w-full text-center block">
                  Programează consultație
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
