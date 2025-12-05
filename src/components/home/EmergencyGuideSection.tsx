import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, MessageCircle, Car, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Păstrează-ți calmul și sună imediat',
    description: 'Contactează-ne la +40 723 143 405 – suntem disponibili NON STOP.',
    color: 'bg-red-500',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Descrie pe scurt simptomele',
    description: 'Spune-ne ce se întâmplă ca să ne pregătim pentru sosirea ta.',
    color: 'bg-amber-500',
  },
  {
    number: '03',
    icon: Car,
    title: 'Pornește către clinică',
    description: 'Vino cât mai repede, iar noi te așteptăm pregătiți să intervenim.',
    color: 'bg-primary',
  },
];

export default function EmergencyGuideSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-white/80 font-medium text-sm uppercase tracking-wider">Ghid de urgență</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
            Ce faci în caz de urgență?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`text-center transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <span className="text-white/50 font-heading font-bold text-5xl block mb-2">{step.number}</span>
              <h3 className="font-heading font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <a href="tel:+40723143405" className="btn-accent px-8 py-4 text-base">
            <Phone className="w-5 h-5" />
            Sună acum: +40 723 143 405
          </a>
          <Link to="/contact" className="btn-white px-8 py-4 text-base">
            <MapPin className="w-5 h-5" />
            Vezi cum ajungi la noi
          </Link>
        </div>
      </div>
    </section>
  );
}
