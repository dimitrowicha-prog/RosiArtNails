import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Testimonials from './components/Testimonials';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />

      <a
        href="#contact"
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-[#c9a96e] px-4 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-lg shadow-[#c9a96e]/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8933e] hover:shadow-xl sm:bottom-6 sm:right-6 sm:px-5 sm:text-xs sm:tracking-[0.2em]"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="white" strokeWidth="1.2" />
          <path d="M5 2V4M11 2V4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2 7H14" stroke="white" strokeWidth="1.2" />
          <circle cx="5.5" cy="10" r="1" fill="white" />
          <circle cx="8" cy="10" r="1" fill="white" />
          <circle cx="10.5" cy="10" r="1" fill="white" />
        </svg>
        Запази час
      </a>
    </div>
  );
}
