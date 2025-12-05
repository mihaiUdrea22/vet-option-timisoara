import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-amber-50/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              Urgențe NON STOP – 24/7
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Cabinet veterinar cu urgențe{' '}
              <span className="text-primary">NON STOP</span>{' '}
              în Timișoara
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Chirurgie avansată, ATI și îngrijire completă pentru câini și pisici, 
              cu o echipă dedicată care nu renunță până când pacientul este în siguranță.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+40723143405">
                <Button className="btn-accent w-full sm:w-auto text-base px-8 py-4 h-auto gap-2">
                  <Phone className="w-5 h-5" />
                  Sună acum – Urgențe NON STOP
                </Button>
              </a>
              <Link to="/contact">
                <Button className="btn-outline w-full sm:w-auto text-base px-8 py-4 h-auto gap-2">
                  Programează o consultație
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Str. Ion Roată 48, Timișoara
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Program: Urgențe NON STOP
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&h=900&fit=crop"
                alt="Medic veterinar Timișoara cu câine și pisică în cabinet modern"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-large p-6 max-w-xs animate-float">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Laureat</p>
                  <p className="text-sm text-muted-foreground">Firma de Aur</p>
                </div>
              </div>
            </div>

            {/* Rating card */}
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-large p-4 animate-float delay-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-amber-500 text-lg">★</span>
                  ))}
                </div>
                <span className="font-heading font-bold text-foreground">4.9</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">100+ recenzii</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
