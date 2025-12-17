import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Răzvan',
    role: 'Medic veterinar chirurg',
    specialty: 'Neurochirurgie • Ortopedie • Chirurgie oncologică',
    bio: 'Absolvent al Facultății de Medicină Veterinară Iași, și-a continuat formarea în neurologie și neurochirurgie la Spitalul Universitar din Napoli, apoi și-a perfecționat abilitățile clinice în Marea Britanie prin multiple specializări în chirurgie generală, neurochirurgie, ortopedie și chirurgie oncologică. Din 2020 urmează doctoratul în chirurgia ortopedică veterinară la Timișoara, introducând în România tehnici minim invazive pentru ruptura ligamentului încrucișat cranial la câini. A lucrat cu chirurgi de elită din Europa și îmbină practica chirurgicală cu activitatea didactică la Facultatea de Medicină Veterinară din Timișoara. Își găsește echilibrul în aventuri pe munte, pe pârtia de schi sau explorând locuri noi alături de prieteni.',
    image: '/team/razvan.jpeg',
  },
  {
    name: 'Andreea',
    role: 'Medic veterinar',
    specialty: 'Medicină internă • Ecografie abdominală',
    bio: 'A absolvit Facultatea de Medicină Veterinară din Timișoara în 2021 și, de atunci, își dedică toată energia îngrijirii și sănătății animalelor. Cu patru ani de experiență, s-a specializat în medicina internă și ecografia abdominală, perfecționându-și constant cunoștințele prin cursuri și formări periodice. Se remarcă prin atenția meticuloasă pentru fiecare pacient, iar profesionalismul, empatia și devotamentul o recomandă drept un medic de care suntem mândri. În afara cabinetului, își găsește inspirația în natură, pe care o surprinde în imagini memorabile, și este o călătoare pasionată, mereu în căutarea unor experiențe noi.',
    image: '/team/andreea.jpeg',
  },
  {
    name: 'Antonia',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie veterinară',
    bio: 'Studentă la Facultatea de Medicină Veterinară, definită de dragostea pentru animale și dorința de a le oferi cea mai bună îngrijire. Este atrasă de ramura chirurgicală și este motivată constant să învețe și să se perfecționeze. Ambițioasă, foarte empatică și comunicativă, aduce energie și dedicare în echipă.',
    image: '/team/antonia.jpeg',
  },
  {
    name: 'Carla',
    role: 'Studentă medicină veterinară',
    specialty: 'Prim ajutor • Suport comportamental • Voluntariat',
    bio: 'Originară din Strasbourg, studentă la Facultatea de Medicină Veterinară din Timișoara. A demonstrat o conduită excepțională în cabinet, aducând plus valoare în îngrijirea pacienților. A urmat cursuri de prim ajutor canin și suport comportamental pentru câini și pisici, iar în 2021 și-a dedicat mare parte din timpul liber voluntariatului într-un adăpost. În afara medicinei veterinare, este pasionată de drumeții, canicross, schi și călătorii, mereu în căutarea unor experiențe noi în natură.',
    image: '/team/carla.jpeg',
  },
  {
    name: 'Alexandra',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie • Dezvoltare clinică',
    bio: 'Studentă la Facultatea de Medicină Veterinară din Timișoara, remarcată prin munca enormă depusă zilnic și dorința continuă de a evolua. Se dedică dezvoltării abilităților clinice, cu interes deosebit pentru chirurgia veterinară. Modestia și seriozitatea se reflectă în felul în care învață și aplică cunoștințele, fiind mereu dornică să aprofundeze fiecare aspect al profesiei.',
    image: '/placeholder.svg',
  },
];

export default function Echipa() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <>
      <Helmet>
        <title>Echipa Medicală | Vet Option Timișoara - Cabinet Veterinar</title>
        <meta 
          name="description" 
          content="Cunoaște echipa de medici și tehnicieni veterinari de la Vet Option Timișoara. Profesioniști dedicați îngrijirii câinilor și pisicilor." 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-36 pb-16 md:pb-20 bg-gradient-to-b from-teal-50/50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Echipa</span>
              <h1 className="section-title mt-4">Oamenii din spatele îngrijirii</h1>
              <p className="section-subtitle mx-auto mt-6">
                O echipă de profesioniști dedicați, pasionați de medicina veterinară și de bunăstarea 
                animalelor. Fiecare membru al echipei aduce expertiză, empatie și dedicare în munca sa.
              </p>
            </div>
          </div>
        </section>

        {/* Team grid */}
        <section className="section-padding bg-gray-50/50" ref={ref}>
          <div className="container-custom space-y-10">
            {/* Row 1: Răzvan & Andreea */}
            <div className="grid md:grid-cols-2 gap-10">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div
                  key={member.name}
                  className={`card-team bg-gradient-to-b from-white to-primary/5 border border-border/50 shadow-xl backdrop-blur transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} la Vet Option Timișoara`}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 to-transparent rounded-3xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                      <h3 className="font-heading font-bold text-xl leading-tight drop-shadow-sm">{member.name}</h3>
                      <p className="text-white/90 text-sm font-medium leading-tight">{member.role}</p>
                      <p className="text-white/85 text-xs leading-tight">{member.specialty}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 space-y-4 bg-white rounded-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {member.role}
                      </span>
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">
                        {member.specialty}
                      </span>
                    </div>
                    <div className="space-y-3 text-foreground/90 text-[15.5px] leading-7 text-balance whitespace-pre-line">
                      <div
                        style={
                          expanded[member.name]
                            ? undefined
                            : {
                                display: '-webkit-box',
                                WebkitLineClamp: 6,
                                WebkitBoxOrient: 'vertical' as const,
                                overflow: 'hidden',
                              }
                        }
                      >
                        {member.bio.replace(/\. /g, '.\n')}
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpanded((prev) => ({ ...prev, [member.name]: !prev[member.name] }))}
                        className="text-primary font-semibold text-sm hover:underline"
                      >
                        {expanded[member.name] ? 'Ascunde' : 'Citește mai mult'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: ceilalți 3 */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.slice(2).map((member, index) => (
                <div
                  key={member.name}
                  className={`card-team bg-gradient-to-b from-white to-primary/5 border border-border/50 shadow-xl backdrop-blur transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} la Vet Option Timișoara`}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 to-transparent rounded-3xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                      <h3 className="font-heading font-bold text-xl leading-tight drop-shadow-sm">{member.name}</h3>
                      <p className="text-white/90 text-sm font-medium leading-tight">{member.role}</p>
                      <p className="text-white/85 text-xs leading-tight">{member.specialty}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 space-y-4 bg-white rounded-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {member.role}
                      </span>
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">
                        {member.specialty}
                      </span>
                    </div>
                    <div className="space-y-3 text-foreground/90 text-[15.5px] leading-7 text-balance">
                      {member.bio}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join team */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-br from-primary-light to-teal-50 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Vrei să faci parte din echipa noastră?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Căutăm mereu colegi pasionați de medicina veterinară. Dacă vrei să lucrezi 
                într-un mediu profesionist și prietenos, trimite-ne un mesaj.
              </p>
              <Link to="/contact" className="btn-primary">
                Contactează-ne
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Programează o consultație
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
              Echipa noastră este pregătită să aibă grijă de companionul tău.
            </p>
            <a href="tel:+40723143405" className="btn-accent px-8 py-4 text-base">
              <Phone className="w-5 h-5" />
              +40 723 143 405
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
}
