import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Siren, 
  Stethoscope, 
  Brain, 
  ShieldCheck, 
  Microscope,
  Smile,
  BedDouble,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Chirurgie generală, ortopedie și neurochirurgie',
    description: 'Intervenții chirurgicale complexe, de la operații de rutină până la cazuri avansate.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Brain,
    title: 'Neurologie',
    description: 'Evaluare neurologică și plan terapeutic pentru afecțiuni ale sistemului nervos.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: ShieldCheck,
    title: 'Medicină internă, prevenție și vaccinări',
    description: 'Consultații, vaccinări și prevenție pentru sănătatea companionului pe termen lung.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Smile,
    title: 'Medicină dentară',
    description: 'Diagnostic, tratament și profilaxie dentară pentru confort și sănătate orală.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Microscope,
    title: 'Analize de laborator',
    description: 'Diagnostic de laborator cu analize de sânge și urină, cu rezultate rapide.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BedDouble,
    title: 'Internare & spitalizare',
    description: 'Supraveghere medicală continuă și îngrijire personalizată pentru pacienții internați.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Siren,
    title: 'Urgențe veterinare ON CALL 24/7 & ATI',
    description: 'Disponibili 24/7 pentru orice situație critică, cu terapie intensivă și intervenții rapide.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const previewServices = services.slice(0, 6);

  return (
    <section className="section-padding bg-gray-50/70">
      <div className="container-custom">
        {/* Header */}
        <div 
          ref={ref}
          className={`section-header transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="section-label">Servicii</span>
          <h2 className="section-title">Ce putem face pentru companionul tău</h2>
          <p className="section-subtitle mx-auto mt-5">
            Oferim o gamă completă de servicii veterinare, de la consultații de rutină 
            până la intervenții chirurgicale complexe și urgențe ON CALL 24/7.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewServices.map((service, index) => (
            <div
              key={service.title}
              className={`card-service group transition-all duration-500 text-center ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 ${service.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link 
            to="/servicii" 
            className="btn-primary"
          >
            Vezi toate serviciile
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
