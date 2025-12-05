import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Maria T.',
    pet: 'Max – Golden Retriever',
    rating: 5,
    text: 'Max a avut dilatație gastrică și a fost operat de urgență la 3 dimineața. Echipa a fost incredibilă – profesioniști, calmi și foarte grijulii. Ne-au ținut la curent cu tot ce se întâmplă. Max s-a recuperat complet și suntem recunoscători pentru totdeauna!',
    date: 'Noiembrie 2024',
  },
  {
    name: 'Andrei P.',
    pet: 'Luna – Pisică Persană',
    rating: 5,
    text: 'Luna a avut o problemă cardiacă gravă și echipa de ATI a fost lângă ea non-stop. Comunicarea a fost excelentă, ne-au explicat totul pe înțelesul nostru și ne-au ajutat să luăm cele mai bune decizii. Vă recomand din suflet!',
    date: 'Octombrie 2024',
  },
  {
    name: 'Elena M.',
    pet: 'Rocky – Labrador',
    rating: 5,
    text: 'Am venit de urgență într-un weekend cu Rocky care nu mai putea merge. A fost diagnosticat rapid cu hernie de disc și operat în aceeași zi. Acum aleargă din nou fericit. Mulțumim, Vet Option!',
    date: 'Octombrie 2024',
  },
  {
    name: 'Cosmin D.',
    pet: 'Bella – Pisică Britanică',
    rating: 5,
    text: 'Bella a fost internată 5 zile pentru o infecție severă. Am primit update-uri zilnice cu poze și informații detaliate. Se vede că le pasă cu adevărat de pacienți și de proprietari.',
    date: 'Septembrie 2024',
  },
  {
    name: 'Diana R.',
    pet: 'Thor – Husky',
    rating: 5,
    text: 'Thor a avut nevoie de operație ortopedică pentru o ruptură de ligament. Dr. Popescu a explicat totul clar, iar Thor s-a recuperat mai repede decât ne așteptam. Clinica este curată, modernă și personalul foarte amabil.',
    date: 'Septembrie 2024',
  },
  {
    name: 'Mihai S.',
    pet: 'Cleo – Maine Coon',
    rating: 5,
    text: 'Am descoperit o problemă timpuriu la un control de rutină care ar fi putut fi gravă. Mulțumesc pentru profesionalismul și atenția la detalii. Cleo este sănătoasă datorită vouă!',
    date: 'August 2024',
  },
  {
    name: 'Ana B.',
    pet: 'Oscar – Beagle',
    rating: 5,
    text: 'Oscar a înghițit un corp străin și a fost nevoie de endoscopie. Totul s-a rezolvat rapid și fără complicații. Echipa a fost foarte prietenoasă și ne-a liniștit în momentele de panică.',
    date: 'August 2024',
  },
  {
    name: 'Vlad M.',
    pet: 'Mia – Pisică',
    rating: 5,
    text: 'Blocaj urinar în weekend – am sunat și în 30 de minute eram la clinică. Mia a fost tratată imediat și acum e bine. Nu am cuvinte să mulțumesc pentru disponibilitatea NON STOP!',
    date: 'Iulie 2024',
  },
  {
    name: 'Ioana C.',
    pet: 'Buddy – Cocker Spaniel',
    rating: 5,
    text: 'Buddy a avut nevoie de intervenție chirurgicală pentru o tumoră. Am fost ținuți la curent cu fiecare pas și am simțit că Buddy e pe mâini bune. Recuperarea a fost excelentă!',
    date: 'Iulie 2024',
  },
];

export default function Recenzii() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Recenzii și Testimoniale | Vet Option Timișoara - Cabinet Veterinar</title>
        <meta 
          name="description" 
          content="Citește recenziile proprietarilor care au apelat la Vet Option Timișoara. Rating 4.9/5 cu peste 100 de recenzii de 5 stele." 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-amber-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Recenzii</span>
              <h1 className="section-title mt-4">Ce spun proprietarii despre noi</h1>
              <p className="section-subtitle mx-auto mt-6">
                Suntem mândri de încrederea pe care ne-o acordă proprietarii animalelor de companie 
                din Timișoara și împrejurimi.
              </p>
              
              {/* Rating summary */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="font-heading font-bold text-2xl text-foreground">4.9</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <p className="text-muted-foreground">100+ recenzii</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="section-padding bg-white" ref={ref}>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`card-testimonial transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-foreground mb-6 leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.pet}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
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
              Vrei să vezi de ce ne aleg proprietarii?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Programează o vizită și descoperă singur diferența Vet Option.
            </p>
            <Link to="/contact" className="btn-accent">
              Programează o vizită
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
