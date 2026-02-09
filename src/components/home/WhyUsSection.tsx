import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Award, Heart, Settings, Users } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Experiență în cazuri complexe',
    description: 'Specializare în intervenții chirurgicale dificile și cazuri critice unde alții nu mai pot ajuta.',
  },
  {
    icon: Heart,
    title: 'Empatie și comunicare clară',
    description: 'Explicăm pe înțelesul tuturor și suntem alături de tine în fiecare moment dificil.',
  },
  {
    icon: Settings,
    title: 'Dotări moderne',
    description: 'Echipamente de ultimă generație pentru ATI, chirurgie, artroscopie și endoscopie.',
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1581888227599-779811939961?w=800&h=600&fit=crop"
                alt="Echipă veterinară modernă Vet Option Timișoara"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-primary/8 rounded-full blur-3xl" />
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div ref={ref}>
            <span className="section-label">De ce noi</span>
            <h2 className="section-title mb-8">De ce Vet Option?</h2>
            
            <div className="space-y-6 mb-10">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className={`flex gap-5 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[17px] text-foreground mb-1.5">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emotional quote */}
            <div 
              className={`bg-gradient-to-br from-primary-light via-teal-50 to-white rounded-2xl p-7 border-l-4 border-primary transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <p className="text-foreground text-[17px] leading-relaxed italic">
                „Pentru noi, fiecare pacient este mai mult decât un caz – este un membru al familiei tale. 
                Facem tot ce ne stă în putere pentru ca tu să pleci acasă cu animalul în siguranță."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
