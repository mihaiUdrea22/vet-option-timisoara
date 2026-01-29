import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, Heart, Clock } from 'lucide-react';

const trustItems = [
  {
    icon: Star,
    title: 'Peste 100 de recenzii excelente',
    subtitle: 'Majoritatea de 5 stele pe Google și Facebook',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Heart,
    title: 'Mii de pacienți îngrijiți',
    subtitle: 'De la consultații de rutină la cazuri critice',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Clock,
    title: 'Urgențe ON CALL 24/7',
    subtitle: 'Disponibili 24/7 în Timișoara',
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
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                  <h3 className="font-heading font-bold text-lg text-foreground leading-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-10 pt-8 border-t border-border/50 max-w-3xl mx-auto">
            Proprietarii ne aleg pentru combinația dintre medicină veterinară avansată, empatie și comunicare clară, mai ales în momentele critice.
          </p>
        </div>
      </div>
    </section>
  );
}
