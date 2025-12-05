import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, Award, Clock } from 'lucide-react';

const trustItems = [
  {
    icon: Star,
    title: 'Peste 100+ recenzii',
    subtitle: 'de 5 stele',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Award,
    title: 'Laureat',
    subtitle: 'Firma de Aur',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    icon: Clock,
    title: 'Urgențe NON STOP',
    subtitle: '24/7 în Timișoara',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
];

export default function TrustSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-8 md:py-12 -mt-20 relative z-20">
      <div
        ref={ref}
        className={`container-custom transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-border/30">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {trustItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center gap-5 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-8 pt-8 border-t border-border/50 max-w-2xl mx-auto">
            Proprietarii ne aleg pentru profesionalism, empatie și rezultate excelente în cazuri critice.
          </p>
        </div>
      </div>
    </section>
  );
}
