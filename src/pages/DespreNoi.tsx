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
                    Vet Option a fost înființat în anul 2022 din dorința de a oferi, nu doar în Timișoara, ci și în întreaga zonă de vest a României, un pachet complet de servicii dedicate sănătății și bunăstării animalelor de companie. Ne bazăm activitatea pe standarde înalte de calitate, expertiză medicală actualizată și o abordare empatică, centrată atât pe pacient, cât și pe proprietar.
                  </p>
                  <p>
                    În timp, Vet Option a devenit un loc de referință pentru cazurile medicale complexe, acolo unde este nevoie de experiență, rigoare și o viziune multidisciplinară. Ne concentrăm în special pe cazurile chirurgicale si de medicina interna complexe dar si de medicina regenerativă, neurologie precum și de fizioterapie și reabilitare.
                    Fiecare caz este analizat în profunzime, fiecare decizie este atent fundamentată, iar fiecare plan terapeutic este personalizat, cu un singur obiectiv: cea mai bună șansă la recuperare și o calitate reală a vieții pentru pacient.
                  </p>
                  <p>
                    Pentru noi, medicina veterinară nu înseamnă doar tratament, ci responsabilitate, precizie și continuitate. Înseamnă să fim acolo atunci când situațiile sunt dificile, când răspunsurile nu sunt simple și când animalele au nevoie de mai mult decât o soluție.
                    La Vet Option, știm că fiecare pacient este un membru al familiei. De aceea, tratăm fiecare animal cu aceeași seriozitate, respect și grijă cu care ne-am dori să fie tratat al nostru. Vă suntem alături cu transparență, profesionalism și empatie, oferindu-vă nu doar soluții medicale, ci și încrederea că ați ales un partener real pentru sănătatea celor dragi.
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

        {/* Journey */}
        <section className="section-padding bg-white" ref={timelineRef}>
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Evoluție</span>
              <h2 className="section-title mt-4">Drumul nostru</h2>
            </div>
            <div
              className={`max-w-4xl mx-auto bg-gradient-to-br from-primary-light via-white to-teal-50 rounded-3xl p-8 md:p-10 border border-border/50 shadow-card transition-all duration-700 ${
                timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="space-y-6 text-muted-foreground leading-relaxed text-[16px] md:text-[17px]">
                <p>
                  Vet Option a luat naștere din dorința de a construi mai mult decât un cabinet veterinar – un loc în care medicina de excelență, tehnologia modernă și grija autentică pentru animale să se întâlnească firesc. Înființat în 2022, cabinetul a pornit ca un proiect construit pe pasiune, studiu continuu și respect profund pentru actul medical.
                </p>
                <p>
                  De la început, ne-am propus să abordăm cazurile dintr-o perspectivă completă, să nu ne limităm la soluții standard și să ne asumăm provocările medicale complexe. Pe măsură ce experiența s-a acumulat, direcția noastră a devenit tot mai clară: dezvoltarea unui centru dedicat chirurgiei avansate, medicinii interne, medicinii regenerative, neurologiei și neurochirurgiei, precum și fizioterapiei și reabilitării medicale.
                </p>
                <p>
                  Drumul nostru a însemnat investiții constante în echipamente, perfecționare profesională și colaborări multidisciplinare, dar și în construirea unei relații solide cu proprietarii de animale, bazată pe încredere, comunicare și transparență. Fiecare caz rezolvat, fiecare recuperare reușită și fiecare decizie luată responsabil au contribuit la conturarea identității Vet Option.
                </p>
                <p>
                  Astăzi, Vet Option este rezultatul unui parcurs construit pas cu pas, cu răbdare și consecvență, având mereu același obiectiv: să oferim pacienților noștri cele mai bune opțiuni medicale, iar proprietarilor siguranța că animalele lor sunt pe mâini competente și dedicate.
                </p>
              </div>
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
