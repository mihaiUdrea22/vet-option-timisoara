import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Siren, HeartPulse, Stethoscope, Brain, ShieldCheck, 
  Microscope, BedDouble, Phone, Check, Bone, Eye, Smile, Activity
} from 'lucide-react';

const services = [
  {
    id: 'chirurgie',
    icon: Stethoscope,
    title: 'Chirurgie generală, ortopedie și neurochirurgie',
    description: 'Efectuăm o gamă largă de intervenții chirurgicale, de la operații de rutină până la proceduri complexe de ortopedie și neurochirurgie.',
    features: [
      'Chirurgie țesuturilor moi (sterilizări, tumori, etc.)',
      'Chirurgie ortopedică (fracturi, luxații, ligamente)',
      'Neurochirurgie pentru afecțiuni ale coloanei',
      'Anestezie modernă și monitorizare avansată',
      'Recuperare post-operatorie supravegheată',
    ],
    situations: [
      'Fracturi osoase de orice complexitate',
      'Rupturi de ligamente (LCA, etc.)',
      'Hernie de disc',
      'Tumori și formațiuni',
      'Sterilizări și castrări',
    ],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    id: 'consultatii',
    icon: ShieldCheck,
    title: 'Medicină internă, prevenție și vaccinări',
    description: 'Controale regulate, vaccinări și deparazitări pentru a menține sănătatea animalului tău pe termen lung. Prevenția este cea mai bună medicină.',
    features: [
      'Consultații generale și de specialitate',
      'Scheme complete de vaccinare',
      'Deparazitare internă și externă',
      'Microchip și pașaport european',
      'Sfaturi de nutriție și îngrijire',
    ],
    situations: [
      'Control anual de sănătate',
      'Vaccinări de rutină sau rapeluri',
      'Pregătire pentru călătorii',
      'Consultații pentru adopții recente',
      'Întrebări despre nutriție sau comportament',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 'neurologie',
    icon: Brain,
    title: 'Neurologie și neurochirurgie',
    description: 'Evaluare neurologică și management dedicat pentru afecțiuni ale creierului, măduvei și nervilor periferici.',
    features: [
      'Consult neurologic complet',
      'Localizarea leziunilor neurologice',
      'Plan terapeutic personalizat',
      'Monitorizare neurologică în evoluție',
      'Indicații pentru intervenții neurochirurgicale',
    ],
    situations: [
      'Hernie de disc suspectată',
      'Slăbiciune sau paralizie instalată brusc',
      'Crize convulsive recurente',
      'Tulburări de mers și coordonare',
      'Durere cervicală sau lombară persistentă',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'dentara',
    icon: Smile,
    title: 'Medicină dentară',
    description: 'Diagnostic, tratament și profilaxie dentară pentru a preveni durerea, infecțiile orale și complicațiile asociate.',
    features: [
      'Consultație stomatologică veterinară completă',
      'Detartraj și igienizare dentară profesională',
      'Evaluarea gingiilor și a afecțiunilor parodontale',
      'Extracții dentare când sunt necesare',
      'Recomandări de îngrijire dentară la domiciliu',
    ],
    situations: [
      'Miros neplăcut persistent al gurii',
      'Tartru vizibil și gingii inflamate',
      'Dificultăți la mestecat sau scăderea apetitului',
      'Durere orală sau salivare excesivă',
      'Control dentar periodic preventiv',
    ],
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    id: 'diagnostic',
    icon: Microscope,
    title: 'Analize de laborator',
    description: 'Diagnostic de laborator cu analize de sânge și urină pentru evaluarea corectă a stării de sănătate.',
    features: [
      'Analize hematologice și biochimice',
      'Analize de urină și examen coproparazitologic',
      'Rezultate rapide în clinică',
      'Interpretare medicală și recomandări de tratament',
      'Monitorizarea evoluției în timp',
    ],
    situations: [
      'Verificare înainte de anestezie/operație',
      'Diagnosticul bolilor interne',
      'Monitorizarea afecțiunilor cronice',
      'Screening de sănătate periodic',
      'Investigarea simptomelor nespecifice',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'internare',
    icon: BedDouble,
    title: 'Internare & spitalizare',
    description: 'Spații de recuperare confortabile și curate, cu supraveghere permanentă și tratament personalizat pentru pacienții care au nevoie de îngrijire extinsă.',
    features: [
      'Boxe individuale și curate',
      'Supraveghere 24/7 de către personal medical',
      'Tratamente administrate la timp',
      'Comunicare zilnică cu proprietarii',
      'Alimentație adaptată stării pacientului',
    ],
    situations: [
      'Recuperare post-operatorie',
      'Tratamente intravenoase prelungite',
      'Monitorizare pentru afecțiuni grave',
      'Stabilizare înainte de intervenții',
      'Îngrijire paliativă',
    ],
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'urgente',
    icon: Siren,
    title: 'Urgențe veterinare ON CALL 24/7 & ATI',
    description: 'Suntem disponibili 24 de ore din 24, 7 zile din 7, pentru orice urgență veterinară. Echipa noastră de terapie intensivă este pregătită să intervină rapid și eficient.',
    features: [
      'Disponibilitate ON CALL 24/7, inclusiv în weekend și sărbători',
      'Echipă specializată în terapie intensivă veterinară',
      'Monitorizare continuă pentru pacienții critici',
      'Echipamente de resuscitare și suport vital',
      'Intervenții de urgență pentru traumatisme grave',
    ],
    situations: [
      'Accidente rutiere sau traumatisme',
      'Dilatație/torsiune gastrică',
      'Intoxicații și otrăviri',
      'Dificultăți respiratorii severe',
      'Hemoragii sau colaps',
    ],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
];

export default function Servicii() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <PageSEO
        title="Servicii Veterinare"
        description="Servicii complete de medicină veterinară: urgențe ON CALL 24/7, chirurgie, ATI, neurochirurgie, consultații și analize de laborator pentru câini și pisici în Timișoara."
        path="/servicii"
        keywords="servicii veterinare Timișoara, urgențe veterinare, chirurgie veterinară, ATI veterinar, consultații câini pisici"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Servicii</span>
              <h1 className="section-title mt-4">Servicii veterinare complete</h1>
              <p className="section-subtitle mx-auto mt-6">
                De la consultații de rutină până la intervenții chirurgicale complexe și urgențe ON CALL 24/7, 
                oferim tot ce are nevoie companionul tău pentru o viață sănătoasă.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-white" ref={ref}>
          <div className="container-custom space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-32 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border border-border/50">
                  <div className="grid lg:grid-cols-2 gap-10">
                    {/* Content */}
                    <div>
                      <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                        <service.icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <h3 className="font-heading font-semibold text-foreground mb-3">Ce oferim:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Situations */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-4">
                        Când să apelezi la acest serviciu:
                      </h3>
                      <ul className="space-y-3">
                        {service.situations.map((situation) => (
                          <li key={situation} className="flex items-start gap-3">
                            <div className={`w-2 h-2 ${service.color.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`} />
                            <span className="text-muted-foreground">{situation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Nu ești sigur ce serviciu are nevoie companionul tău?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Sună-ne și te ghidăm. Echipa noastră este aici să răspundă la orice întrebare.
            </p>
            <a href="tel:+40723143405" className="btn-accent px-8 py-4 text-base">
              <Phone className="w-5 h-5" />
              Sună acum: +40 723 143 405
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
}
