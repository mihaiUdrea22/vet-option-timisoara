import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Răzvan',
    role: 'Medic veterinar chirurg',
    specialty: 'Neurochirurgie • Ortopedie • Chirurgie oncologică',
    bio: 'Răzvan a absolvit Facultatea de Medicină Veterinară la Iași, continuându-și formarea în neurologie și neurochirurgie la Spitalul Universitar din Napoli. Apoi, și-a perfecționat abilitățile clinice în Marea Britanie prin multiple specializări în chirurgie generală, neurochirurgie, ortopedie și chirurgie oncologică.\n\nÎn 2024 a finalizat un doctorat la Facultatea de Medicina Veterinara din Timișoara, axat pe chirurgia ortopedică veterinară, introducând în România o tehnică, nouă, minim invazivă pentru remedierea rupturii ligamentului încrucișat cranial la câini. Pe parcursul doctoratului, a petrecut timp în Franța pentru a-și aprofunda cunoștințele pentru a realiza strânse colaborări cu numeroși chirurgi de elită din Europa.\n\nÎn prezent, îmbină practica chirurgicală cu activitatea didactică la Facultatea de Medicină Veterinară din Timișoara, fiind dedicat atât pacienților, cât și studenților.\n\nÎn afara profesiei, Răzvan își găsește echilibrul în aventuri – fie pe munte, pe pârtia de schi sau explorând locuri noi alături de prieteni.',
    image: '/team/razvan.jpeg',
  },
  {
    name: 'Andreea',
    role: 'Medic veterinar',
    specialty: 'Medicină internă • Ecografie abdominală',
    bio: 'A absolvit Facultatea de Medicină Veterinară din Timișoara în 2021 și, de atunci, își dedică întreaga energie îngrijirii și sănătății animalelor.\n\nCu un interes deosebit pentru medicina internă și ecografia abdominală, și-a consolidat experiența profesională prin cursuri și formări periodice. Se remarcă prin atenția meticuloasă acordată fiecărui pacient, iar profesionalismul, empatia și devotamentul o recomandă drept un medic de care suntem cu adevărat mândri.\n\nÎn afara clinicii, își găsește inspirația în natură, pe care o surprinde în fotografii memorabile, și este o călătoare pasionată, mereu în căutarea unor experiențe noi.',
    image: '/team/andreea.jpeg',
  },
  {
    name: 'Antonia',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie veterinară',
    bio: 'Sunt Rădoi Antonia, studentă la Facultatea de Medicină Veterinară. Consider că dragostea mea pentru animale și dorința de a le oferi cea mai bună îngrijire mă definesc. În special, sunt atrasă de domeniul chirurgiei veterinare, iar dedicarea pentru această profesie mă motivează constant să învăț și să mă perfecționez. Sunt o persoană ambițioasă, empatică și comunicativă și mă bucur să fac parte din această echipă.',
    image: '/team/antonia.jpeg',
  },
  {
    name: 'Carla',
    role: 'Studentă medicină veterinară',
    specialty: 'Prim ajutor • Suport comportamental • Voluntariat',
    bio: 'Originară din Strasbourg, studentă la Facultatea de Medicină Veterinară din Timișoara. A demonstrat o conduită excepțională în clinică, aducând plus valoare în îngrijirea pacienților. A urmat cursuri de prim ajutor canin și suport comportamental pentru câini și pisici, iar în 2021 și-a dedicat mare parte din timpul liber voluntariatului într-un adăpost. În afara medicinei veterinare, este pasionată de drumeții, canicross, schi și călătorii, mereu în căutarea unor experiențe noi în natură.',
    image: '/team/carla.png',
  },
  {
    name: 'Alexandra',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie • Dezvoltare clinică',
    bio: 'Studentă la Facultatea de Medicină Veterinară din Timișoara, remarcată prin munca enormă depusă zilnic și dorința continuă de a evolua. Se dedică dezvoltării abilităților clinice, cu interes deosebit pentru chirurgia veterinară. Modestia și seriozitatea se reflectă în felul în care învață și aplică cunoștințele, fiind mereu dornică să aprofundeze fiecare aspect al profesiei.',
    image: '/team/carla.jpeg',
  },
  {
    name: 'Ioana',
    role: 'Studentă medicină veterinară',
    specialty: 'Medicină internă • Chirurgie animale de companie',
    bio: 'Studentă la Facultatea de Medicină Veterinară din Timișoara, având deja experiență practică acumulată anterior prin activitatea desfășurată într-o clinică veterinară, precum și prin implicarea în diverse evenimente caritabile dedicate animalelor, este perseverentă și dornică de a se perfecționa constant. Se remarcă printr-un parcurs academic remarcabil și un interes deosebit pentru medicina internă și chirurgia la animalele de companie. Își desfășoară activitatea cu profesionalism, dar și cu multă grijă și căldură față de fiecare pacient.',
    image: '/team/ioana.png',
  },
  {
    name: 'Alexandra Andras',
    role: 'Medic veterinar',
    specialty: 'Urgență • Diagnostic imagistic • Medicină internă',
    bio: 'Medic veterinar, recunoscută pentru empatie, adaptabilitate și colaborare eficientă în echipă, cu formare solidă în medicina animalelor de companie și interes special pentru medicina de urgență, diagnostic imagistic și medicină internă. Are experiență clinică acumulată atât în România, cât și în Spania, în spitale veterinare de referință.\n\nÎn timpul liber, se relaxează prin învățarea limbilor străine și descoperirea altor culturi.',
    image: '/team/alexandra-andras.png',
  },
  {
    name: 'Daria',
    role: 'Studentă medicină veterinară',
    specialty: 'Îngrijire pacienți • Dezvoltare continuă',
    bio: 'Daria este studentă la Facultatea de Medicină Veterinară, empatică și ambițioasă, mereu dornică să învețe și să se dezvolte. Abordează activitatea cu grijă și implicare, iar pasiunea pentru îngrijirea animalelor se reflectă în atenția pe care o acordă fiecărui pacient și proprietar. 🐾',
    image: '/team/daria.png',
  },
];

export default function Echipa() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const veterinarians = teamMembers.filter((member) =>
    member.role.toLowerCase().includes('medic veterinar')
  );
  const students = teamMembers.filter(
    (member) => !member.role.toLowerCase().includes('medic veterinar')
  );

  return (
    <>
      <PageSEO
        title="Echipa Medicală"
        description="Cunoaște echipa de medici și tehnicieni veterinari de la Vet Option Timișoara. Profesioniști dedicați îngrijirii câinilor și pisicilor."
        path="/echipa"
        keywords="echipă veterinară Timișoara, medici veterinari, Vet Option echipă"
      />
      <Layout>
        {/* Hero */}
        <section className="relative pt-36 pb-16 md:pb-20 bg-gradient-to-b from-teal-50/70 via-white to-white overflow-hidden">
          <div className="absolute -top-24 -left-20 w-72 h-72 bg-teal-200/35 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-amber-100/45 rounded-full blur-3xl" />
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm border border-border/60 rounded-[2rem] px-6 py-10 md:px-10 md:py-12 shadow-sm">
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
        <section className="section-padding bg-gradient-to-b from-gray-50/60 via-white to-gray-50/40" ref={ref}>
          <div className="container-custom space-y-10">
            {/* Row 1: Medici veterinari */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 p-4 md:p-6 rounded-[2rem] border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm">
              {veterinarians.map((member, index) => (
                <div
                  key={member.name}
                  className={`group rounded-[2rem] overflow-hidden border border-border/60 bg-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} la Vet Option Timișoara`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1.5">
                      <h3 className="font-heading font-bold text-xl leading-tight drop-shadow-sm">{member.name}</h3>
                      <p className="text-white/90 text-sm font-medium leading-tight">{member.role}</p>
                      <p className="text-white/85 text-xs leading-tight">{member.specialty}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 space-y-4">
                    <div className="flex flex-wrap gap-2.5">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full ring-1 ring-primary/20">
                        {member.role}
                      </span>
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full ring-1 ring-amber-100">
                        {member.specialty}
                      </span>
                    </div>
                    <div className="space-y-3 text-foreground/90 text-[15.5px] leading-7 whitespace-pre-line">
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

            {/* Row 2: Studenți */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-10 p-4 md:p-6 rounded-[2rem] border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm">
              {students.map((member, index) => (
                <div
                  key={member.name}
                  className={`group w-full sm:basis-[calc(50%-1rem)] xl:basis-[calc(33.333%-1.75rem)] max-w-[420px] rounded-[2rem] overflow-hidden border border-border/60 bg-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} la Vet Option Timișoara`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1.5">
                      <h3 className="font-heading font-bold text-xl leading-tight drop-shadow-sm">{member.name}</h3>
                      <p className="text-white/90 text-sm font-medium leading-tight">{member.role}</p>
                      <p className="text-white/85 text-xs leading-tight">{member.specialty}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 space-y-4">
                    <div className="flex flex-wrap gap-2.5">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full ring-1 ring-primary/20">
                        {member.role}
                      </span>
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full ring-1 ring-amber-100">
                        {member.specialty}
                      </span>
                    </div>
                    <div className="space-y-3 text-foreground/90 text-[15.5px] leading-7">
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
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-light via-white to-teal-50 rounded-[2rem] p-8 md:p-12 text-center max-w-3xl mx-auto border border-border/60 shadow-sm">
              <div className="absolute -top-20 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
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
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
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
