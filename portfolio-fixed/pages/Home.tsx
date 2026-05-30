import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, ArrowDown, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../components/ParticleCanvas';
import CloudinaryVideo from '../components/CloudinaryVideo';

function scrollToShowreel() {
  document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
}

const featured = [
  { id: 'cyberpunk-neon-noir', num: '001', title: 'Neon Fluidity',    cat: '3D Motion / Branding',  img: '/assets/projects/neon-fluidity.png' },
  { id: 'glitch-protocol',     num: '002', title: 'FUI Design',       cat: 'Motion Graphics',        img: '/assets/projects/fui-design.png' },
  { id: 'silent-echoes',       num: '003', title: 'Glitch FX',        cat: 'Visual Effects',         img: '/assets/projects/glitch-fx.png' },
  { id: 'liquid-flow-v02',     num: '004', title: 'Minimal Motion',   cat: 'Personal Project',       img: '/assets/projects/minimal-motion.png' },
];

const testimonials = [
  {
    quote: 'Khalex took our brand vision and turned it into something that actually moves people. The motion work was leagues above what we expected.',
    name: 'Amara Osei',
    role: 'Creative Director, Nuvela Studio',
    initials: 'AO',
  },
  {
    quote: 'Hands down the most cinematic reel I've seen from an independent creator. Delivery was fast, communication was flawless.',
    name: 'Daniel Reyes',
    role: 'Founder, Prism Films',
    initials: 'DR',
  },
  {
    quote: 'The glitch effects and FUI design on our campaign stopped the scroll instantly. We saw a 3× spike in engagement within 48 hours.',
    name: 'Sade Mensah',
    role: 'Marketing Lead, TechVault Africa',
    initials: 'SM',
  },
];

const services = [
  { num: '01', title: 'Motion Design',       desc: 'Kinetic typography, title sequences, and animated brand assets built for maximum visual impact.' },
  { num: '02', title: 'Brand Films',         desc: 'Cinematic storytelling that captures brand identity and drives emotional connection with your audience.' },
  { num: '03', title: 'Visual Effects',      desc: 'Glitch, FUI, particle systems and post-production FX that make every frame demand attention.' },
  { num: '04', title: 'Social Content',      desc: 'High-converting short-form video built natively for the platforms where your audience actually lives.' },
];

// Staggered section reveal
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const heroRef   = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();
  const heroY   = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOp  = useTransform(scrollY, [0, 400], [1, 0]);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="page-enter">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end">

        {/* Layered background */}
        <div className="absolute inset-0">
          <motion.img
            src="/assets/projects/hero-bg.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ y: heroY }}
          />
          {/* Deep gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 noise-overlay" />
        </div>

        {/* Interactive particle system */}
        <ParticleCanvas intensity="medium" />

        {/* Vertical rule lines */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="h-full max-w-[1600px] mx-auto px-6 md:px-10 flex">
            <div className="border-l border-wire/20 ml-0 flex-shrink-0" />
            <div className="flex-1" />
            <div className="border-r border-wire/20 flex-shrink-0" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-hot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-hot">
              Motion Designer · Lagos, NG
            </span>
            <span className="w-6 h-px bg-hot/40" />
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper"
              style={{ fontSize: 'clamp(3.8rem, 12vw, 10.5rem)' }}
            >
              Crafting
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.42, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold uppercase tracking-tighter leading-[0.82]"
              style={{ fontSize: 'clamp(3.8rem, 12vw, 10.5rem)' }}
            >
              <span className="text-hot italic">Motion.</span>
            </motion.h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="font-mono text-[11px] text-ash max-w-sm leading-relaxed mb-10 md:mb-12"
          >
            Cinematic brand films, motion graphics & visual effects that stop the scroll and leave a mark.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-3 bg-hot text-ink px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200"
            >
              View Work
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={scrollToShowreel}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ash hover:text-paper transition-colors duration-200"
            >
              <span className="w-9 h-9 border border-wire/60 flex items-center justify-center group-hover:border-hot transition-colors">
                <ArrowDown className="w-3 h-3" />
              </span>
              Watch Showreel
            </button>
          </motion.div>
        </div>

        {/* Corner counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute top-24 right-6 md:right-10 z-10 text-right"
        >
          <div className="font-mono text-[10px] text-wire tracking-widest">01 / 04</div>
          <div className="font-mono text-[9px] text-wire/40 tracking-widest mt-1">SCROLL</div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{ opacity: heroOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-wire/0 via-wire/60 to-wire/0 scroll-line" />
        </motion.div>
      </section>

      {/* ── SERVICES / FEATURE HIGHLIGHTS ────────────────────── */}
      <section className="bg-ink py-28 px-6 md:px-10 relative overflow-hidden">
        {/* Subtle background particle layer */}
        <div className="absolute inset-0 opacity-40">
          <ParticleCanvas intensity="low" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealSection className="flex items-baseline gap-5 ruled-bottom pb-5 mb-16">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">02</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              What I <span className="text-hot">Do</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-wire/20">
            {services.map((s, i) => (
              <RevealSection key={s.num}>
                <motion.div
                  className="bg-ink group p-8 md:p-10 hover:bg-smoke transition-colors duration-300 cursor-default"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-[10px] text-ash tracking-widest">{s.num}</span>
                    <div className="w-8 h-px bg-hot/0 group-hover:bg-hot/80 transition-all duration-500 mt-2" />
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tighter text-paper mb-3 group-hover:text-hot transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="font-mono text-[10px] text-ash leading-relaxed max-w-sm">
                    {s.desc}
                  </p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────── */}
      <section className="bg-smoke py-28 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection className="flex items-baseline justify-between ruled-bottom pb-5 mb-14">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[10px] text-ash tracking-widest uppercase">03</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
                Featured <span className="text-hot">Work</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 font-mono text-[10px] text-ash hover:text-hot transition-colors uppercase tracking-widest"
            >
              All Projects <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </RevealSection>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Hero card */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/projects/${featured[0].id}`}
                className="group relative overflow-hidden bg-steel block aspect-[16/10]"
              >
                <img
                  src={featured[0].img}
                  alt={featured[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 font-mono text-[10px] text-wire/70 tracking-widest">{featured[0].num}</div>
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{featured[0].cat}</span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-paper">{featured[0].title}</h3>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-hot/0 border-r-hot/0 group-hover:border-t-hot/20 group-hover:border-r-hot/20 transition-all duration-300" />
              </Link>
            </motion.div>

            {/* Right column */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <motion.div
                className="bg-steel p-8 flex-1 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <span className="font-mono text-[10px] text-ash uppercase tracking-widest">Studio / About</span>
                <div>
                  <h4 className="font-display font-bold text-xl uppercase tracking-tight mb-3">Directed Intent</h4>
                  <p className="font-mono text-[10px] text-ash leading-relaxed">
                    Every frame is intentional. Visual experiences built to stop the scroll and leave a lasting impression.
                  </p>
                </div>
                <div className="flex gap-8 mt-6 pt-6 ruled-top">
                  {[['4+', 'Years'], ['50+', 'Projects'], ['∞', 'Frames']].map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display font-extrabold text-2xl text-hot leading-none">{n}</div>
                      <div className="font-mono text-[9px] text-ash uppercase tracking-widest mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.6 }}
              >
                <Link
                  to={`/projects/${featured[1].id}`}
                  className="group relative overflow-hidden bg-steel block aspect-video"
                >
                  <img src={featured[1].img} alt={featured[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{featured[1].cat}</span>
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight text-paper">{featured[1].title}</h3>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom row */}
            {[featured[2], featured[3]].map((p, i) => (
              <motion.div
                key={p.id}
                className="md:col-span-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/projects/${p.id}`}
                  className="group relative overflow-hidden bg-steel block aspect-video"
                >
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-wire/70 tracking-widest">{p.num}</div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{p.cat}</span>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight text-paper">{p.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWREEL ──────────────────────────────────────────── */}
      <section id="showreel" className="bg-ink py-24 px-6 md:px-10 relative overflow-hidden">
        <ParticleCanvas intensity="low" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealSection className="ruled-top pt-5 mb-8 flex items-baseline gap-5">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">04</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              Showreel <span className="text-hot">2025</span>
            </h2>
            <span className="font-mono text-[10px] text-ash uppercase tracking-widest ml-auto">Full Cut</span>
          </RevealSection>
          <RevealSection>
            <div className="border border-wire/40 overflow-hidden relative group">
              <CloudinaryVideo
                src="https://res.cloudinary.com/dqbzoeysr/video/upload/17_April_2026_1_midrie.mp4"
                title="Showreel 2025"
                autoPlay
                loop
                className="aspect-[4/3] w-full"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-smoke py-28 px-6 md:px-10 relative overflow-hidden">
        <ParticleCanvas intensity="low" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealSection className="flex items-baseline gap-5 ruled-bottom pb-5 mb-16">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">05</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              Client <span className="text-hot">Words</span>
            </h2>
          </RevealSection>

          {/* Active testimonial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
            <div className="lg:col-span-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`${i === active ? 'block' : 'hidden'}`}
                >
                  <p className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-paper leading-snug tracking-tight mb-10">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-hot flex items-center justify-center font-display font-bold text-sm text-ink flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm uppercase tracking-wide text-paper">{t.name}</div>
                      <div className="font-mono text-[10px] text-ash tracking-widest mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress + controls */}
            <div className="lg:col-span-4 flex flex-col gap-3 lg:pt-2">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group text-left p-5 border transition-all duration-300 ${
                    i === active
                      ? 'border-hot bg-ink'
                      : 'border-wire/40 hover:border-wire bg-ink/0 hover:bg-ink/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${i === active ? 'bg-hot' : 'bg-wire/60'}`} />
                    <span className="font-display font-bold text-sm uppercase tracking-tight text-paper">
                      {t.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-ash tracking-widest block ml-4">
                    {t.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px bg-wire/30 overflow-hidden">
            <motion.div
              className="h-full bg-hot"
              key={active}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-ink py-28 px-6 md:px-10 relative overflow-hidden">
        <ParticleCanvas intensity="medium" />

        {/* Large ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-display font-extrabold uppercase tracking-tighter text-wire/[0.04] select-none"
            style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', whiteSpace: 'nowrap' }}
          >
            LET'S WORK
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealSection className="ruled-top pt-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <span className="font-mono text-[10px] text-ash uppercase tracking-widest block mb-4">
                06 — Let's Work
              </span>
              <h2
                className="font-display font-extrabold uppercase tracking-tighter leading-[0.82]"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
              >
                Ready to<br />
                <span className="text-hot">Stand Out?</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 md:items-end">
              <p className="font-mono text-[10px] text-ash max-w-xs leading-relaxed md:text-right">
                Cinematic brand films, motion graphics, full video campaigns. Let's build something people can't ignore.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="group flex items-center gap-3 bg-hot text-ink px-10 py-5 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200"
                >
                  Start a Project
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://t.me/khalex3_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-wire hover:border-hot text-ash hover:text-hot px-6 py-5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                >
                  Telegram
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
