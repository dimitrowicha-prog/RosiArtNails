import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Instagram, Facebook, Send, CheckCircle, Music2 } from 'lucide-react';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/rosileksi@gmail.com';

const hours = [
  { day: 'Понеделник - Събота', time: '10:00 - 19:00' },
  { day: 'Неделя', time: 'Почивен ден' },
];

const serviceOptions = [
  'Маникюр',
  'Гел лак',
  'Ноктопластика',
  'Дизайни и декорации',
  'Поддръжка',
  'Педикюр',
];

const timeOptions = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

const bookingMessagePrefix = 'Желая да запазя час за: ';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    const handleBookingSelected = (event: Event) => {
      const selectedService = (event as CustomEvent<{ service?: string }>).detail?.service?.trim();
      if (!selectedService) return;

      setSent(false);
      setSubmitError('');
      setForm((current) => ({
        ...current,
        service: selectedService,
        message: `${bookingMessagePrefix}${selectedService}`,
      }));
    };

    window.addEventListener('booking:selected', handleBookingSelected);
    return () => window.removeEventListener('booking:selected', handleBookingSelected);
  }, []);

  const selectOptions = form.service && !serviceOptions.includes(form.service)
    ? [form.service, ...serviceOptions]
    : serviceOptions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('service', form.service || 'Не е избрана');
    formData.append('preferred_date', form.date || 'Не е избрана');
    formData.append('preferred_time', form.time || 'Не е избран');
    formData.append('message', form.message || 'Няма допълнително съобщение');
    formData.append('_subject', `Нова заявка от ${form.name}`);
    formData.append('_template', 'table');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSent(true);
      setForm({ name: '', phone: '', service: '', date: '', time: '', message: '' });
    } catch {
      setSubmitError('Заявката не беше изпратена. Опитайте отново или се обадете на телефона.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="reveal section-label mb-4">Свържете се с нас</p>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-6">
            Запазете своя час
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-[#6b6b6b] text-base max-w-md mx-auto leading-relaxed">
            Свържете се с нас за запазване на час или задайте въпросите си.
          </p>
          <div className="reveal reveal-delay-3 mt-8 w-16 h-px bg-[#c9a96e] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          <div className="reveal reveal-delay-1">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 flex-shrink-0 border border-[#f0ebe4] flex items-center justify-center">
                <Phone size={18} className="text-[#c9a96e]" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#999] mb-1">Телефон</p>
                <a href="tel:+359885443055" className="font-display text-xl text-[#1a1a1a] hover:text-[#c9a96e] transition-colors">
                  +359 885 443 055
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 flex-shrink-0 border border-[#f0ebe4] flex items-center justify-center">
                <MapPin size={18} className="text-[#c9a96e]" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#999] mb-1">Адрес</p>
                <p className="font-sans text-base text-[#1a1a1a]">бул. Александър Батенберг 95, Стара Загора</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 flex-shrink-0 border border-[#f0ebe4] flex items-center justify-center">
                <Clock size={18} className="text-[#c9a96e]" />
              </div>
              <div className="flex-1">
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#999] mb-3">Работно време</p>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between border-b border-[#f8f3ee] pb-2">
                      <span className="font-sans text-sm text-[#4a4a4a]">{h.day}</span>
                      <span className={`font-sans text-sm font-medium ${h.time === 'Почивен ден' ? 'text-[#b0b0b0]' : 'text-[#c9a96e]'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Социални мрежи</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/rnd_nailsalon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-[#f0ebe4] flex items-center justify-center text-[#6b6b6b] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/raivanovi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-[#f0ebe4] flex items-center justify-center text-[#6b6b6b] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@rnd_nailsalon?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 border border-[#f0ebe4] flex items-center justify-center text-[#6b6b6b] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
                >
                  <Music2 size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="bg-[#fdfaf8] border border-[#f0ebe4] p-8 md:p-10">
              <h3 className="font-display text-2xl text-[#1a1a1a] mb-2">Заявете час</h3>
              <p className="font-sans text-sm text-[#8a8a8a] mb-8">Ще се свържем с вас до 24 часа.</p>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle size={48} className="text-[#c9a96e]" />
                  <h4 className="font-display text-xl text-[#1a1a1a]">Благодарим ви!</h4>
                  <p className="font-sans text-sm text-[#6b6b6b]">Заявката беше изпратена на нашия email. Ще се свържем скоро.</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setSubmitError('');
                      setForm({ name: '', phone: '', service: '', date: '', time: '', message: '' });
                    }}
                    className="mt-4 text-xs font-sans tracking-widest uppercase text-[#c9a96e] hover:underline"
                  >
                    Нова заявка
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                        Вашето име
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                        placeholder="Мария Иванова"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                        placeholder="+359 885 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                      Услуга
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Изберете услуга</option>
                      {selectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                        Дата
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                        Час
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Изберете час</option>
                        {timeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-2">
                      Съобщение
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e8e0d8] bg-white font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200 resize-none"
                      placeholder="Допълнителни въпроси или предпочитания..."
                    />
                  </div>

                  {submitError ? (
                    <p className="font-sans text-sm text-[#b25b5b]">
                      {submitError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#c9a96e] text-white font-sans text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#b8933e] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Изпращане...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Изпратете заявка
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
