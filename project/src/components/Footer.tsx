import { Instagram, Facebook, Phone, MapPin, Music2 } from 'lucide-react';

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерия', href: '#gallery' },
  { label: 'За нас', href: '#about' },
  { label: 'Отзиви', href: '#testimonials' },
  { label: 'Контакти', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111010] text-white/70">
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />

      <div className="border-b border-white/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-10">
          <div>
            <h3 className="mb-2 font-display text-2xl text-white md:text-3xl">
              Готови за перфектния маникюр?
            </h3>
            <p className="font-sans text-sm text-white/50">
              Запазете своя час днес и се потопете в луксозното изживяване.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full flex-shrink-0 border border-[#c9a96e] px-8 py-4 text-center font-sans text-sm font-medium uppercase tracking-[0.16em] text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e] hover:text-white sm:w-auto sm:tracking-[0.2em]"
          >
            Запази час
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#hero" className="mb-5 inline-flex max-w-full group" aria-label="Rosi Nails Design">
              <img
                src="/viber_image_2026-05-10_15-16-13-329.jpg"
                alt="Rosi Nails Design"
                className="h-16 sm:h-20 w-auto max-w-full object-contain"
                style={{
                  mixBlendMode: 'lighten',
                  filter: 'brightness(1.05) contrast(1)',
                  transition: 'filter 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1.2) drop-shadow(0 0 12px rgba(201,169,110,0.5))';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1.05) contrast(1)';
                }}
              />
            </a>
            <p className="mb-6 max-w-xs font-sans text-sm leading-[1.9] text-white/45">
              Луксозен маникюр студио с индивидуален подход и внимание към детайла. Вашата красота е наша страст.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/rnd_nailsalon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.facebook.com/raivanovi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://www.tiktok.com/@rnd_nailsalon?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
              >
                <Music2 size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
              Навигация
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/45 transition-colors duration-200 hover:text-[#c9a96e]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
              Контакти
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                <a
                  href="tel:+359885443055"
                  className="break-words font-sans text-sm text-white/45 transition-colors hover:text-[#c9a96e]"
                >
                  +359 885 443 055
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#c9a96e]" />
                <span className="font-sans text-sm text-white/45">
                  бул. Александър Батенберг 95, Стара Загора
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="#c9a96e" strokeWidth="1" />
                  <path d="M8 4V8L10.5 10.5" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-sm text-white/45">
                  Понеделник - Събота: 10:00 - 19:00
                  <br />
                  Неделя: Почивен ден
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:px-6 sm:text-left lg:px-10 md:flex-row">
          <p className="font-sans text-xs text-white/25">
            © {new Date().getFullYear()} RosiNails. Всички права запазени.
          </p>
          <div className="flex items-center gap-1">
            <span className="font-sans text-xs text-white/25">Направено с</span>
            <span className="text-[#c9a96e]">♥</span>
            <span className="font-sans text-xs text-white/25">за красотата</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
