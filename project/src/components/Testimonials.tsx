import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Мария К.',
    role: 'Редовен клиент',
    text: 'Роси е абсолютен перфекционист! Маникюрът ми винаги изглежда невероятно и издържа много по-дълго от другите места, където съм ходила.',
    image: '/rosi-gallery/viber_image_2026-05-10_16-05-37-451.jpg',
    rating: 5,
  },
  {
    name: 'Стефания В.',
    role: 'Клиент',
    text: 'Студиото е уютно и луксозно. Чувствам се специална при всяко посещение. Ноктопластиката е безупречна – вече две години само тук!',
    image: '/rosi-gallery/viber_image_2026-05-10_16-07-17-511.jpg',
    rating: 5,
  },
  {
    name: 'Елена Д.',
    role: 'Редовен клиент',
    text: 'Най-доброто място за маникюр в града! Дизайните са невероятни, а Роси е изключително внимателна и прецизна. Препоръчвам на всички!',
    image: '/rosi-gallery/viber_image_2026-05-10_16-14-58-809.jpg',
    rating: 5,
  },
  {
    name: 'Ивана П.',
    role: 'Нов клиент',
    text: 'Дойдох за пръв път и вече планирам следващото си посещение. Гел лакът е прекрасен, а отношението е топло и професионално едновременно.',
    image: '/rosi-gallery/viber_image_2026-05-10_16-21-22-380.jpg',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < rating ? '#c9a96e' : '#e8ddd0'}>
          <path d="M7 1L8.8 5.2H13.4L9.7 7.9L11 12.1L7 9.7L3 12.1L4.3 7.9L0.6 5.2H5.2Z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
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
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-32 bg-[#fdfaf8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#c9a96e]/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#f2ddd0]/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal section-label mb-4">Отзиви</p>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-6">
            Какво казват клиентите
          </h2>
          <div className="reveal reveal-delay-2 flex items-center justify-center gap-3 mb-2">
            <StarRating rating={5} />
            <span className="font-sans text-sm text-[#6b6b6b]">4.9 от 5 на базата на 120+ отзива</span>
          </div>
          <div className="reveal reveal-delay-3 mt-8 w-16 h-px bg-[#c9a96e] mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative bg-white border border-[#f0ebe4] p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a96e]/10 hover:-translate-y-0.5`}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-[#f0ebe4]">
                <Quote size={32} />
              </div>

              {/* Rating */}
              <StarRating rating={t.rating} />

              {/* Text */}
              <p className="font-sans text-[#4a4a4a] text-sm leading-[1.9] mt-4 mb-6 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#f8f3ee]">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#e8ddd0]"
                />
                <div>
                  <p className="font-sans text-sm font-medium text-[#1a1a1a]">{t.name}</p>
                  <p className="font-sans text-xs text-[#9a9a9a]">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#c9a96e" opacity="0.3">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
