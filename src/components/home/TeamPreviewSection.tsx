import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

const teamMembers = [
  {
    name: 'Andreea',
    role: 'Medic veterinar',
    specialty: 'Medicină internă • Ecografie abdominală',
    image: '/team/andreea.jpeg',
  },
  {
    name: 'Antonia',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie',
    image: '/team/antonia.jpeg',
  },
  {
    name: 'Carla',
    role: 'Studentă medicină veterinară',
    specialty: 'Prim ajutor • Suport comportamental',
    image: '/team/carla.png',
  },
  {
    name: 'Alexandra',
    role: 'Studentă medicină veterinară',
    specialty: 'Interes: chirurgie, perfecționare',
    image: '/team/carla.jpeg',
  },
  {
    name: 'Ioana',
    role: 'Studentă medicină veterinară',
    specialty: 'Medicină internă • Chirurgie animale de companie',
    image: '/team/ioana.png',
  },
  {
    name: 'Alexandra Andras',
    role: 'Medic veterinar',
    specialty: 'Urgență • Diagnostic imagistic • Medicină internă',
    image: '/team/alexandra-andras.png',
  },
  {
    name: 'Răzvan',
    role: 'Medic veterinar chirurg',
    specialty: 'Neurochirurgie • Ortopedie • Oncologică',
    image: '/team/razvan.jpeg',
  },
  {
    name: 'Daria',
    role: 'Studentă medicină veterinară',
    specialty: 'Îngrijire pacienți • Dezvoltare continuă',
    image: '/team/daria.png',
  },
];

export default function TeamPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null);

  // autoplay carousel
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3200);
    return () => clearInterval(interval);
  }, [api]);

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
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: 'start',
          }}
          className="relative"
        >
          <CarouselContent className="-ml-3">
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={member.name}
                className="pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div
                  className={`card-team h-full transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} clinică veterinară Timișoara`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="font-heading font-semibold text-foreground leading-tight">{member.name}</h3>
                    <p className="text-primary text-sm font-medium leading-tight">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.specialty}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
