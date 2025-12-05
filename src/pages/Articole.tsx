import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

const categories = ['Toate', 'Urgențe', 'Prevenție', 'Chirurgie', 'Îngrijire'];

const articles = [
  {
    title: 'Cum recunoști semnele unei urgențe la câine',
    excerpt: 'Află care sunt simptomele ce necesită intervenție imediată și cum poți acționa rapid pentru a salva viața companionului tău.',
    category: 'Urgențe',
    readTime: '5 min',
    date: '15 Nov 2024',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    slug: 'semne-urgenta-caine',
  },
  {
    title: 'Vaccinările importante pentru pisica ta',
    excerpt: 'Ghid complet despre vaccinurile esențiale pentru pisici, când trebuie făcute și de ce sunt importante pentru sănătatea felinei.',
    category: 'Prevenție',
    readTime: '4 min',
    date: '10 Nov 2024',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
    slug: 'vaccinari-pisica',
  },
  {
    title: 'Cum îți pregătești animalul pentru o intervenție chirurgicală',
    excerpt: 'Pași simpli pe care îi poți urma acasă pentru a pregăti câinele sau pisica pentru o operație și a reduce stresul.',
    category: 'Chirurgie',
    readTime: '6 min',
    date: '5 Nov 2024',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
    slug: 'pregatire-interventie-chirurgicala',
  },
  {
    title: 'Semnele de urgență la pisici – când trebuie să suni imediat',
    excerpt: 'Pisicile ascund adesea durerea. Învață să recunoști semnele subtile care indică o urgență medicală.',
    category: 'Urgențe',
    readTime: '5 min',
    date: '28 Oct 2024',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop',
    slug: 'semne-urgenta-pisica',
  },
  {
    title: 'Deparazitarea – de ce este importantă tot anul',
    excerpt: 'Mulți proprietari cred că deparazitarea este necesară doar vara. Află de ce e important să protejezi animalul tot anul.',
    category: 'Prevenție',
    readTime: '4 min',
    date: '20 Oct 2024',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    slug: 'deparazitare-importanta',
  },
  {
    title: 'Îngrijirea câinelui după o operație',
    excerpt: 'Sfaturi practice pentru perioada de recuperare post-operatorie: ce să faci, ce să eviți și când să ne contactezi.',
    category: 'Îngrijire',
    readTime: '7 min',
    date: '15 Oct 2024',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
    slug: 'ingrijire-postoperatorie-caine',
  },
];

export default function Articole() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Articole și Sfaturi Veterinare | Vet Option Timișoara</title>
        <meta 
          name="description" 
          content="Articole și sfaturi utile pentru sănătatea câinilor și pisicilor. Informații despre urgențe, prevenție, chirurgie și îngrijirea animalelor de companie." 
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
              <h1 className="section-title mt-4">Articole & Sfaturi</h1>
              <p className="section-subtitle mx-auto mt-6">
                Informații utile pentru sănătatea și bunăstarea animalului tău de companie, 
                scrise de echipa noastră de medici veterinari.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'Toate'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="section-padding bg-gray-50" ref={ref}>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article
                  key={article.slug}
                  className={`bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
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
          </div>
        </section>
      </Layout>
    </>
  );
}
