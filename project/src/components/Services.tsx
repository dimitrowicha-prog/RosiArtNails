import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

// ─── data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'manicure',
    label: '01',
    title: 'Маникюр',
    accent: '#e8a0b0',
    bg: '#fff5f7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C9 3 7 6 7 9.5C7 13 9 17 12 18.5C15 17 17 13 17 9.5C17 6 15 3 12 3Z" stroke="#e8a0b0" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        <path d="M9.5 8Q12 5.5 14.5 8Q15 10.5 12 13Q9 10.5 9.5 8Z" fill="#e8a0b0" opacity="0.45"/>
        <line x1="12" y1="18.5" x2="12" y2="21" stroke="#e8a0b0" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    services: [
      { name: 'Гел лак + укрепване на нокътна плочка', price: '25€', duration: '1ч 30м' },
      { name: 'Сваляне на гел лак', price: '10€', duration: '30м' },
      { name: 'Класически маникюр', price: '15€', duration: '1ч' },
      { name: 'Мъжки маникюр', price: '15€', duration: '1ч' },
      { name: 'Поставяне на гел върху естествен нокът', price: '30€', duration: '1ч 30м' },
    ],
  },
  {
    id: 'nails',
    label: '02',
    title: 'Оформяне на нокти',
    accent: '#c9a96e',
    bg: '#fdf8f0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 22L8 14Q8 7 12 5Q16 7 16 14L16 22" stroke="#c9a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 22L16 22" stroke="#c9a96e" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10.5 13Q12 10.5 13.5 13" stroke="#c9a96e" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="4" r="1.5" stroke="#c9a96e" strokeWidth="1" fill="none"/>
      </svg>
    ),
    services: [
      { name: 'Изграждане с гел', price: '45€', duration: '2ч' },
      { name: 'Изграждане с полигел', price: '45€', duration: '2ч' },
      { name: 'Поддръжка на гел', price: '25€', duration: '2ч' },
      { name: 'Поддръжка на полигел', price: '25€', duration: '2ч' },
      { name: 'Сваляне на гел', price: '15€', duration: '1ч' },
      { name: 'Декорация на нокът', price: '1.50€', duration: '5м' },
      { name: 'Поправяне на счупен нокът', price: '5€', duration: '15м' },
      { name: 'Твърд гел – изграждане', price: '45€', duration: '2ч 30м' },
      { name: 'Твърд гел – допълване', price: '25€', duration: '2ч' },
      { name: 'Твърд гел – сваляне на нокти', price: '15€', duration: '1ч' },
      { name: 'Отстраняване на нокти – полигел', price: '15€', duration: '1ч' },
      { name: 'Отстраняване на изградени нокти на ръце', price: '30€', duration: '1ч 30м' },
      { name: 'Изграждане на нокти – промяна на форма', price: '45€', duration: '2ч' },
    ],
  },
  {
    id: 'pedicure-women',
    label: '03',
    title: 'Дамски педикюр',
    accent: '#d4a0c0',
    bg: '#fdf5fb',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="17" rx="6" ry="4" stroke="#d4a0c0" strokeWidth="1.2" fill="none"/>
        <path d="M8 17Q8 11 12 9Q16 11 16 17" stroke="#d4a0c0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M10 14Q12 12 14 14" stroke="#d4a0c0" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    services: [
      { name: 'Комбиниран педикюр', price: '30€', duration: '1ч' },
      { name: 'Мокър педикюр с гел лак', price: '30€', duration: '1ч' },
      { name: 'Сух педикюр с гел лак', price: '30€', duration: '1ч' },
      { name: 'Комбиниран педикюр с гел лак', price: '35€', duration: '1ч' },
      { name: 'Класически педикюр', price: '25€', duration: '1ч' },
    ],
  },
  {
    id: 'pedicure-men',
    label: '04',
    title: 'Мъжки педикюр',
    accent: '#8fb0c8',
    bg: '#f5f9fc',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="10" width="12" height="10" rx="2" stroke="#8fb0c8" strokeWidth="1.2" fill="none"/>
        <path d="M9 10V8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8V10" stroke="#8fb0c8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="12" y1="14" x2="12" y2="17" stroke="#8fb0c8" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    services: [
      { name: 'Сух мъжки педикюр', price: '30€', duration: '1ч' },
      { name: 'Мокър мъжки педикюр', price: '30€', duration: '1ч' },
    ],
  },
  {
    id: 'consultation',
    label: '05',
    title: 'Консултация',
    accent: '#a8c5a0',
    bg: '#f5fbf5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="#a8c5a0" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        <path d="M8 9H16M8 13H13" stroke="#a8c5a0" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    services: [
      { name: 'Консултация', price: '5€', duration: '10м' },
    ],
  },
  {
    id: 'deco',
    label: '06',
    title: 'Френски маникюр / Декорации',
    accent: '#e8a0b0',
    bg: '#fff5f7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="2" stroke="#e8a0b0" strokeWidth="1" fill="none"/>
        <circle cx="15" cy="7" r="1.5" stroke="#e8a0b0" strokeWidth="1" fill="none"/>
        <circle cx="18" cy="13" r="1.5" stroke="#e8a0b0" strokeWidth="1" fill="none"/>
        <circle cx="13" cy="16" r="1.2" fill="#e8a0b0" opacity="0.4"/>
        <path d="M6 19Q11 14 16 17Q18 18 19 17" stroke="#e8a0b0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    services: [
      { name: 'Френски маникюр', price: '5€', duration: '10м' },
      { name: 'Френски педикюр', price: '5€', duration: '10м' },
      { name: 'Омбре маникюр', price: '5€', duration: '10м' },
      { name: 'Омбре педикюр', price: '5€', duration: '10м' },
      { name: 'Baby Boomer маникюр', price: '5€', duration: '20м' },
      { name: 'Декорация на нокът с камъчета', price: '2.50€', duration: '10м' },
      { name: 'Декорация на нокът с фолио', price: '1€', duration: '5м' },
      { name: 'Декорация на нокът', price: '2.50€', duration: '10м' },
      { name: 'Декориране на ноктите с полираща пудра', price: '1.50€', duration: '10м' },
      { name: 'Семпла декорация на ноктите', price: '2.50€', duration: '10м' },
      { name: 'Сложна декорация за нокти', price: '5€', duration: '10-30м' },
      { name: 'Декориране на ноктите с блестящи частици', price: '1.50€', duration: '10м' },
      { name: 'Пръстен от гел', price: '30€', duration: '12ч' },
    ],
  },
  {
    id: 'courses',
    label: '07',
    title: 'Курсове',
    accent: '#c9a96e',
    bg: '#fdf8f0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke="#c9a96e" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        <path d="M2 8V16" stroke="#c9a96e" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 10.5V16C7 16 9 18 12 18C15 18 17 16 17 16V10.5" stroke="#c9a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="2" cy="17" r="1" fill="#c9a96e"/>
      </svg>
    ),
    services: [
      { name: 'Надграждащо обучение – изчистване на грешки', price: '310€', duration: '12ч' },
      { name: 'Курс по маникюр', price: '920€', duration: '12ч' },
      { name: 'Курс по педикюр', price: '310€', duration: '12ч' },
    ],
  },
];

// ─── AccordionPanel ───────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  title: string;
  accent: string;
  bg: string;
  icon: React.ReactNode;
  services: { name: string; price: string; duration: string }[];
}

function AccordionPanel({ cat, defaultOpen }: { cat: Category; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);

  // Measure and animate height
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (isOpen) {
      // Measure scrollHeight, then let it settle to 'auto'
      const scrollH = el.scrollHeight;
      setHeight(scrollH);
      const tid = setTimeout(() => setHeight('auto'), 350);
      return () => clearTimeout(tid);
    } else {
      // Snapshot current rendered height first so the transition has a start value
      const scrollH = el.scrollHeight;
      setHeight(scrollH);
      // Next frame: animate to 0
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isOpen]);

  const priceColor = cat.accent === '#c9a96e' ? '#b8933e' : cat.accent;

  return (
    <div
      className="border bg-white"
      style={{
        borderColor: isOpen ? `${cat.accent}40` : '#f0ebe4',
        boxShadow: isOpen ? `0 2px 16px 0 ${cat.accent}12` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* ── Header button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 sm:py-5 text-left select-none"
        style={{ background: 'transparent' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fdfaf8'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        {/* Icon box */}
        <div
          className="w-11 h-11 flex-shrink-0 flex items-center justify-center border"
          style={{
            borderColor: isOpen ? `${cat.accent}50` : '#f0ebe4',
            backgroundColor: isOpen ? cat.bg : 'transparent',
            transition: 'border-color 0.3s, background-color 0.3s',
          }}
        >
          {cat.icon}
        </div>

        {/* Label + title + count */}
        <div className="flex-1 flex items-center gap-3 min-w-0 overflow-hidden">
          <span
            className="font-sans text-[10px] tracking-[0.3em] uppercase font-medium flex-shrink-0"
            style={{ color: cat.accent }}
          >
            {cat.label}
          </span>
          <h3 className="font-display text-lg sm:text-xl md:text-2xl text-[#1a1a1a] truncate">
            {cat.title}
          </h3>
          <span className="hidden sm:inline font-sans text-xs text-[#b8b0aa] flex-shrink-0">
            {cat.services.length} {cat.services.length === 1 ? 'услуга' : 'услуги'}
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={18}
          className="flex-shrink-0"
          style={{
            color: '#b8b0aa',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </button>

      {/* ── Animated body ── */}
      <div
        style={{
          height: height === 'auto' ? 'auto' : `${height}px`,
          overflow: 'hidden',
          transition: height === 'auto' ? 'none' : 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={bodyRef}>
          <div className="px-4 pb-5">
            {/* Column headers – desktop */}
            <div className="hidden md:grid grid-cols-[1fr_80px_90px_140px] gap-4 px-4 pb-2 mb-1 border-b border-[#f8f3ee]">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c0b8b0]">Услуга</span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c0b8b0] text-right">Цена</span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c0b8b0] text-center">Времe</span>
              <span />
            </div>

            <div className="divide-y divide-[#f8f3ee]">
              {cat.services.map((service) => (
                <ServiceRow
                  key={service.name}
                  service={service}
                  accent={cat.accent}
                  priceColor={priceColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ServiceRow ───────────────────────────────────────────────────────────────

function ServiceRow({
  service,
  accent,
  priceColor,
}: {
  service: { name: string; price: string; duration: string };
  accent: string;
  priceColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col md:grid md:grid-cols-[1fr_80px_90px_140px] md:items-center gap-3 md:gap-4 px-3 sm:px-4 py-4 rounded-sm"
      style={{ backgroundColor: hovered ? '#fdfaf8' : 'transparent', transition: 'background-color 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name */}
      <div className="flex items-start gap-2.5">
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: accent, opacity: hovered ? 1 : 0.5, transition: 'opacity 0.2s' }}
        />
        <span className="font-sans text-sm text-[#2c2c2c] leading-snug break-words">{service.name}</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pl-4 md:contents">
        <div className="flex items-center md:justify-end md:pl-0">
          <span className="font-display text-lg font-semibold leading-none" style={{ color: priceColor }}>
            {service.price}
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:justify-center md:pl-0">
          <Clock size={12} className="text-[#c0b8b0] flex-shrink-0" />
          <span className="font-sans text-xs text-[#9a9a9a] whitespace-nowrap">{service.duration}</span>
        </div>
      </div>

      {/* Book CTA */}
      <div className="pl-4 md:pl-0 md:flex md:justify-end">
        <BookButton accent={accent} service={service} />
      </div>
    </div>
  );
}

// ─── BookButton ───────────────────────────────────────────────────────────────

function BookButton({
  accent,
  service,
}: {
  accent: string;
  service: { name: string; price: string; duration: string };
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent('booking:selected', {
        detail: {
          service: service.name,
          price: service.price,
          duration: service.duration,
        },
      })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <a
      href="#contact"
      className="inline-flex min-h-10 items-center gap-2 px-4 py-2 text-[10px] font-sans font-medium tracking-[0.16em] sm:tracking-[0.2em] uppercase border whitespace-nowrap"
      style={{
        borderColor: hovered ? accent : `${accent}55`,
        backgroundColor: hovered ? accent : 'transparent',
        color: hovered ? '#fff' : accent === '#c9a96e' ? '#b8933e' : accent,
        transition: 'background-color 0.22s, border-color 0.22s, color 0.22s',
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="1.5" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1"/>
        <path d="M3.5 1V2.5M8.5 1V2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M1 4.5H11" stroke="currentColor" strokeWidth="1"/>
        <circle cx="4" cy="7" r="0.7" fill="currentColor"/>
        <circle cx="6" cy="7" r="0.7" fill="currentColor"/>
        <circle cx="8" cy="7" r="0.7" fill="currentColor"/>
      </svg>
      Запази час
    </a>
  );
}

// ─── Services (main export) ───────────────────────────────────────────────────

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32 bg-[#fdfaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="reveal section-label mb-4">Нашите услуги</p>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-5">
            Услуги и цени
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-[#7a7a7a] text-base max-w-md mx-auto leading-relaxed">
            Всяка услуга е изпълнена с прецизност, внимание към детайла и любов към красотата.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-[#e8ddd0]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
            <div className="w-10 h-px bg-[#e8ddd0]" />
          </div>
        </div>

        {/* Accordion panels */}
        <div className="reveal reveal-delay-2 space-y-3">
          {categories.map((cat, i) => (
            <AccordionPanel
              key={cat.id}
              cat={cat}
              defaultOpen={i < 2}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-14 pt-10 border-t border-[#f0ebe4]">
          <p className="font-sans text-sm text-[#9a9a9a] mb-6">
            Не намирате търсената услуга? Свържете се с нас за индивидуална оферта.
          </p>
          <a
            href="#contact"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 sm:px-10 py-4 bg-[#c9a96e] text-white font-sans text-sm font-medium tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#b8933e] hover:shadow-lg hover:shadow-[#c9a96e]/25 hover:-translate-y-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="white" strokeWidth="1"/>
              <path d="M4 1.5V3M10 1.5V3" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              <path d="M1 5H13" stroke="white" strokeWidth="1"/>
              <circle cx="4.5" cy="8" r="0.8" fill="white"/>
              <circle cx="7" cy="8" r="0.8" fill="white"/>
              <circle cx="9.5" cy="8" r="0.8" fill="white"/>
            </svg>
            Запази час онлайн
          </a>
        </div>

      </div>
    </section>
  );
}


export default Services
