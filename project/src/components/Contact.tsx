import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Facebook, Instagram, MapPin, Music2, Phone, Send } from 'lucide-react';

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

type BookingSelection = {
  service: string;
  price?: string;
  duration?: string;
};

type BookingForm = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const emptyForm: BookingForm = {
  name: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  message: '',
};

function buildRequestMessage(form: BookingForm, selection: BookingSelection | null) {
  return [
    'Заявка за час',
    `Услуга: ${selection?.service || form.service || 'Не е избрана'}`,
    `Цена: ${selection?.price || 'Не е посочена'}`,
    `Продължителност: ${selection?.duration || 'Не е посочена'}`,
    `Предпочитана дата: ${form.date || 'Не е избрана'}`,
    `Предпочитан час: ${form.time || 'Не е избран'}`,
    `Клиент: ${form.name}`,
    `Телефон: ${form.phone}`,
    `Бележка: ${form.message.trim() || 'Няма допълнителна бележка'}`,
  ].join('\n');
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [selectedBooking, setSelectedBooking] = useState<BookingSelection | null>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleBookingSelected = (event: Event) => {
      const detail = (event as CustomEvent<BookingSelection>).detail;
      const selectedService = detail?.service?.trim();

      if (!selectedService) {
        return;
      }

      setSent(false);
      setSubmitError('');
      setSelectedBooking({
        service: selectedService,
        price: detail.price,
        duration: detail.duration,
      });
      setForm((current) => ({
        ...current,
        service: selectedService,
      }));
    };

    window.addEventListener('booking:selected', handleBookingSelected);
    return () => window.removeEventListener('booking:selected', handleBookingSelected);
  }, []);

  const selectOptions =
    form.service && !serviceOptions.includes(form.service)
      ? [form.service, ...serviceOptions]
      : serviceOptions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError('');

    const requestMessage = buildRequestMessage(form, selectedBooking);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('service', form.service || 'Не е избрана');
    formData.append('preferred_date', form.date || 'Не е избрана');
    formData.append('preferred_time', form.time || 'Не е избран');
    formData.append('selected_price', selectedBooking?.price || 'Не е посочена');
    formData.append('selected_duration', selectedBooking?.duration || 'Не е посочена');
    formData.append('message', requestMessage);
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
      setForm(emptyForm);
      setSelectedBooking(null);
    } catch {
      setSubmitError('Заявката не беше изпратена. Опитайте отново или се обадете на телефона.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="reveal section-label mb-4">Свържете се с нас</p>
          <h2 className="reveal reveal-delay-1 mb-6 font-display text-4xl leading-tight text-[#1a1a1a] md:text-5xl">
            Запазете своя час
          </h2>
          <p className="reveal reveal-delay-2 mx-auto max-w-md font-sans text-base leading-relaxed text-[#6b6b6b]">
            Изберете услуга, дата и час. Заявката се подрежда автоматично и се изпраща готова за преглед.
          </p>
          <div className="reveal reveal-delay-3 mx-auto mt-8 h-px w-16 bg-[#c9a96e]" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:gap-20">
          <div className="reveal reveal-delay-1">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#f0ebe4]">
                <Phone size={18} className="text-[#c9a96e]" />
              </div>
              <div>
                <p className="mb-1 font-sans text-xs uppercase tracking-[0.2em] text-[#999]">Телефон</p>
                <a href="tel:+359885443055" className="font-display text-xl text-[#1a1a1a] transition-colors hover:text-[#c9a96e]">
                  +359 885 443 055
                </a>
              </div>
            </div>

            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#f0ebe4]">
                <MapPin size={18} className="text-[#c9a96e]" />
              </div>
              <div>
                <p className="mb-1 font-sans text-xs uppercase tracking-[0.2em] text-[#999]">Адрес</p>
                <p className="font-sans text-base text-[#1a1a1a]">бул. Александър Батенберг 95, Стара Загора</p>
              </div>
            </div>

            <div className="mb-10 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#f0ebe4]">
                <Clock size={18} className="text-[#c9a96e]" />
              </div>
              <div className="flex-1">
                <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-[#999]">Работно време</p>
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
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#999]">Социални мрежи</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/rnd_nailsalon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center border border-[#f0ebe4] text-[#6b6b6b] transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/raivanovi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center border border-[#f0ebe4] text-[#6b6b6b] transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@rnd_nailsalon?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center border border-[#f0ebe4] text-[#6b6b6b] transition-all duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
                >
                  <Music2 size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="border border-[#f0ebe4] bg-[#fdfaf8] p-8 md:p-10">
              <h3 className="mb-2 font-display text-2xl text-[#1a1a1a]">Панел за заявка</h3>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle size={48} className="text-[#c9a96e]" />
                  <h4 className="font-display text-xl text-[#1a1a1a]">Благодарим ви!</h4>
                  <p className="font-sans text-sm text-[#6b6b6b]">Заявката беше изпратена успешно. Ще се свържем с вас скоро.</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setSubmitError('');
                      setForm(emptyForm);
                      setSelectedBooking(null);
                    }}
                    className="mt-4 font-sans text-xs uppercase tracking-widest text-[#c9a96e] hover:underline"
                  >
                    Нова заявка
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
                    <div className="rounded-[28px] border border-[#efe4d7] bg-white p-5">
                      <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.24em] text-[#a19384]">Избрана услуга</p>
                      <div className="rounded-2xl bg-[#f8f2eb] px-4 py-4">
                        <p className="font-display text-lg text-[#1a1a1a]">
                          {form.service || 'Изберете услуга от секция „Услуги и цени“'}
                        </p>
                        <p className="mt-1 font-sans text-sm text-[#7d6f63]">
                          При натискане на „Запази час“ към услуга, тя се записва тук.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#efe4d7] bg-[#fffaf5] p-5">
                      <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.24em] text-[#a19384]">Детайли</p>
                      <div className="space-y-3 font-sans text-sm text-[#5f544a]">
                        <div className="flex items-center justify-between gap-4 border-b border-[#efe4d7] pb-3">
                          <span>Цена</span>
                          <span className="font-medium text-[#1a1a1a]">{selectedBooking?.price || '-'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-b border-[#efe4d7] pb-3">
                          <span>Време</span>
                          <span className="font-medium text-[#1a1a1a]">{selectedBooking?.duration || '-'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span>Статус</span>
                          <span className="rounded-full bg-[#e8f1e8] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#668066]">
                            Чака заявка
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                        Вашето име
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
                        placeholder="Мария Иванова"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
                        placeholder="+359 885 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                      Услуга
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={(e) => {
                        const nextService = e.target.value;
                        setForm({ ...form, service: nextService });
                        setSelectedBooking((current) => {
                          if (!nextService) {
                            return null;
                          }

                          if (current?.service === nextService) {
                            return current;
                          }

                          return { service: nextService };
                        });
                      }}
                      className="w-full cursor-pointer appearance-none border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
                    >
                      <option value="">Изберете услуга</option>
                      {selectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                        Дата
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                        Час
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full cursor-pointer appearance-none border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
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
                    <label className="mb-2 block font-sans text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
                      Бележка
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none border border-[#e8e0d8] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] placeholder-[#c0b8b0] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none"
                      placeholder="Допълнителни въпроси, предпочитания или уточнения..."
                    />
                    <p className="mt-2 font-sans text-xs text-[#9a8f84]">
                      Имейлът се генерира автоматично според услугата, датата и часа.
                    </p>
                  </div>

                  {submitError ? <p className="font-sans text-sm text-[#b25b5b]">{submitError}</p> : null}

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-3 bg-[#c9a96e] px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#b8933e] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
