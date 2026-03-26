import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { tariffItems } from '@/data/tarife';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Microscope,
  Phone,
  Scissors,
  Search,
  ShieldAlert,
  Stethoscope,
  Syringe,
} from 'lucide-react';

type CategoryKey =
  | 'all'
  | 'consultatii'
  | 'analize'
  | 'chirurgie'
  | 'tratament'
  | 'urgente'
  | 'diverse';

const categories: Array<{
  key: CategoryKey;
  label: string;
  description: string;
  icon: typeof Stethoscope;
}> = [
  {
    key: 'all',
    label: 'Toate tarifele',
    description: 'Vezi întreaga listă actuală.',
    icon: Search,
  },
  {
    key: 'consultatii',
    label: 'Consultații & investigații',
    description: 'Consultații, ecografii, vaccinări, manopere și proceduri uzuale.',
    icon: Stethoscope,
  },
  {
    key: 'analize',
    label: 'Analize & laborator',
    description: 'Biochimie, hematologie, citologie și alte investigații.',
    icon: Microscope,
  },
  {
    key: 'chirurgie',
    label: 'Chirurgie & anestezie',
    description: 'Intervenții, anestezie și proceduri operatorii.',
    icon: Scissors,
  },
  {
    key: 'tratament',
    label: 'Tratament & medicație',
    description: 'Tratamente, produse și terapii frecvent utilizate în clinică.',
    icon: Syringe,
  },
  {
    key: 'urgente',
    label: 'Urgențe & terapie',
    description: 'Internare, monitorizare, perfuzii și urgențe.',
    icon: ShieldAlert,
  },
  {
    key: 'diverse',
    label: 'Diverse',
    description: 'Alte poziții din lista actuală de tarife.',
    icon: ArrowRight,
  },
];

const matcherMap: Record<Exclude<CategoryKey, 'all'>, RegExp[]> = {
  consultatii: [
    /consult/i,
    /control\b/i,
    /ecograf/i,
    /radiograf/i,
    /vaccin/i,
    /deparazit/i,
    /microcip/i,
    /microchip/i,
    /pasaport/i,
    /acupunctur/i,
    /administrare/i,
    /manopera/i,
    /bandaj/i,
    /pansament/i,
    /curatare/i,
    /toalet/i,
    /carnet/i,
  ],
  analize: [
    /analiz/i,
    /hematolog/i,
    /biochim/i,
    /\bpcr\b/i,
    /\btest/i,
    /citolog/i,
    /histopat/i,
    /copro/i,
    /urin/i,
    /urolit/i,
    /profil/i,
    /antibiogram/i,
    /cultur/i,
    /\bgena\b/i,
  ],
  chirurgie: [
    /anestez/i,
    /sedar/i,
    /premedic/i,
    /chirurg/i,
    /castrar/i,
    /ovario/i,
    /cezarian/i,
    /detartraj/i,
    /extract/i,
    /sutur/i,
    /amput/i,
    /endoscop/i,
    /biops/i,
    /artroscop/i,
    /bronhoscop/i,
    /exciz/i,
    /plaga/i,
    /hernie/i,
    /fractur/i,
  ],
  tratament: [
    /tratament/i,
    /\binj\b/i,
    /inject/i,
    /\boral\b/i,
    /comprimate/i,
    /caps/i,
    /fiola/i,
    /unguent/i,
    /spray/i,
    /solutie/i,
    /picaturi/i,
    /sirop/i,
    /synevovet/i,
    /stronghold/i,
    /advocate/i,
    /simparica/i,
    /nexgard/i,
    /adren/i,
    /ampiplus/i,
    /folic/i,
    /alizin/i,
    /buprenorfina/i,
    /tramvetol/i,
    /surolan/i,
    /ypozane/i,
    /\bfl\b/i,
    /\bcp\b/i,
    /\bml\b/i,
  ],
  urgente: [
    /urgent/i,
    /on call/i,
    /\bati\b/i,
    /internar/i,
    /spital/i,
    /perfuz/i,
    /monitor/i,
    /oxigen/i,
    /cateter/i,
    /transfuz/i,
    /\bsonda\b/i,
  ],
  diverse: [],
};

function getCategory(name: string): Exclude<CategoryKey, 'all'> {
  const orderedCategories: Exclude<CategoryKey, 'all'>[] = [
    'urgente',
    'analize',
    'chirurgie',
    'consultatii',
    'tratament',
  ];

  for (const category of orderedCategories) {
    if (matcherMap[category].some((pattern) => pattern.test(name))) {
      return category;
    }
  }

  return 'diverse';
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function formatPrice(price: number) {
  const hasDecimals = !Number.isInteger(price);

  return `${new Intl.NumberFormat('ro-RO', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(price)} lei`;
}

export default function Tarife() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const normalizedSearch = normalizeText(search.trim());

  const visibleItems = tariffItems.filter((item) => {
    const category = getCategory(item.name);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesSearch =
      !normalizedSearch || normalizeText(item.name).includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const categoryCounts = categories.reduce<Record<CategoryKey, number>>(
    (acc, category) => {
      if (category.key === 'all') {
        acc[category.key] = !normalizedSearch
          ? tariffItems.length
          : tariffItems.filter((item) =>
              normalizeText(item.name).includes(normalizedSearch),
            ).length;
        return acc;
      }

      acc[category.key] = tariffItems.filter((item) => {
        const matchesCategory = getCategory(item.name) === category.key;
        const matchesSearch =
          !normalizedSearch || normalizeText(item.name).includes(normalizedSearch);

        return matchesCategory && matchesSearch;
      }).length;

      return acc;
    },
    {
      all: 0,
      consultatii: 0,
      analize: 0,
      chirurgie: 0,
      tratament: 0,
      urgente: 0,
      diverse: 0,
    },
  );

  const groups = categories
    .filter((category) => category.key !== 'all')
    .filter((category) => activeCategory === 'all' || category.key === activeCategory)
    .map((category) => ({
      ...category,
      items: visibleItems.filter((item) => getCategory(item.name) === category.key),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageSEO
        title="Tarife Veterinare"
        description="Consultă tarifele Vet Option Timișoara pentru consultații, analize, tratamente, chirurgie și servicii în regim de urgență."
        path="/tarife"
        keywords="tarife veterinar Timișoara, prețuri clinică veterinară, consultații veterinar, analize veterinare, tarife Vet Option"
      />
      <Layout>
        <section className="pt-36 pb-16 md:pb-20 bg-gradient-to-b from-emerald-50/70 via-white to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <span className="section-label">Tarife</span>
              <h1 className="section-title mt-4">Lista de tarife Vet Option</h1>
              <p className="section-subtitle mx-auto mt-6">
                Consultă lista actuală de tarife pentru principalele servicii medicale
                oferite în clinică, de la consultații și analize până la tratamente,
                intervenții și urgențe.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-12">
              <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.18em] text-emerald-700 font-semibold">
                  Servicii și produse
                </p>
                <p className="font-heading font-bold text-4xl text-foreground mt-3">
                  {tariffItems.length}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  de servicii, manopere și produse
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.18em] text-amber-700 font-semibold">
                  TVA inclus
                </p>
                <p className="font-heading font-bold text-4xl text-foreground mt-3">21%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  conform listei curente din clinică
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-red-100 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.18em] text-red-700 font-semibold">
                  Regim de urgență
                </p>
                <p className="font-heading font-bold text-2xl text-foreground mt-3">
                  tarifare separată
                </p>
                <Link
                  to="/urgente"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 mt-4 hover:text-red-800"
                >
                  Vezi detalii despre urgențe
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white border-y border-border/60">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Caută un tarif, o analiză, un tratament sau o procedură..."
                  className="w-full rounded-2xl border border-border bg-background pl-14 pr-5 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeCategory === category.key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category.label} ({categoryCounts[category.key]})
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50/60">
          <div className="container-custom">
            {groups.length === 0 ? (
              <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-border p-10 text-center shadow-card">
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  Nu am găsit rezultate pentru căutarea ta.
                </h2>
                <p className="text-muted-foreground mt-3">
                  Încearcă un termen mai scurt sau schimbă categoria selectată.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {groups.map((group) => (
                  <div
                    key={group.key}
                    className="bg-white rounded-[32px] border border-border/60 shadow-card overflow-hidden"
                  >
                    <div className="px-6 md:px-8 py-7 border-b border-border/60 bg-gradient-to-r from-white to-gray-50/80">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <group.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-2xl text-foreground">
                            {group.label}
                          </h2>
                          <p className="text-muted-foreground mt-2 max-w-2xl">
                            {group.description}
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-3">
                            {group.items.length} tarife afișate
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-x-8 px-6 md:px-8 py-2 md:py-3">
                      {group.items.map((item) => (
                        <div
                          key={`${group.key}-${item.code}`}
                          className="flex items-start justify-between gap-4 py-4 border-b border-border/50 last:border-b xl:last:border-b-0"
                        >
                          <p className="font-medium text-foreground leading-relaxed">
                            {item.name}
                          </p>
                          <span className="inline-flex whitespace-nowrap items-center rounded-full bg-emerald-50 text-emerald-700 px-3.5 py-2 text-sm font-semibold">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ai nevoie de o estimare pentru cazul companionului tău?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Pentru intervenții complexe sau urgențe, cel mai bine este să ne suni.
              Îți explicăm clar ce presupune cazul și ce costuri sunt posibile.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+40723143405" className="btn-accent px-8 py-4 text-base">
                <Phone className="w-5 h-5" />
                Sună acum: +40 723 143 405
              </a>
              <Link
                to="/contact"
                className="btn-white px-8 py-4 text-base inline-flex items-center justify-center gap-2"
              >
                Trimite un mesaj
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
