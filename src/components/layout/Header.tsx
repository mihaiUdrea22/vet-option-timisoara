import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+40723143405" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span>Urgențe NON STOP: +40 723 143 405</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Str. Ion Roată 48, Timișoara</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/vetoptionclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/19ghUWcqjr/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-heading font-bold text-xl">VO</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-lg text-foreground block leading-tight">
                Vet Option
              </span>
              <span className="text-xs text-muted-foreground">Timișoara</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary bg-primary-light'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+40723143405">
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+40 723 143 405</span>
              </Button>
            </a>
            <Link to="/contact">
              <Button className="btn-accent text-sm px-4 py-2 h-auto">
                Programează consultație
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <div className="container-custom py-4 space-y-2">
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
            <div className="pt-4 space-y-3">
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
  );
}
