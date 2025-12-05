import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
  {
    name: 'Mihai & Cleo',
    pet: 'Pisică Maine Coon',
    text: 'Cleo a fost internată 3 zile și am primit update-uri zilnice cu poze și informații. Am simțit că e pe mâini bune în fiecare moment.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const visibleTestimonials = 3;
  const maxIndex = testimonials.length - visibleTestimonials;

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimoniale</span>
          <h2 className="section-title mt-4">Povești reale ale pacienților</h2>
          <p className="section-subtitle mx-auto mt-4">
            Descoperă experiențele proprietarilor care ne-au încredințat animalele de companie.
          </p>
        </div>

        {/* Testimonials slider */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="hidden md:flex justify-between absolute -left-4 -right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full bg-card shadow-medium flex items-center justify-center pointer-events-auto transition-all ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 rounded-full bg-card shadow-medium flex items-center justify-center pointer-events-auto transition-all ${
                currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleTestimonials + 2)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="card-testimonial h-full flex flex-col">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-foreground mb-6 flex-grow leading-relaxed">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-amber-500">★</span>
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
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/recenzii" className="btn-outline">
            Vezi mai multe recenzii
          </Link>
        </div>
      </div>
    </section>
  );
}
