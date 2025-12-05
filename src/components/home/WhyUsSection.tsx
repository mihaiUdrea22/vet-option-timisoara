import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Award, Heart, Settings, Users } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Experiență în cazuri complexe',
    description: 'Specializare în intervenții chirurgicale dificile și cazuri critice unde altele nu mai pot ajuta.',
  },
  {
    icon: Heart,
    title: 'Empatie și comunicare clară',
    description: 'Explicăm pe înțelesul tuturor și suntem alături de tine în fiecare moment dificil.',
  },
  {
    icon: Settings,
    title: 'Dotări moderne',
    description: 'Echipamente de ultimă generație pentru ATI, chirurgie, endoscopie și imagistică.',
  },
  {
    icon: Users,
    title: 'Echipă unită și pasionată',
    description: 'Medici și asistenți veterinari dedicați care lucrează împreună pentru pacienții lor.',
  },
];

export default function WhyUsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581888227599-779811939961?w=800&h=600&fit=crop"
                alt="Echipă veterinară modernă Vet Option Timișoara"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div ref={ref}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">De ce noi</span>
            <h2 className="section-title mt-4 mb-6">De ce Vet Option?</h2>
            
            <div className="space-y-6 mb-8">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className={`flex gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emotional quote */}
            <div 
              className={`bg-gradient-to-r from-primary-light to-teal-50 rounded-2xl p-6 border-l-4 border-primary transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <p className="text-foreground italic">
                „Pentru noi, fiecare pacient este mai mult decât un caz – este un membru al familiei tale."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
