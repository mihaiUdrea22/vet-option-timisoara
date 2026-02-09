import Layout from '@/components/layout/Layout';
import PageSEO from '@/components/PageSEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon – Urgențe ON CALL 24/7',
    value: '+40 723 143 405',
    href: 'tel:+40723143405',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: MapPin,
    title: 'Adresă',
    value: 'Str. Ion Roată 48, Timișoara, România',
    href: 'https://maps.google.com/?q=Str.+Ion+Roata+48+Timisoara',
    color: 'bg-primary-light text-primary',
  },
  {
    icon: Clock,
    title: 'Program',
    value: 'Luni–Vineri: 10:00 – 20:00\nUrgențe: ON CALL 24/7',
    color: 'bg-amber-50 text-amber-600',
  },
];

const requestTypes = [
  'Consultație',
  'Control post-operator',
  'Programare vaccinare',
  'Întrebare generală',
  'Altele',
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requestType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // honeypot (nu afișăm input în UI)
          company: '',
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || 'Nu am putut trimite mesajul.');
      }

      setIsSubmitted(true);
      toast({
        title: 'Mesaj trimis cu succes!',
        description: 'Te vom contacta în cel mai scurt timp.',
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        requestType: '',
        message: '',
      });
    } catch (err: any) {
      toast({
        title: 'Eroare la trimitere',
        description: err?.message || 'Încearcă din nou mai târziu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageSEO
        title="Contact și Programări"
        description="Contactează Vet Option Timișoara pentru programări și consultații. Adresă: Str. Ion Roată 48. Telefon urgențe ON CALL 24/7: +40 723 143 405"
        path="/contact"
        keywords="contact Vet Option Timișoara, programări veterinar, adresă clinică veterinară, telefon urgențe veterinare"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-36 pb-16 md:pb-20 bg-gradient-to-b from-teal-50/50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Contact</span>
              <h1 className="section-title mt-4">Contactează-ne</h1>
              <p className="section-subtitle mx-auto mt-6">
                Suntem aici pentru tine și pentru companionul tău. Programează o consultație 
                sau contactează-ne pentru orice întrebare.
              </p>
            </div>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="card-feature">
                  <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mb-5`}>
                    <info.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-primary hover:underline whitespace-pre-line text-[15px]"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line text-[15px]">{info.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form and Map */}
        <section className="section-padding bg-gray-50/70" ref={ref}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Form */}
              <div 
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
                  Trimite-ne un mesaj
                </h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Mesaj trimis cu succes!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Te vom contacta în cel mai scurt timp posibil.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="btn-primary">
                      Trimite alt mesaj
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nume complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-[15px]"
                        placeholder="ex: Maria Popescu"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-[15px]"
                          placeholder="ex: 0723 143 405"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-[15px]"
                          placeholder="ex: maria@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="requestType" className="block text-sm font-medium text-foreground mb-2">
                        Tip solicitare *
                      </label>
                      <select
                        id="requestType"
                        name="requestType"
                        required
                        value={formData.requestType}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-[15px]"
                      >
                        <option value="">Selectează tipul solicitării...</option>
                        {requestTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Mesaj *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none text-[15px]"
                        placeholder="Descrie pe scurt motivul contactării..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-accent w-full py-4 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Trimite solicitarea
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {/* WhatsApp */}
                <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">Scrie-ne pe WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Răspundem rapid la mesaje</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/40723143405"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full mt-4 bg-green-500 hover:bg-green-600 border-0"
                  >
                    Deschide WhatsApp
                  </a>
                </div>
              </div>

              {/* Map */}
              <div 
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
                  Unde ne găsești
                </h2>
                <div className="bg-white rounded-3xl overflow-hidden shadow-card h-[400px] lg:h-[480px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503.424964381465!2d21.24088720367549!3d45.77380847221686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474567a06b9e27cf%3A0xcc13f0f6c1bcfd5f!2sStrada%20Ion%20Roat%C4%83%2048%2C%20Timi%C8%99oara%20300254!5e0!3m2!1sen!2sro!4v1766317104544!5m2!1sen!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locația Vet Option Timișoara"
                  />
                </div>
                <div className="mt-5 p-5 bg-white rounded-2xl border border-border/50">
                  <p className="text-muted-foreground text-[15px]">
                    <strong className="text-foreground">Adresă completă:</strong> Str. Ion Roată 48, Timișoara, România
                  </p>
                  <a
                    href="https://maps.google.com/?q=Str.+Ion+Roata+48+Timisoara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-2 inline-block font-medium"
                  >
                    Deschide în Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-14 bg-red-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-xl md:text-2xl font-heading font-bold mb-4">
              Urgență veterinară? Sună imediat!
            </h2>
            <a href="tel:+40723143405" className="btn-white px-8 py-4 text-base inline-flex">
              <Phone className="w-5 h-5" />
              +40 723 143 405 – ON CALL 24/7
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
}
