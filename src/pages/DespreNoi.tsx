import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Heart, Shield, MessageCircle, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Shield,
    title: 'Profesionalism',
    description: 'Aplicăm cele mai înalte standarde în medicina veterinară, cu echipamente moderne și proceduri validate.',
  },
  {
    icon: Heart,
    title: 'Empatie',
    description: 'Tratăm fiecare pacient cu blândețe și pe fiecare proprietar cu înțelegere și răbdare.',
  },
  {
    icon: MessageCircle,
    title: 'Transparență',
    description: 'Explicăm clar diagnosticele, opțiunile de tratament și costurile, fără surprize.',
  },
  {
    icon: BookOpen,
    title: 'Învățare continuă',
    description: 'Ne perfecționăm constant prin cursuri, conferințe și schimb de experiență cu specialiști.',
  },
];

const timeline = [
  {
    year: '2015',
    title: 'Înființarea clinicii',
    description: 'Am deschis porțile primei clinici în Timișoara, cu o echipă mică dar dedicată.',
  },
  {
    year: '2017',
    title: 'Extinderea serviciilor',
    description: 'Am introdus servicii de chirurgie avansată și am investit în echipamente de ultimă generație.',
  },
  {
    year: '2019',
    title: 'Servicii ON CALL 24/7',
    description: 'Am devenit prima clinică din zonă cu urgențe veterinare disponibile 24/7.',
  },
  {
    year: '2021',
    title: 'Secția ATI',
    description: 'Am inaugurat secția de Anestezie și Terapie Intensivă, pentru cazurile cele mai grave.',
  },
  {
    year: '2024',
    title: 'Recunoaștere națională',
    description: 'Primim distincția "Firma de Aur" pentru servicii veterinare de excelență.',
  },
];

export default function DespreNoi() {
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <PageSEO
        title="Despre Noi"
        description="Descoperă povestea Vet Option Timișoara - o echipă de medici veterinari dedicați, cu experiență în cazuri complexe și urgențe ON CALL 24/7."
        path="/despre"
        keywords="Vet Option Timișoara, clinică veterinară, despre noi, echipă veterinară"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Despre noi</span>
              <h1 className="section-title mt-4">Povestea Vet Option</h1>
              <p className="section-subtitle mx-auto mt-6">
                O clinică înființată din pasiune pentru animale și dorința de a oferi îngrijire medicală 
                de cea mai înaltă calitate, inclusiv în cele mai dificile cazuri.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Mai mult decât o clinică veterinară
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Vet Option a fost înființată cu un scop simplu dar ambițios: să oferim animalelor de companie 
                    din Timișoara și împrejurimi acces la servicii medicale veterinare complete, inclusiv pentru 
                    cazurile cele mai grave, în orice moment al zilei sau nopții.
                  </p>
                  <p>
                    Am construit o echipă de medici și asistenți veterinari care împărtășesc aceeași viziune: 
                    fiecare animal merită cea mai bună șansă la viață și sănătate. De aceea, ne-am specializat 
                    în chirurgie avansată, ortopedie, neurochirurgie și terapie intensivă.
                  </p>
                  <p>
                    Pentru noi, succesul nu se măsoară doar în cazuri rezolvate, ci și în încrederea pe care 
                    proprietarii o au în echipa noastră. Comunicăm deschis, explicăm pe înțelesul tuturor și 
                    suntem alături de fiecare familie în momentele dificile.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/gallery/vet_option.png"
                  alt="Interior clinică veterinară modernă Vet Option Timișoara"
                  className="rounded-3xl shadow-large w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-gray-50" ref={valuesRef}>
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Valorile noastre</span>
              <h2 className="section-title mt-4">În ce credem</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`text-center transition-all duration-500 ${
                    valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-white" ref={timelineRef}>
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Evoluție</span>
              <h2 className="section-title mt-4">Drumul nostru</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex gap-6 mb-8 last:mb-0 transition-all duration-500 ${
                    timelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/20 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Vrei să ne cunoști echipa?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Medicii și asistenții noștri sunt pregătiți să aibă grijă de companionul tău.
            </p>
            <Link to="/echipa" className="btn-white">
              Cunoaște echipa
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
