import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-135.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-150.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-186.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-201.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-224.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-262.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-277.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-292.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-324.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-339.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-367.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-394.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-658.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-676.jpg',
  '/rosi-gallery/viber_image_2026-05-10_15-56-33-692.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-36-962.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-018.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-037.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-051.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-070.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-185.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-416.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-451.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-462.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-473.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-490.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-497.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-506.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-514.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-522.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-05-37-529.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-07-17-468.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-07-17-511.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-08-04-321.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-08-19-929.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-09-54-139.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-10-37-610.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-11-17-175.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-12-04-788.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-14-06-328.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-14-16-858.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-14-58-809.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-15-15-168.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-15-33-480.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-16-34-690.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-16-58-983.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-17-41-116.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-18-21-569.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-21-07-399.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-21-22-380.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-21-47-107.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-24-05-584.jpg',
  '/rosi-gallery/viber_image_2026-05-10_16-26-01-392.jpg',
];

const featureSpans = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
];

const gridPatterns = [
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[5/4]',
  'aspect-[3/4]',
];

const INITIAL_VISIBLE = 15;
const LOAD_STEP = 12;
const FEATURED_COUNT = 5;

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const sectionRef = useRef<HTMLDivElement>(null);

  const featuredImages = galleryImages.slice(0, FEATURED_COUNT);
  const visibleImages = galleryImages.slice(0, visibleCount);
  const gridImages = visibleImages.slice(FEATURED_COUNT);
  const hasMoreImages = visibleCount < galleryImages.length;

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((current) => (current === null ? current : (current + 1) % galleryImages.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((current) => (current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length));
    };

    if (lightboxIndex !== null) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const openLightbox = (imageSrc: string) => {
    const index = galleryImages.indexOf(imageSrc);
    if (index >= 0) setLightboxIndex(index);
  };

  const showPrevious = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setLightboxIndex((current) => (current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length));
  };

  const showNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setLightboxIndex((current) => (current === null ? current : (current + 1) % galleryImages.length));
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-32 bg-[#f8f5f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-14 md:mb-16">
          <p className="reveal section-label mb-4">Нашата работа</p>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-6">
            Галерия
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-[#6b6b6b] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Реални снимки от нашата работа.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 border border-[#e8ddd0] text-[#8a7765] font-sans text-[11px] tracking-[0.18em] uppercase">
              {galleryImages.length}+ снимки
            </span>
            <span className="px-4 py-2 border border-[#e8ddd0] text-[#8a7765] font-sans text-[11px] tracking-[0.18em] uppercase">
              Реално портфолио
            </span>
          </div>
        </div>

        <div className="reveal reveal-delay-2 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[170px] md:auto-rows-[220px]">
          {featuredImages.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`${featureSpans[index] ?? 'md:col-span-1 md:row-span-1'} relative overflow-hidden text-left group`}
              onClick={() => openLightbox(src)}
            >
              <img
                src={src}
                alt={`Дизайн на маникюр ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="inline-flex items-center gap-2 text-white/90">
                  <ZoomIn size={16} />
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase">Отвори</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="reveal reveal-delay-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {gridImages.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`${gridPatterns[index % gridPatterns.length]} relative overflow-hidden text-left group bg-[#efe7de]`}
              onClick={() => openLightbox(src)}
            >
              <img
                src={src}
                alt={`Маникюр дизайн ${index + FEATURED_COUNT + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#1a1a1a] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                <ZoomIn size={16} />
              </div>
            </button>
          ))}
        </div>

        <div className="reveal text-center mt-10 md:mt-12">
          {hasMoreImages ? (
            <button
              type="button"
              onClick={() => setVisibleCount((current) => Math.min(current + LOAD_STEP, galleryImages.length))}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#c9a96e] hover:text-white"
            >
              Покажи още
              <span className="text-xs opacity-75">({galleryImages.length - visibleCount})</span>
            </button>
          ) : (
            <div className="space-y-5">
              <p className="font-sans text-sm text-[#7a6d60]">
                Разгледахте всички снимки от галерията.
              </p>
              <a
                href="https://www.instagram.com/rnd_nailsalon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#c9a96e] hover:text-white"
              >
                Instagram ✨
              </a>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            onClick={() => setLightboxIndex(null)}
            aria-label="Затвори"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            onClick={showPrevious}
            aria-label="Предишна снимка"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="max-w-6xl w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex]}
              alt={`Маникюр снимка ${lightboxIndex + 1}`}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            <div className="flex items-center justify-between w-full max-w-3xl text-white/75 font-sans text-xs sm:text-sm tracking-[0.18em] uppercase">
              <span>Снимка {lightboxIndex + 1} / {galleryImages.length}</span>
              <span>RosiNails Gallery</span>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            onClick={showNext}
            aria-label="Следваща снимка"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
