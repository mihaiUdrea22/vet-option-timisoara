import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Siren, 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  ShieldCheck, 
  Microscope,
  BedDouble,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: Siren,
    title: 'Urgențe veterinare NON STOP',
    description: 'Disponibili 24/7 pentru orice situație critică. Echipă pregătită pentru intervenții rapide.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: HeartPulse,
    title: 'ATI & Terapie intensivă',
    description: 'Monitorizare continuă și tratament specializat pentru pacienții în stare critică.',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    icon: Stethoscope,
    title: 'Chirurgie și ortopedie',
    description: 'Intervenții chirurgicale complexe, de la operații de rutină la ortopedie avansată.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Brain,
    title: 'Neurochirurgie & artroscopie',
    description: 'Proceduri minim invazive și intervenții neurochirurgicale cu tehnologie modernă.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: ShieldCheck,
    title: 'Consultații & prevenție',
    description: 'Vaccinări, deparazitări și control periodic pentru sănătatea pe termen lung.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Microscope,
    title: 'Analize, imagistică & laborator',
    description: 'Diagnostic complet cu analize de sânge, ecografie, radiografie și mult mai mult.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BedDouble,
    title: 'Internare & spitalizare',
    description: 'Spații de recuperare confortabile cu supraveghere atentă și tratament personalizat.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Servicii</span>
          <h2 className="section-title mt-4">Ce putem face pentru companionul tău</h2>
          <p className="section-subtitle mx-auto mt-4">
            Oferim o gamă completă de servicii veterinare, de la consultații de rutină până la intervenții chirurgicale complexe.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`card-service group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/servicii" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Vezi toate serviciile
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
