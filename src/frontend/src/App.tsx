import {
  ChevronDown,
  Crown,
  Facebook,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── helpers ────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const children = el.querySelectorAll(".reveal");
    if (el.classList.contains("reveal")) observer.observe(el);
    for (const child of Array.from(children)) observer.observe(child);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {STAR_KEYS.slice(0, max).map((key, i) => (
        <Star
          key={key}
          className="w-4 h-4"
          style={{
            fill: i < Math.floor(rating) ? "#D6B25E" : "transparent",
            color: "#D6B25E",
          }}
        />
      ))}
    </div>
  );
}

// ─── data ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "bridal",
    name: "Bridal Makeup",
    desc: "Radiant, long-lasting bridal looks crafted for your most special day.",
    Icon: Crown,
  },
  {
    id: "party",
    name: "Party Makeup",
    desc: "Glamorous evening and party looks that make you unforgettable.",
    Icon: Sparkles,
  },
  {
    id: "hair",
    name: "Hair Styling",
    desc: "Cuts, blowouts, colour, and treatments by expert stylists.",
    Icon: Scissors,
  },
  {
    id: "skin",
    name: "Skin Care",
    desc: "Advanced facials and treatments for luminous, healthy skin.",
    Icon: Leaf,
  },
];

const GALLERY = [
  {
    id: "gallery-bridal",
    src: "/assets/generated/gallery-bridal.dim_600x700.jpg",
    alt: "Bridal makeup transformation",
    tall: true,
    ocid: "gallery.item.1",
  },
  {
    id: "gallery-party",
    src: "/assets/generated/gallery-party.dim_600x500.jpg",
    alt: "Glamorous party makeup",
    tall: false,
    ocid: "gallery.item.2",
  },
  {
    id: "gallery-hair",
    src: "/assets/generated/gallery-hair.dim_600x600.jpg",
    alt: "Professional hair styling",
    tall: false,
    ocid: "gallery.item.3",
  },
  {
    id: "gallery-skin",
    src: "/assets/generated/gallery-skin.dim_600x500.jpg",
    alt: "Luxurious skin care treatment",
    tall: false,
    ocid: "gallery.item.4",
  },
  {
    id: "gallery-transform",
    src: "/assets/generated/gallery-transform.dim_600x700.jpg",
    alt: "Full beauty transformation",
    tall: true,
    ocid: "gallery.item.5",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "The bridal makeup was absolutely stunning! I felt like a queen on my wedding day. Highly recommend Bellissima!",
    name: "Priya Sharma",
    title: "Bride",
    rating: 5,
    ocid: "testimonials.card.1",
  },
  {
    id: "t2",
    quote:
      "Best salon in Lucknow! The team is so professional and the results are always flawless.",
    name: "Ananya Gupta",
    title: "Regular Client",
    rating: 5,
    ocid: "testimonials.card.2",
  },
  {
    id: "t3",
    quote:
      "Amazing hair styling and skin treatment. The ambiance is so relaxing. Will definitely come back!",
    name: "Sneha Verma",
    title: "Happy Customer",
    rating: 4,
    ocid: "testimonials.card.3",
  },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

const STATS = [
  { id: "stat-years", num: "10+", label: "Years of Excellence" },
  { id: "stat-clients", num: "5000+", label: "Happy Clients" },
];

const HOURS = [
  {
    id: "hours-weekday",
    day: "Mon \u2013 Sat",
    time: "10:00 AM \u2013 8:00 PM",
  },
  { id: "hours-weekend", day: "Sunday", time: "11:00 AM \u2013 6:00 PM" },
];

// ─── palette shortcuts ───────────────────────────────────────────────────────
const P = {
  bg: "#F5E9E2",
  primary: "#A47551",
  text: "#3E2723",
  white: "#FFFFFF",
  gold: "#D6B25E",
  muted: "#7A5C46",
} as const;

// ─── sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-3"
      style={{ color: P.primary }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-3xl md:text-4xl font-bold tracking-wide uppercase mb-4"
      style={{ color: P.text }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <span
        className="block h-px w-16"
        style={{ background: P.primary, opacity: 0.35 }}
      />
      <span
        className="block w-2 h-2 rounded-full"
        style={{ background: P.primary }}
      />
      <span
        className="block h-px w-16"
        style={{ background: P.primary, opacity: 0.35 }}
      />
    </div>
  );
}

// ─── WhatsApp icon ───────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.552 4.1 1.516 5.83L.047 23.953a.5.5 0 0 0 .618.618l6.174-1.461A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.906 0-3.693-.505-5.232-1.387l-.374-.22-3.877.917.935-3.826-.242-.396A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// ─── sections ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleBookMobile = () => {
    setMobileOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.98)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px rgba(100,60,30,0.12)" : "none",
      }}
      data-ocid="nav.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex flex-col leading-tight"
          data-ocid="nav.link"
        >
          <span
            className="font-serif text-xl md:text-2xl font-bold tracking-[0.18em] uppercase"
            style={{ color: P.text }}
          >
            Bellissima
          </span>
          <span
            className="text-[9px] tracking-[0.3em] uppercase font-light"
            style={{ color: P.primary }}
          >
            Exclusive Salon Lucknow
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: P.text }}
              data-ocid="nav.link"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-md"
            style={{ background: P.primary, color: P.white }}
            data-ocid="nav.primary_button"
          >
            Book Appointment
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg"
          style={{ color: P.text }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              background: P.white,
              borderColor: "rgba(164,117,81,0.15)",
            }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-3 px-2 text-sm font-medium border-b"
                  style={{
                    color: P.text,
                    borderColor: "rgba(164,117,81,0.12)",
                  }}
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                className="mt-3 px-5 py-3 rounded-full text-sm font-semibold text-center w-full"
                style={{ background: P.primary, color: P.white }}
                onClick={handleBookMobile}
                data-ocid="nav.primary_button"
              >
                Book Appointment
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x800.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(62,39,35,0.82) 0%, rgba(62,39,35,0.55) 50%, rgba(62,39,35,0.15) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(214,178,94,0.9)" }}
          >
            Bellissima Exclusive Salon
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight mb-6"
            style={{ color: P.white }}
          >
            Enhance Your <span style={{ color: "#F0D5B8" }}>Natural</span>
            <br />
            Beauty
          </h1>
          <p
            className="text-base md:text-lg font-light mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Professional care that brings out your best look
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{ background: P.primary, color: P.white }}
              data-ocid="hero.primary_button"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: P.white,
                border: "1.5px solid rgba(255,255,255,0.45)",
              }}
              data-ocid="hero.secondary_button"
            >
              Our Services <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      className="py-20 md:py-28"
      style={{ background: P.bg }}
      data-ocid="about.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="reveal reveal-delay-1">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(100,60,30,0.18)" }}
            >
              <img
                src="/assets/generated/about-salon.dim_700x500.jpg"
                alt="Bellissima Salon interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-3 rounded-xl pointer-events-none"
                style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {STATS.map(({ id, num, label }) => (
                <div
                  key={id}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: P.white,
                    boxShadow: "0 6px 20px rgba(100,60,30,0.10)",
                  }}
                >
                  <p
                    className="font-serif text-2xl font-bold"
                    style={{ color: P.primary }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: P.muted }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2">
            <SectionLabel>About Us</SectionLabel>
            <SectionTitle>
              Lucknow&apos;s Premier
              <br />
              Beauty Destination
            </SectionTitle>
            <Divider />
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: P.text, opacity: 0.85 }}
            >
              Welcome to Bellissima Exclusive Salon, Lucknow&apos;s premier
              destination for luxury beauty treatments. With over{" "}
              <strong style={{ color: P.primary }}>
                10 years of expertise
              </strong>{" "}
              and more than{" "}
              <strong style={{ color: P.primary }}>5,000 happy clients</strong>,
              we specialise in bridal makeup, party looks, hair transformations,
              and advanced skin care.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: P.text, opacity: 0.85 }}
            >
              Our team of certified beauty professionals is dedicated to
              bringing out your natural radiance. We use only premium, skin-safe
              products and the latest techniques to ensure you leave looking and
              feeling your absolute best.
            </p>
            <a
              href="#services"
              className="inline-block px-7 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-200 hover:opacity-90"
              style={{ background: P.primary, color: P.white }}
              data-ocid="about.primary_button"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="services"
      className="py-20 md:py-28"
      style={{ background: "rgba(245,233,226,0.55)" }}
      data-ocid="services.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14 reveal" ref={ref}>
          <SectionLabel>What We Offer</SectionLabel>
          <SectionTitle>Our Services</SectionTitle>
          <Divider />
          <p
            className="max-w-xl mx-auto text-sm md:text-base leading-relaxed"
            style={{ color: P.muted }}
          >
            Every service is crafted with precision, care and premium-quality
            products tailored to your unique needs.
          </p>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          ref={ref}
        >
          {SERVICES.map(({ id, name, desc, Icon }, idx) => (
            <div
              key={id}
              className={`reveal reveal-delay-${idx + 1} group rounded-2xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1`}
              style={{
                background: P.white,
                boxShadow: "0 10px 30px rgba(100,60,30,0.09)",
              }}
              data-ocid={`services.card.${idx + 1}`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(164,117,81,0.12)" }}
              >
                <Icon className="w-6 h-6" style={{ color: P.primary }} />
              </div>
              <h3
                className="font-serif text-lg font-bold mb-2"
                style={{ color: P.text }}
              >
                {name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: P.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useScrollReveal();

  return (
    <section
      id="gallery"
      className="py-20 md:py-28"
      style={{ background: P.bg }}
      data-ocid="gallery.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14 reveal" ref={ref}>
          <SectionLabel>Our Work</SectionLabel>
          <SectionTitle>Gallery</SectionTitle>
          <Divider />
          <p
            className="max-w-xl mx-auto text-sm md:text-base leading-relaxed"
            style={{ color: P.muted }}
          >
            A glimpse into the transformations we create every day at
            Bellissima.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4" ref={ref}>
          {GALLERY.map(({ id, src, alt, tall, ocid }, idx) => (
            <div
              key={id}
              className={`reveal reveal-delay-${(idx % 4) + 1} overflow-hidden rounded-2xl break-inside-avoid`}
              style={{ boxShadow: "0 8px 24px rgba(100,60,30,0.12)" }}
              data-ocid={ocid}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`gallery-img w-full object-cover ${
                  tall ? "h-72 md:h-96" : "h-52 md:h-64"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28"
      style={{ background: "rgba(245,233,226,0.55)" }}
      data-ocid="testimonials.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14 reveal" ref={ref}>
          <SectionLabel>What Clients Say</SectionLabel>
          <SectionTitle>Client Testimonials</SectionTitle>
          <Divider />
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: P.white,
              boxShadow: "0 4px 16px rgba(100,60,30,0.10)",
            }}
          >
            <Star className="w-5 h-5 fill-current" style={{ color: P.gold }} />
            <span
              className="font-serif font-bold text-lg"
              style={{ color: P.text }}
            >
              4.7
            </span>
            <span className="text-sm" style={{ color: P.muted }}>
              Average Rating
            </span>
          </div>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          ref={ref}
        >
          {TESTIMONIALS.map(({ id, quote, name, title, rating, ocid }, idx) => (
            <div
              key={id}
              className={`reveal reveal-delay-${idx + 1} rounded-2xl p-7 flex flex-col gap-4`}
              style={{
                background: P.white,
                boxShadow: "0 10px 30px rgba(100,60,30,0.09)",
              }}
              data-ocid={ocid}
            >
              <span
                className="font-serif text-5xl leading-none"
                style={{ color: P.primary, opacity: 0.25 }}
              >
                &ldquo;
              </span>
              <p
                className="text-sm leading-relaxed -mt-6"
                style={{ color: P.text, opacity: 0.82 }}
              >
                {quote}
              </p>
              <div className="mt-auto flex flex-col gap-1.5">
                <StarRating rating={rating} />
                <p className="font-semibold text-sm" style={{ color: P.text }}>
                  {name}
                </p>
                <p className="text-xs" style={{ color: P.muted }}>
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ background: P.bg }}
      data-ocid="contact.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14 reveal" ref={ref}>
          <SectionLabel>Get In Touch</SectionLabel>
          <SectionTitle>Contact Us</SectionTitle>
          <Divider />
        </div>

        <div
          className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start"
          ref={ref}
        >
          {/* Info */}
          <div className="reveal reveal-delay-1 flex flex-col gap-6">
            <div
              className="rounded-2xl p-8"
              style={{
                background: P.white,
                boxShadow: "0 10px 30px rgba(100,60,30,0.09)",
              }}
            >
              <h3
                className="font-serif text-xl font-bold mb-6"
                style={{ color: P.text }}
              >
                Visit Us
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(164,117,81,0.12)" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: P.primary }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: P.text }}
                    >
                      Address
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: P.muted }}
                    >
                      MG Heights, Vrindavan Colony,
                      <br />
                      Lucknow, Uttar Pradesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(164,117,81,0.12)" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: P.primary }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: P.text }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="text-sm hover:opacity-70 transition-opacity"
                      style={{ color: P.muted }}
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-wide uppercase transition-all duration-200 hover:opacity-90 hover:shadow-md"
                style={{ background: "#25D366", color: P.white }}
                data-ocid="contact.primary_button"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-wide uppercase border-2 transition-all duration-200 hover:opacity-80"
                style={{ borderColor: P.primary, color: P.primary }}
                data-ocid="contact.secondary_button"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Hours */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: P.white,
                boxShadow: "0 6px 20px rgba(100,60,30,0.08)",
              }}
            >
              <h4
                className="font-serif font-bold mb-3 text-base"
                style={{ color: P.text }}
              >
                Opening Hours
              </h4>
              {HOURS.map(({ id, day, time }) => (
                <div
                  key={id}
                  className="flex justify-between text-sm py-2 border-b last:border-0"
                  style={{
                    borderColor: "rgba(164,117,81,0.12)",
                    color: P.muted,
                  }}
                >
                  <span className="font-medium" style={{ color: P.text }}>
                    {day}
                  </span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div
            className="reveal reveal-delay-2 rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 10px 30px rgba(100,60,30,0.12)",
              minHeight: 380,
            }}
          >
            <iframe
              src="https://maps.google.com/maps?q=MG+Heights,+Vrindavan+Colony,+Lucknow&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bellissima Salon Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: P.text, color: P.white }}
      data-ocid="footer.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div
          className="grid md:grid-cols-3 gap-10 pb-12 border-b"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold tracking-wider uppercase mb-1">
              Bellissima
            </p>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "rgba(214,178,94,0.85)" }}
            >
              Exclusive Salon Lucknow
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              Your premier destination for luxury beauty treatments in Lucknow.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: P.gold }}
            >
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.70)" }}
                  data-ocid="footer.link"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: P.gold }}
            >
              Contact
            </p>
            <div
              className="flex flex-col gap-3 text-sm"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              <p>
                MG Heights, Vrindavan Colony,
                <br />
                Lucknow, UP
              </p>
              <a
                href="tel:+919876543210"
                className="hover:opacity-70 transition-opacity"
              >
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <p>
            &copy; {year} Bellissima Exclusive Salon Lucknow. All rights
            reserved.
          </p>
          <p>
            Designed &amp; Developed by{" "}
            <span style={{ color: "rgba(214,178,94,0.80)" }}>
              Nexora Digital Services
            </span>
          </p>
        </div>

        {/* Caffeine attribution */}
        <div
          className="text-center mt-3 text-xs"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Built with &hearts; using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70 transition-opacity"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp float ──────────────────────────────────────────────────────────

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-bounce fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        background: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        color: "#fff",
      }}
      aria-label="Chat on WhatsApp"
      data-ocid="contact.primary_button"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: P.bg }} className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
