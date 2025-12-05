import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, AlertTriangle, Dog, Cat, ChevronDown, ChevronUp, MessageCircle, Car } from 'lucide-react';
import { useState } from 'react';

const dogSigns = [
  'Respirație dificilă, gâfâit excesiv sau neobișnuit',
  'Abdomen umflat și dureros (posibilă dilatație gastrică)',
  'Colaps sau incapacitatea de a se ridica',
  'Convulsii sau tremurături severe',
  'Sângerare abundentă sau hemoragie',
  'Vomă repetată sau diaree cu sânge',
  'Incapacitate de a urina sau defecare',
  'Traumatism (accident, cădere, mușcătură)',
  'Intoxicație (ciocolată, antigel, medicamente)',
  'Pierderea conștienței sau letargie extremă',
];

const catSigns = [
  'Respirație pe gură (pisicile nu respiră normal pe gură)',
  'Blocaj urinar (pisica nu poate urina)',
  'Vomă repetată sau letargie severă',
  'Colaps sau incapacitatea de a merge',
  'Traumatism (cădere de la înălțime, accident)',
  'Sângerare sau răni deschise',
  'Convulsii sau tremurături',
  'Intoxicație (plante, medicamente, chimicale)',
  'Dificultăți la naștere',
  'Ochii în afara orbitei sau vizibil afectați',
];

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Păstrează-ți calmul și sună imediat',
    description: 'Contactează-ne la +40 723 143 405 – suntem disponibili NON STOP.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Descrie pe scurt simptomele',
    description: 'Spune-ne ce se întâmplă și urmează indicațiile medicului de gardă.',
  },
  {
    number: '03',
    icon: Car,
    title: 'Pornește către clinică',
    description: 'Echipa noastră te așteaptă pregătită să intervină rapid.',
  },
];

const faqs = [
  {
    question: 'Ce trebuie să fac înainte de a veni la clinică?',
    answer: 'Păstrează-ți calmul și sună-ne la +40 723 143 405. Descrie pe scurt ce se întâmplă și urmează instrucțiunile echipei. Dacă e posibil, imobilizează animalul cu grijă pentru transport.',
  },
  {
    question: 'Cât de repede pot ajunge la voi?',
    answer: 'Suntem în Str. Ion Roată 48, Timișoara. Poți folosi Google Maps pentru indicații. Te sfătuim să conduci prudent și să ne anunți că ești pe drum.',
  },
  {
    question: 'Ce costă o consultație de urgență?',
    answer: 'Costurile variază în funcție de gravitatea cazului și de intervențiile necesare. Te vom informa despre costuri înainte de orice procedură și vom discuta opțiunile disponibile.',
  },
  {
    question: 'Pot plăti cu cardul?',
    answer: 'Da, acceptăm plata cu cardul, numerar și transfer bancar. În situații de urgență, nu amâna vizita din cauza costurilor – putem discuta opțiuni de plată.',
  },
];

export default function Urgente() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Urgențe Veterinare NON STOP 24/7 | Vet Option Timișoara</title>
        <meta 
          name="description" 
          content="Urgențe veterinare NON STOP în Timișoara. Cabinet medical veterinar disponibil 24/7 pentru câini și pisici. Sună acum: +40 723 143 405" 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-36 pb-16 bg-gradient-to-b from-red-50/70 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                Disponibili NON STOP – 24/7
              </div>
              <h1 className="section-title">Urgențe veterinare NON STOP, 24/7</h1>
              <p className="section-subtitle mx-auto mt-6">
                În caz de urgență, fiecare minut contează. Suntem aici pentru tine și pentru companionul tău, 
                oricând ai nevoie, zi sau noapte. Nu ezita să suni!
              </p>
              <a 
                href="tel:+40723143405" 
                className="btn-accent px-10 py-5 text-lg mt-10 inline-flex shadow-accent"
              >
                <Phone className="w-6 h-6" />
                Sună acum: +40 723 143 405
              </a>
            </div>
          </div>
        </section>

        {/* What is emergency */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7 md:p-8 flex gap-5">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                  Ce înseamnă o urgență veterinară?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O urgență veterinară este orice situație în care animalul tău prezintă simptome severe, 
                  durere intensă sau schimbări bruște de stare care necesită intervenție medicală imediată. 
                  Dacă nu ești sigur dacă e urgență, mai bine sună-ne – te ajutăm să decizi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Steps */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
              Ce faci în caz de urgență?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="text-white/30 font-heading font-bold text-5xl block mb-2">{step.number}</span>
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/80 text-[15px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signs */}
        <section className="section-padding bg-gray-50/70" ref={ref}>
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="section-title">Semne de urgență</h2>
              <p className="section-subtitle mx-auto mt-4">
                Dacă observi oricare dintre aceste simptome, contactează-ne imediat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dogs */}
              <div 
                className={`card-feature transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Dog className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">Semne la câini</h3>
                </div>
                <ul className="space-y-3">
                  {dogSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-[15px]">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cats */}
              <div 
                className={`card-feature transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Cat className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">Semne la pisici</h3>
                </div>
                <ul className="space-y-3">
                  {catSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-[15px]">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-14">
              <h2 className="section-title">Întrebări frecvente despre urgențe</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-border/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-heading font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-red-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Nu aștepta – în caz de urgență, sună imediat!
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg">
              Echipa noastră este pregătită NON STOP să intervină rapid și profesionist.
            </p>
            <a href="tel:+40723143405" className="btn-white px-10 py-5 text-lg">
              <Phone className="w-6 h-6" />
              Urgență: +40 723 143 405
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
}
