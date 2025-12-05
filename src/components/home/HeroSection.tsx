import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-28">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1920&h=1280&fit=crop"
          alt="Medic veterinar cu câine și pisică în cabinet modern Timișoara"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/75 to-teal-700/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse-soft" />
            Disponibili NON STOP – 24/7
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-heading font-bold text-white leading-[1.1] mb-6 animate-fade-in-up delay-100">
            Cabinet veterinar cu urgențe{' '}
            <span className="text-accent">NON STOP</span>{' '}
            în Timișoara
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
            Chirurgie avansată, ATI și îngrijire completă pentru câini și pisici, 
            într-o clinică unde fiecare pacient este tratat ca un membru al familiei.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 animate-fade-in-up delay-300">
            <a href="tel:+40723143405">
              <Button className="btn-accent w-full sm:w-auto text-base px-8 py-4 h-auto gap-3 rounded-2xl shadow-accent">
                <Phone className="w-5 h-5" />
                Sună acum – Urgențe NON STOP
              </Button>
            </a>
            <Link to="/contact">
              <Button className="w-full sm:w-auto text-base px-8 py-4 h-auto gap-2 rounded-2xl bg-white/15 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all">
                Programează o consultație
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Info badges */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 animate-fade-in-up delay-400">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Str. Ion Roată 48, Timișoara</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Urgențe NON STOP – 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Cards */}
      <div className="absolute bottom-8 right-8 hidden xl:flex flex-col gap-4 animate-fade-in delay-500">
        {/* Rating card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg animate-float">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-amber-500 text-xl">★</span>
              ))}
            </div>
            <span className="font-heading font-bold text-xl text-foreground">4.9</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">100+ recenzii de 5 stele</p>
        </div>

        {/* Award card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg animate-float delay-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">Laureat</p>
              <p className="text-sm text-muted-foreground">Firma de Aur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
