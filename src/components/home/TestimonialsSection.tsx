import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria & Max',
    pet: 'Câine Golden Retriever',
    text: 'Max a avut o dilatație gastrică și a fost operat de urgență în toiul nopții. Echipa Vet Option a fost incredibilă – calm, profesionalism și empatie. Acum Max este sănătos și plin de viață!',
    rating: 5,
  },
  {
    name: 'Andrei & Luna',
    pet: 'Pisică Persană',
    text: 'Luna a fost salvată după o intervenție chirurgicală complexă. Am simțit că medicii chiar îi pasă de ea. Comunicarea a fost excelentă pe tot parcursul tratamentului.',
    rating: 5,
  },
  {
    name: 'Elena & Rocky',
    pet: 'Câine Labrador',
    text: 'Urgență în weekend, fractura la picior. Am ajuns la Vet Option și în câteva ore Rocky era deja operat. Profesioniști adevărați, vă recomand cu încredere!',
    rating: 5,
  },
  {
    name: 'Cosmin & Bella',
    pet: 'Pisică Britanică',
    text: 'Bella a avut probleme cardiace și echipa de ATI a fost alături de ea zi și noapte. Vă mulțumim pentru tot ce ați făcut!',
    rating: 5,
  },
  {
    name: 'Diana & Thor',
    pet: 'Câine Husky',
    text: 'Am venit pentru un control de rutină și am descoperit o problemă pe care o puteam trata la timp. Mulțumesc pentru profesionalismul și grija arătată!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const visibleTestimonials = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`section-header transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="section-label">Testimoniale</span>
          <h2 className="section-title">Povești reale ale pacienților</h2>
          <p className="section-subtitle mx-auto mt-5">
            Descoperă experiențele proprietarilor care ne-au încredințat animalele de companie.
          </p>
        </div>

        {/* Testimonials slider */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="hidden md:flex justify-between absolute -left-5 -right-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto transition-all border border-border/50 ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto transition-all border border-border/50 ${
                currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 lg:gap-8 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleTestimonials + 2)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full md:w-[calc(33.333%-1.33rem)] transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="card-testimonial h-full flex flex-col">
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
                </div>
              ))}
            </div>
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/recenzii" className="btn-outline">
            Vezi mai multe recenzii
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
