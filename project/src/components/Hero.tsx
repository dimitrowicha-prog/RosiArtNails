import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add('loaded'), 100);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden px-0 pt-24 pb-20 md:flex md:items-center md:justify-center md:pt-0 md:pb-0"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Premium nail salon"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
        <div
          className="hero-item translate-y-6 opacity-0 transition-all duration-700 ease-out"
          style={{ transitionDelay: '0.2s' }}
        >
          <span className="mb-6 inline-flex items-center justify-center gap-2 px-2 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#e8cc88] sm:gap-3 sm:text-xs sm:tracking-[0.4em]">
            <span className="hidden h-px w-8 bg-[#e8cc88]/60 sm:block" />
            Луксозен маникюр студио
            <span className="hidden h-px w-8 bg-[#e8cc88]/60 sm:block" />
          </span>
        </div>

        <h1
          className="hero-item mb-6 translate-y-6 font-display text-4xl leading-[1.05] text-white opacity-0 transition-all duration-700 ease-out sm:text-5xl md:text-7xl lg:text-8xl"
          style={{ transitionDelay: '0.4s' }}
        >
          Перфектният
          <br />
          <em
            className="not-italic"
            style={{
              background: 'linear-gradient(135deg, #e8cc88 0%, #f4dfa0 50%, #c9a96e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            маникюр
          </em>
          <br />
          започва тук
        </h1>

        <p
          className="hero-item mx-auto mb-8 max-w-xl translate-y-6 font-sans text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-700 ease-out sm:mb-10 sm:text-base md:text-lg"
          style={{ transitionDelay: '0.6s' }}
        >
          Професионален маникюр, гел лак и ноктопластика
          <br className="hidden sm:block" />
          в модерна и уютна атмосфера.
        </p>

        <div
          className="hero-item flex translate-y-6 flex-col items-stretch justify-center gap-3 opacity-0 transition-all duration-700 ease-out sm:flex-row sm:items-center sm:gap-4"
          style={{ transitionDelay: '0.8s' }}
        >
          <a
            href="#contact"
            className="w-full rounded-none bg-[#c9a96e] px-8 py-4 text-center font-sans text-sm font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8933e] hover:shadow-lg hover:shadow-[#c9a96e]/30 sm:w-auto sm:px-10 sm:tracking-[0.2em]"
          >
            Запази час
          </a>
          <a
            href="#services"
            className="w-full rounded-none border border-white/50 bg-transparent px-8 py-4 text-center font-sans text-sm font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white/10 hover:border-white/80 sm:w-auto sm:px-10 sm:tracking-[0.2em]"
          >
            Разгледай услугите
          </a>
        </div>

        <div
          className="hero-item mt-12 flex translate-y-6 flex-wrap items-center justify-center gap-x-8 gap-y-5 opacity-0 transition-all duration-700 ease-out sm:mt-16 md:gap-16"
          style={{ transitionDelay: '1.0s' }}
        >
          {[
            { value: '500+', label: 'Доволни клиенти' },
            { value: '5★', label: 'Средна оценка' },
            { value: '6+', label: 'Години опит' },
          ].map((stat) => (
            <div key={stat.label} className="min-w-[92px] text-center">
              <div className="font-display text-2xl font-semibold text-[#e8cc88] md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 font-sans text-xs uppercase tracking-widest text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#services"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors duration-300 hover:text-[#e8cc88] sm:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>

      <style>{`
        .loaded .hero-item {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
