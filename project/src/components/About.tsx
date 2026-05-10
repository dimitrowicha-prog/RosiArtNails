import { useEffect, useRef } from 'react';
import { Award, Heart, Sparkles } from 'lucide-react';

const values = [
  { icon: Award, title: 'Качество', text: 'Използваме само сертифицирани и висококачествени продукти.' },
  { icon: Heart, title: 'Грижа', text: 'Индивидуален подход и внимание към всеки клиент.' },
  { icon: Sparkles, title: 'Вдъхновение', text: 'Следваме последните тенденции в nail art индустрията.' },
];

export default function About() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal relative">
            <div className="relative">
              <img
                src="/RosiProfile.jpg"
                alt="RosiNails студио"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a96e]/30 pointer-events-none" />
            </div>

            <div className="absolute -bottom-8 -left-6 md:-left-10 glass-card p-5 shadow-xl max-w-[220px]">
              <img
                src="/rosi-gallery/viber_image_2026-05-10_16-15-33-480.jpg"
                alt="Роси – майстор маникюрист"
                className="w-16 h-16 object-cover rounded-full border-2 border-[#c9a96e]/40 mb-3"
              />
              <p className="font-display text-base text-[#1a1a1a]">Роси</p>
              <p className="font-sans text-xs text-[#6b6b6b] mt-0.5">Майстор маникюрист</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e">
                    <path d="M6 1L7.5 4.5H11L8.3 6.8L9.3 10.3L6 8.3L2.7 10.3L3.7 6.8L1 4.5H4.5Z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="absolute -top-5 -right-4 md:-right-8 w-24 h-24 bg-[#c9a96e] flex flex-col items-center justify-center">
              <span className="font-display text-2xl text-white font-semibold">6+</span>
              <span className="font-sans text-[9px] text-white/80 tracking-widest uppercase text-center leading-tight px-2">
                Години опит
              </span>
            </div>
          </div>

          <div>
            <p className="reveal section-label mb-4">За нас</p>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-8">
              Красотата е в <br />
              <em className="not-italic text-[#c9a96e]">детайлите</em>
            </h2>

            <p className="reveal reveal-delay-2 font-sans text-[#4a4a4a] text-base leading-[1.9] mb-6">
              В RosiNails вярваме, че красивият маникюр е част от самочувствието на всяка жена.
              Работим с внимание към детайла, висококачествени продукти и индивидуален подход
              към всеки клиент.
            </p>

            <p className="reveal reveal-delay-3 font-sans text-[#6b6b6b] text-sm leading-[1.9] mb-6">
              Нашето студио е създадено като пространство, където се чувствате специални и
              приети. От класически маникюр до сложни nail art дизайни – всяка визита е
              персонално изживяване, нагодено към вашите желания.
            </p>

            <p className="reveal reveal-delay-3 font-sans text-[#6b6b6b] text-sm leading-[1.9] mb-10">
              За да гарантираме безупречен резултат, работим единствено с премиум професионални
              продукти и материали от утвърдени марки в индустрията –
              <span className="text-[#c9a96e] font-medium"> Kinetics</span>,
              <span className="text-[#c9a96e] font-medium"> Dark</span>,
              <span className="text-[#c9a96e] font-medium"> Noriko</span> и
              <span className="text-[#c9a96e] font-medium"> Secretly</span>.
              Всеки продукт е внимателно подбран за дълготрайност, безопасност и изискан финален вид.
            </p>

            <div className="reveal reveal-delay-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {values.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 border border-[#f0ebe4] flex items-center justify-center">
                    <Icon size={18} className="text-[#c9a96e]" />
                  </div>
                  <h4 className="font-sans text-sm font-medium text-[#1a1a1a] tracking-wide">{title}</h4>
                  <p className="font-sans text-xs text-[#8a8a8a] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-5">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a96e] text-white font-sans text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#b8933e] hover:shadow-lg hover:shadow-[#c9a96e]/20"
              >
                Запази час
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
