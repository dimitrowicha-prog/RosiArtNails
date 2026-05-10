import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Music2 } from 'lucide-react';

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерия', href: '#gallery' },
  { label: 'За нас', href: '#about' },
  { label: 'Отзиви', href: '#testimonials' },
  { label: 'Контакти', href: '#contact' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/rnd_nailsalon/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/raivanovi', label: 'Facebook', icon: Facebook },
  { href: 'https://www.tiktok.com/@rnd_nailsalon?lang=en', label: 'TikTok', icon: Music2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-nude-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-18 sm:h-20">
        <a href="#hero" className="flex items-center gap-2 sm:gap-3 group min-w-0" aria-label="RosiNails Design">
          <img
            src="/viber_image_2026-05-10_15-16-13-329.jpg"
            alt="Rosi Nails Design"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-400 flex-shrink-0"
            style={{
              filter: scrolled ? 'brightness(0.92) contrast(1.05)' : 'brightness(1.08) contrast(1)',
              mixBlendMode: scrolled ? 'multiply' : 'lighten',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = scrolled
                ? 'brightness(1) contrast(1.1) drop-shadow(0 0 8px rgba(201,169,110,0.4))'
                : 'brightness(1.15) drop-shadow(0 0 10px rgba(201,169,110,0.5))';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = scrolled
                ? 'brightness(0.92) contrast(1.05)'
                : 'brightness(1.08) contrast(1)';
            }}
          />

          <div className="flex min-w-0 flex-col leading-none">
            <span
              className="font-display text-base sm:text-lg md:text-xl tracking-[0.04em] sm:tracking-[0.06em] transition-colors duration-300 truncate"
              style={{
                background: 'linear-gradient(135deg, #b8933e 0%, #e8cc88 45%, #c9a96e 70%, #b8933e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RosiNails
            </span>
            <span
              className="font-sans text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.22em] sm:tracking-[0.35em] uppercase transition-colors duration-300 mt-0.5 truncate"
              style={{ color: scrolled ? '#c9a96e' : 'rgba(232,204,136,0.85)' }}
            >
              Design
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-[0.08em] transition-colors duration-300 ${
                scrolled ? 'text-[#3a3a3a] hover:text-[#c9a96e]' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center border transition-all duration-300 ${
                  scrolled
                    ? 'border-[#e8e0d8] text-[#6b6b6b] hover:text-[#c9a96e] hover:border-[#c9a96e]/40'
                    : 'border-white/20 text-white/80 hover:text-[#e8cc88] hover:border-white/50 hover:bg-white/10'
                }`}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className={`px-6 py-2.5 text-xs font-sans font-medium tracking-[0.15em] uppercase border transition-all duration-300 ${
              scrolled
                ? 'border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white'
                : 'border-white/60 text-white hover:bg-white/10'
            }`}
          >
            Запази час
          </a>
        </div>

        <button
          className={`md:hidden p-2 -mr-2 transition-colors ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-white border-t border-nude-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 sm:px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm tracking-wide text-[#3a3a3a] hover:text-[#c9a96e] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-6 py-3 text-center text-xs font-medium tracking-[0.15em] uppercase border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white transition-all duration-300"
          >
            Запази час
          </a>
          <div className="mt-2 flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-[#e8e0d8] text-[#6b6b6b] transition-all duration-300 hover:text-[#c9a96e] hover:border-[#c9a96e]/40"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
