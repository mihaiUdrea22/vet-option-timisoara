import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronRight, Clock } from 'lucide-react';

const articles = [
  {
    title: 'Cum recunoști semnele unei urgențe la câine',
    excerpt: 'Află care sunt simptomele ce necesită intervenție imediată și cum poți acționa rapid pentru a salva viața companionului tău.',
    category: 'Urgențe',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    slug: 'semne-urgenta-caine',
  },
  {
    title: 'Vaccinările importante pentru pisica ta',
    excerpt: 'Ghid complet despre vaccinurile esențiale pentru pisici, când trebuie făcute și de ce sunt importante pentru sănătatea felinei.',
    category: 'Prevenție',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
    slug: 'vaccinari-pisica',
  },
  {
    title: 'Cum îți pregătești animalul pentru o intervenție chirurgicală',
    excerpt: 'Pași simpli pe care îi poți urma acasă pentru a pregăti câinele sau pisica pentru o operație și a reduce stresul.',
    category: 'Chirurgie',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
    slug: 'pregatire-interventie-chirurgicala',
  },
];

export default function BlogPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
          <h2 className="section-title mt-4">Articole & Sfaturi</h2>
          <p className="section-subtitle mx-auto mt-4">
            Informații utile pentru sănătatea și bunăstarea animalului tău de companie.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className={`bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link to={`/articole/${article.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} citire</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                    Citește articolul
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/articole" className="btn-outline">
            Vezi toate articolele
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
