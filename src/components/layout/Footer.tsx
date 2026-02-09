import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import logoVetOption from '@/assets/logo-vet-option.png';

const quickLinks = [
  { name: 'Acasă', href: '/' },
  { name: 'Despre noi', href: '/despre' },
  { name: 'Servicii', href: '/servicii' },
  { name: 'Urgențe 24/7', href: '/urgente' },
  { name: 'Echipa', href: '/echipa' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Chirurgie', href: '/servicii' },
  { name: 'Medicină internă', href: '/servicii' },
  { name: 'Neurologie și neurochirurgie', href: '/servicii' },
  { name: 'Medicină dentară', href: '/servicii' },
  { name: 'Urgențe ON CALL 24/7 & ATI', href: '/urgente' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoVetOption} 
                alt="Vet Option Timișoara Logo" 
                className="w-12 h-12 rounded-xl object-contain"
              />
              <div>
                <span className="font-heading font-bold text-lg text-white block leading-tight">
                  Vet Option
                </span>
                <span className="text-xs text-gray-400">Timișoara</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Clinică Medicală Veterinară cu urgențe ON CALL 24/7 în Timișoara. Oferim servicii de chirurgie avansată, 
              medicină internă și îngrijire completă pentru câini și pisici.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/vetoptionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/19ghUWcqjr/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 text-lg">Navigare</h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 text-lg">Servicii</h4>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-5">
              <li>
                <a
                  href="tel:+40723143405"
                  className="flex items-start gap-3 text-sm hover:text-primary transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-white group-hover:text-primary">Urgențe ON CALL 24/7</span>
                    <span className="text-gray-400">+40 723 143 405</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <span className="block font-medium text-white">Adresă</span>
                  <span className="text-gray-400">Str. Ion Roată 48, Timișoara</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <span className="block font-medium text-white">Program</span>
                  <span className="text-gray-400">Luni–Vineri: 10:00 – 20:00</span><br />
                  <span className="text-gray-400">Urgențe: ON CALL 24/7</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-500">© {new Date().getFullYear()} Vet Option Timișoara. Toate drepturile rezervate.</p>
          <p className="text-gray-600">
            Clinică Medicală Veterinară – Urgențe ON CALL 24/7
          </p>
        </div>
      </div>
    </footer>
  );
}
