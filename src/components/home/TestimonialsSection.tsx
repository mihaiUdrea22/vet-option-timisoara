import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    name: 'Ioana & Max',
    pet: 'Labrador',
    text: 'Max a ajuns la ei în urgență, cu probleme grave de respirație. Echipa a reacționat imediat, l-au stabilizat și acum este perfect sănătos. Le sunt recunoscătoare pentru calmul și profesionalismul lor.',
    rating: 5,
  },
  {
    name: 'Andrei & Luli',
    pet: 'Pisică europeană',
    text: 'Am ajuns pentru o intervenție chirurgicală dificilă. Mi-au explicat clar fiecare pas, m-au ținut la curent și au avut grijă de Luli ca de propriul lor animal. Rezultatul a fost peste așteptări.',
    rating: 5,
  },
  {
    name: 'Marius & Dexter',
    pet: 'Border Collie',
    text: 'Dexter a avut nevoie de investigații amănunțite și terapie intensivă. Am simțit mereu că este pe mâini bune, iar comunicarea cu medicii a fost exemplară.',
    rating: 5,
  },
  {
    name: 'Ana & Bruno',
    pet: 'Metis',
    text: 'Ne-am mutat recent în Timișoara și ne-am dorit un cabinet de încredere. Aici am găsit atât empatie, cât și aparatură modernă. Vin cu drag la controalele periodice.',
    rating: 5,
  },
  {
    name: 'Raluca & Mimi',
    pet: 'Bichon',
    text: 'Au reușit să o stabilizeze pe Mimi într-o situație critică. Mi-au explicat totul pe înțelesul meu și m-au susținut emoțional în momentele grele. Îi recomand din suflet.',
    rating: 5,
  },
  {
    name: 'Vlad & Nero',
    pet: 'Rottweiler',
    text: 'Au gestionat impecabil o problemă ortopedică serioasă. De la diagnostic, la operație și recuperare, totul a fost foarte bine organizat și transparent.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const totalSlides = testimonials.length;

  // autoplay
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 3200);
    return () => clearInterval(id);
  }, [api]);

  // track selected index for dots
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`section-header transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="section-label">Testimoniale</span>
          <h2 className="section-title">Ce spun proprietarii despre noi</h2>
          <p className="section-subtitle mx-auto mt-5">
            Recenzii reale de la proprietari care au ajuns la noi pentru urgențe, intervenții chirurgicale sau îngrijire de rutină.
          </p>
        </div>

        {/* Testimonials slider */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: 'start',
            }}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div
                    className={`card-testimonial h-full flex flex-col transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <Quote className="w-10 h-10 text-primary/15 mb-5" />
                    <p className="text-foreground mb-6 flex-grow leading-relaxed text-[15px]">
                      „{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-border/50">
                      <div>
                        <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}