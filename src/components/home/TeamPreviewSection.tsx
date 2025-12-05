import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Alexandru Popescu',
    role: 'Medic veterinar chirurg',
    specialty: 'Chirurgie generală, ortopedie',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Maria Ionescu',
    role: 'Medic veterinar ATI',
    specialty: 'Terapie intensivă, urgențe',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Andrei Munteanu',
    role: 'Medic veterinar',
    specialty: 'Neurochirurgie, imagistică',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop',
  },
  {
    name: 'Dr. Elena Dumitrescu',
    role: 'Medic veterinar',
    specialty: 'Medicină internă, cardiologie',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop',
  },
];

export default function TeamPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Echipa noastră</span>
          <h2 className="section-title mt-4">Medicii care au grijă de companionii tăi</h2>
          <p className="section-subtitle mx-auto mt-4">
            O echipă de profesioniști dedicați, pasionați de meseria lor și de bunăstarea animalelor.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`card-team transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} cabinet veterinar Timișoara`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/echipa" className="btn-primary">
            Cunoaște întreaga echipă
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
