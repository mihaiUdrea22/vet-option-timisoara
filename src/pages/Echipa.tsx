import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Alexandru Popescu',
    role: 'Medic veterinar chirurg – Director medical',
    specialty: 'Chirurgie generală, ortopedie, traumatologie',
    bio: 'Cu peste 10 ani de experiență în chirurgie veterinară, Dr. Alexandru coordonează echipa chirurgicală și se ocupă de cele mai complexe cazuri ortopedice. Pasiunea lui pentru meserie l-a determinat să participe la numeroase congrese internaționale.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Maria Ionescu',
    role: 'Medic veterinar ATI',
    specialty: 'Anestezie, terapie intensivă, urgențe',
    bio: 'Specializată în anestezie și terapie intensivă, Dr. Maria este coloana vertebrală a serviciului de urgențe NON STOP. Calmă și eficientă sub presiune, ea se asigură că fiecare pacient critic primește îngrijirea de care are nevoie.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Andrei Munteanu',
    role: 'Medic veterinar',
    specialty: 'Neurochirurgie, imagistică, diagnosticare',
    bio: 'Cu o pasiune deosebită pentru neurologie, Dr. Andrei se ocupă de cazurile complexe care implică coloana vertebrală și sistemul nervos. Este expertul clinicii în interpretarea imagisticii avansate.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Elena Dumitrescu',
    role: 'Medic veterinar',
    specialty: 'Medicină internă, cardiologie, oncologie',
    bio: 'Dr. Elena aduce empatie și profesionalism în fiecare consultație. Specializată în afecțiuni interne și cardiologie, ea se ocupă cu dedicare de pacienții cu boli cronice care necesită monitorizare atentă.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Mihai Radu',
    role: 'Medic veterinar',
    specialty: 'Dermatologie, oftalmologie',
    bio: 'Cu experiență în dermatologie și oftalmologie veterinară, Dr. Mihai rezolvă cu răbdare cazurile complicate de alergii, infecții cutanate și probleme oculare. Este cunoscut pentru abordarea sa meticuloasă.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop',
  },
  {
    name: 'Ana Petrescu',
    role: 'Tehnician veterinar senior',
    specialty: 'Asistență chirurgicală, îngrijire pacienți internați',
    bio: 'Ana este sufletul clinicii – mereu zâmbitoare și grijulie cu pacienții. Cu ani de experiență în asistență chirurgicală și îngrijirea pacienților internați, ea se asigură că fiecare animal se simte în siguranță.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop',
  },
];

export default function Echipa() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

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
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`card-team transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} la Vet Option Timișoara`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                      <p className="text-white/90 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1.5 bg-primary-light text-primary text-xs font-semibold rounded-full mb-4">
                      {member.specialty}
                    </div>
                    <p className="text-muted-foreground text-[15px] leading-relaxed">
                      {member.bio}
                    </p>
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
