import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Award,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DatabaseZap,
  HeartPulse,
  Lightbulb,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import HelixScene from "./HelixScene.jsx";

const teamImages = {
  sarah:
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
  michael:
    "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
  james:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  maria:
    "https://images.pexels.com/photos/3769011/pexels-photo-3769011.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const solutions = [
  {
    icon: Microscope,
    title: "AI Diagnostics",
    text: "Decision-support tools that help clinicians detect patterns sooner and prioritize care with confidence.",
  },
  {
    icon: Activity,
    title: "Patient Care Analytics",
    text: "Operational intelligence for care teams, from risk trends to follow-up visibility across clinics.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Data Solutions",
    text: "Privacy-forward health records, encrypted workflows, and governance built for clinical trust.",
  },
  {
    icon: HeartPulse,
    title: "Health Monitoring",
    text: "Remote monitoring and alerts that keep patients connected between appointments.",
  },
];

const values = [
  {
    icon: HeartPulse,
    title: "Patient First",
    text: "Every decision prioritizes patient welfare and stronger outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We bring practical, modern technology into everyday healthcare.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Clinical trust, transparency, and ethical data practices guide our work.",
  },
  {
    icon: Users,
    title: "Accessibility",
    text: "Advanced healthcare tools should reach communities across the Caribbean.",
  },
];

const journey = [
  ["2020", "Founded in Kingston, Jamaica"],
  ["2021", "Launched first AI diagnostic tool"],
  ["2022", "Partnered with 50+ clinics"],
  ["2023", "Served 25,000+ patients across the Caribbean"],
  ["2024", "Expanded to telemedicine services"],
  ["2025", "Achieved 98% diagnostic accuracy and supported 100K+ patients"],
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    image: teamImages.sarah,
    bio: "Former Harvard Medical School professor with 20+ years in healthcare innovation.",
  },
  {
    name: "Michael Roberts",
    role: "CEO & Founder",
    image: teamImages.michael,
    bio: "Tech entrepreneur with a passion for accessible healthcare solutions.",
  },
  {
    name: "Dr. James Williams",
    role: "Head of AI Research",
    image: teamImages.james,
    bio: "AI specialist from MIT with groundbreaking work in medical diagnostics.",
  },
  {
    name: "Maria Santos",
    role: "Director of Operations",
    image: teamImages.maria,
    bio: "Healthcare operations expert focused on Caribbean healthcare systems.",
  },
];

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (876) 575-4942",
    href: "tel:+18765754942",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@helixcareagency.com",
    href: "mailto:info@helixcareagency.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "1/2 Lobby Street, Kingston, Jamaica",
    href: "https://maps.google.com/?q=Kingston%2C%20Jamaica",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon-Fri: 8AM - 6PM",
    href: "/contact",
  },
];

function useParallax() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}`,
      );
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <Activity size={22} aria-hidden="true" />
        </span>
        <span>
          <strong>HelixCare</strong>
          <small>Agency</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <NavLink className="nav-cta" to="/contact">
        <MessageSquare size={18} aria-hidden="true" />
        Get Started
      </NavLink>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open menu"
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <NavLink className="mobile-cta" to="/contact">
            Contact Us
          </NavLink>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">
              <Activity size={22} aria-hidden="true" />
            </span>
            <span>
              <strong>HelixCare</strong>
              <small>Agency</small>
            </span>
          </Link>
          <p>
            Revolutionizing healthcare in Jamaica and the Caribbean with AI
            solutions for better patient outcomes.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div>
          <h3>Contact Info</h3>
          <a href="tel:+18765754942">+1 (876) 575-4942</a>
          <a href="mailto:info@helixcareagency.com">info@helixcareagency.com</a>
          <span>Kingston, Jamaica</span>
        </div>
        <div>
          <h3>Follow Us</h3>
          <div className="social-row">
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:info@helixcareagency.com"
              aria-label="Email HelixCare"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
            <a href="tel:+18765754942" aria-label="Call HelixCare">
              <Phone size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <p className="copyright">© 2026 HelixCare Agency. All rights reserved.</p>
    </footer>
  );
}

function Home() {
  useParallax();

  return (
    <>
      <section className="hero">
        <div className="hero-bg hero-bg-a" />
        <div className="hero-bg hero-bg-b" />
        <div className="hero-inner">
          <div className="hero-copy reveal">
            <span className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              AI healthcare for the Caribbean
            </span>
            <h1>HelixCare Agency</h1>
            <p>
              Transforming healthcare in Jamaica and the Caribbean with AI
              diagnostics, secure data workflows, and practical patient
              intelligence for modern care teams.
            </p>
            <div className="hero-actions">
              <NavLink className="primary-button" to="/contact">
                Get Started <ArrowRight size={18} aria-hidden="true" />
              </NavLink>
              <NavLink className="secondary-button" to="/about">
                Learn More <ChevronRight size={18} aria-hidden="true" />
              </NavLink>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Animated AI healthcare helix"
          >
            <div className="scene-glow scene-glow-a" />
            <div className="scene-glow scene-glow-b" />
            <HelixScene />
            <div className="metric-card parallax-slow">
              <BrainCircuit size={24} aria-hidden="true" />
              <strong>98%</strong>
              <span>diagnostic accuracy</span>
            </div>
            <div className="scene-card scene-card-left parallax-fast">
              <DatabaseZap size={22} aria-hidden="true" />
              <span>Secure health data</span>
              <strong>Encrypted signals</strong>
            </div>
            <div className="scene-card scene-card-right parallax-medium">
              <Stethoscope size={22} aria-hidden="true" />
              <span>Clinical workflow</span>
              <strong>Live triage assist</strong>
            </div>
            <div className="pulse-card parallax-medium">
              <span />
              <div>
                <strong>100K+</strong>
                <small>patients supported</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        {[
          ["50+", "partner clinics"],
          ["24 hr", "response window"],
          ["4", "core AI solutions"],
          ["2026", "Caribbean-ready platform"],
        ].map(([number, label]) => (
          <div key={label}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Innovative AI Solutions"
          title="Clinical tools designed for real healthcare teams"
          text="HelixCare combines medical expertise, data security, and pragmatic AI systems that fit the day-to-day work of clinics and hospitals."
        />
        <div className="solution-grid">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article className="solution-card" key={solution.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="split-section">
        <div className="split-copy">
          <span className="eyebrow">Leading the Future of Healthcare</span>
          <h2>
            Built where clinical excellence meets island-scale accessibility
          </h2>
          <p>
            We help providers move from scattered data and slow decisions to
            connected care pathways, earlier risk detection, and stronger
            patient communication.
          </p>
          <ul className="check-list">
            <li>
              <CheckCircle2 size={20} aria-hidden="true" /> HIPAA-conscious
              systems and encrypted workflows
            </li>
            <li>
              <CheckCircle2 size={20} aria-hidden="true" /> Implementation
              support for clinics, hospitals, and partners
            </li>
            <li>
              <CheckCircle2 size={20} aria-hidden="true" /> Analytics that
              support clinicians without replacing judgment
            </li>
          </ul>
        </div>
        <div className="clinical-panel">
          <img src={teamImages.maria} alt="HelixCare operations director" />
          <div>
            <span>Care intelligence</span>
            <strong>
              From first visit to follow-up, every signal stays visible.
            </strong>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About HelixCare"
        title="Revolutionizing Healthcare in Jamaica & The Caribbean"
        text="We are a team of healthcare professionals and AI experts dedicated to transforming patient care through innovative technology solutions."
      />

      <section className="mission-grid">
        <article>
          <Target size={30} aria-hidden="true" />
          <h2>Our Mission</h2>
          <p>
            To democratize access to advanced healthcare technology across
            Jamaica and the Caribbean, ensuring every patient receives accurate
            diagnoses and personalized care through the power of artificial
            intelligence.
          </p>
        </article>
        <article>
          <Sparkles size={30} aria-hidden="true" />
          <h2>Our Vision</h2>
          <p>
            To become the leading AI healthcare solutions provider in the
            Caribbean, where technology and human expertise combine seamlessly
            to deliver world-class healthcare outcomes.
          </p>
        </article>
      </section>

      <section className="section alt-section">
        <SectionIntro
          eyebrow="Our Core Values"
          title="The principles that guide everything we do"
          text="HelixCare is built around responsible innovation, practical service, and a deep respect for patients and clinicians."
        />
        <div className="value-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article key={value.title}>
                <Icon size={26} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="timeline-section">
        <SectionIntro
          eyebrow="Our Journey"
          title="From a Kingston startup to a Caribbean health-tech partner"
          text="A focused path of product launches, clinical partnerships, and measurable patient impact."
        />
        <div className="timeline">
          {journey.map(([year, event]) => (
            <article key={year}>
              <strong>{year}</strong>
              <p>{event}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Our Team"
          title="Meet the Experts Behind HelixCare"
          text="A diverse team of healthcare professionals, AI researchers, and technology experts united by a common goal."
        />
        <TeamGrid />
      </section>

      <section className="awards-band">
        {[
          "HIPAA Compliant",
          "ISO 27001 Certified",
          "Caribbean Health Innovation Award",
          "AI Excellence Award",
          "Best Healthcare Startup",
        ].map((award) => (
          <span key={award}>
            <Award size={18} aria-hidden="true" />
            {award}
          </span>
        ))}
      </section>

      <CallToAction />
    </>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const canSubmit = useMemo(
    () => form.name && form.email && form.subject && form.message,
    [form],
  );

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function submitForm(event) {
    event.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
      });
      window.setTimeout(() => setStatus("idle"), 2400);
    }, 800);
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Connect"
        text="Have questions about our AI healthcare solutions? We're here to help you transform patient care in Jamaica and the Caribbean."
      />

      <section className="contact-strip">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.title} href={item.href}>
              <Icon size={24} aria-hidden="true" />
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </a>
          );
        })}
      </section>

      <section className="contact-layout">
        <div className="contact-form-panel">
          <h2>Send Us a Message</h2>
          <p>
            Fill out the form below and our team will get back to you within 24
            hours.
          </p>
          <form onSubmit={submitForm}>
            <div className="field-grid">
              <FormField
                icon={User}
                label="Full Name"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="John Doe"
                required
              />
              <FormField
                icon={Mail}
                label="Email Address"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="john@example.com"
                type="email"
                required
              />
              <FormField
                icon={Phone}
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="+1 (XXX) XXX-XXXX"
              />
              <FormField
                icon={Building2}
                label="Organization"
                name="organization"
                value={form.organization}
                onChange={updateField}
                placeholder="Clinic or hospital"
              />
            </div>
            <label className="form-field">
              <span>Subject</span>
              <select
                name="subject"
                value={form.subject}
                onChange={updateField}
                required
              >
                <option value="">Select a topic</option>
                <option value="demo">Request a Demo</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="pricing">Pricing Information</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="form-field">
              <span>Message</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={updateField}
                placeholder="Tell us about your needs..."
                required
              />
            </label>
            <button
              className="primary-button wide-button"
              type="submit"
              disabled={!canSubmit || status === "sending"}
            >
              {status === "sent" ? (
                <CheckCircle2 size={18} aria-hidden="true" />
              ) : (
                <MessageSquare size={18} aria-hidden="true" />
              )}
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Message Sent"
                  : "Send Message"}
            </button>
          </form>
        </div>

        <aside className="faq-panel">
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions about our services.</p>
          {[
            [
              "What AI solutions do you offer?",
              "We provide AI diagnostics, patient care analytics, health monitoring systems, and secure data management solutions tailored for healthcare providers.",
            ],
            [
              "How can my clinic partner with HelixCare?",
              "Contact us through the form or call us directly. Our team will schedule a consultation to understand your needs.",
            ],
            [
              "Is patient data secure?",
              "Yes. We design around HIPAA-conscious practices, encryption, and careful access controls for patient information.",
            ],
          ].map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
          <div className="direct-call">
            <h3>Prefer to talk directly?</h3>
            <p>Our team is available during office hours to assist you.</p>
            <a className="secondary-button" href="tel:+18765754942">
              <Phone size={18} aria-hidden="true" />
              +1 (876) 575-4942
            </a>
          </div>
        </aside>
      </section>

      <section className="map-panel">
        <MapPin size={38} aria-hidden="true" />
        <h2>Kingston, Jamaica</h2>
        <p>Caribbean Region</p>
      </section>
    </>
  );
}

function FormField({ icon: Icon, label, ...props }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="input-with-icon">
        <Icon size={18} aria-hidden="true" />
        <input {...props} />
      </div>
    </label>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function TeamGrid() {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <article className="team-card" key={member.name}>
          <img src={member.image} alt={member.name} />
          <div>
            <h3>{member.name}</h3>
            <span>{member.role}</span>
            <p>{member.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CallToAction() {
  return (
    <section className="cta-section">
      <span className="eyebrow">Partner With Us</span>
      <h2>Ready to Transform Your Healthcare?</h2>
      <p>
        Whether you are a healthcare provider, researcher, or technology
        partner, HelixCare can help bring modern AI capabilities into your care
        environment.
      </p>
      <NavLink className="primary-button" to="/contact">
        Contact Us Today <ArrowRight size={18} aria-hidden="true" />
      </NavLink>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
