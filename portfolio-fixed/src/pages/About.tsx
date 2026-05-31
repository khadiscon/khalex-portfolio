import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Film, Box, Brush, PenTool, Waves, Music, Code, Terminal, ArrowRight } from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';

const tools = [
  { name: 'After Effects', desc: 'Motion graphics, VFX compositing, and dynamic typography for brand and Web3 content.', icon: Zap,      highlight: true  },
  { name: 'Premiere Pro',  desc: 'Video editing, color grading, and fast-turnaround content production.',                icon: Film,     highlight: false },
  { name: 'Cinema 4D',     desc: 'Cinematic 3D visuals, high-fidelity renders, and premium content.',                    icon: Box,      highlight: true  },
  { name: 'Photoshop',     desc: '',                                                                                      icon: Brush,    highlight: false },
  { name: 'Illustrator',   desc: '',                                                                                      icon: PenTool,  highlight: false },
  { name: 'DaVinci',       desc: '',                                                                                      icon: Waves,    highlight: false },
  { name: 'Audition',      desc: '',                                                                                      icon: Music,    highlight: false },
  { name: 'Lottie',        desc: '',                                                                                      icon: Code,     highlight: false },
  { name: 'Expressions',   desc: '',                                                                                      icon: Terminal, highlight: false },
];

const timeline = [
  {
    date: '2023 — Present',
    role: 'Motion Designer & Content Strategist',
    desc: 'Creating motion graphics, brand videos, and social content for clients across industries. Building a video editing agency while growing a personal brand across YouTube and social platforms.',
    accent: 'text-hot',
    dot: 'bg-hot',
  },
  {
    date: '2021 — 2023',
    role: 'Freelance Video Editor & Motion Designer',
    desc: 'Built a client base producing motion graphics, brand videos, and cinematic content for creators and businesses across Africa and globally.',
    accent: 'text-paper/70',
    dot: 'bg-paper/40',
  },
  {
    date: '2020 — 2021',
    role: 'Self-Taught Motion Designer',
    desc: 'Started with DaVinci Resolve and After Effects — learning the craft through obsessive practice, tutorials, and real-world client work.',
    accent: 'text-ash',
    dot: 'bg-wire',
  },
];

function RevealItem({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <main className="pt-28 min-h-screen page-enter">

      {/* ── HERO ── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-smoke">
              <img src="/assets/pfp.png" alt="Khalex" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 md:right-0 bg-hot p-5">
              <span className="font-display font-extrabold text-3xl text-ink block leading-none">4+</span>
              <span className="font-mono text-[9px] text-ink/70 uppercase tracking-[0.25em]">Years</span>
            </div>
          </motion.div>

          {/* Story */}
          <div className="lg:col-span-7 lg:pt-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-hot" />
              <span className="font-mono text-[10px] text-hot uppercase tracking-[0.35em]">The Story</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper mb-7"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Motion Is My<br />
              <span className="text-hot italic">Language.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-[10px] text-ash leading-relaxed max-w-lg mb-6"
            >
              I'm Khalex — a self-taught motion designer from Lagos, Nigeria. I've spent the last 4+ years obsessing over the craft: learning After Effects from scratch, mastering Cinema 4D, and building a freelance client base across Africa and globally.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="font-mono text-[10px] text-ash leading-relaxed max-w-lg mb-10"
            >
              I don't just edit video. I craft experiences — kinetic, cinematic, intentional. Every project is a chance to push the boundary between brand communication and visual art.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.5 }}
              className="flex gap-10 ruled-top pt-7"
            >
              {[['4+', 'Years Active'], ['50+', 'Projects'], ['3', 'Continents'], ['∞', 'Frames']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-extrabold text-3xl text-hot leading-none">{n}</div>
                  <div className="font-mono text-[9px] text-ash uppercase tracking-widest mt-1.5">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-smoke py-24 px-6 md:px-10 relative overflow-hidden">
        <ParticleCanvas intensity="low" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealItem className="flex items-baseline gap-5 ruled-bottom pb-5 mb-14">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">02</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              The <span className="text-hot">Journey</span>
            </h2>
          </RevealItem>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <RevealItem key={i} delay={i * 0.1} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 ruled-bottom last:border-0">
                <div className="md:col-span-3 flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.dot}`} />
                  <span className="font-mono text-[10px] text-ash tracking-widest">{item.date}</span>
                </div>
                <div className="md:col-span-9">
                  <h3 className={`font-display font-bold text-xl uppercase tracking-tight mb-3 ${item.accent}`}>{item.role}</h3>
                  <p className="font-mono text-[10px] text-ash leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="bg-ink py-24 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <RevealItem className="flex items-baseline gap-5 ruled-bottom pb-5 mb-14">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">03</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              The <span className="text-hot">Stack</span>
            </h2>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-wire/20">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <RevealItem key={tool.name} delay={i * 0.05}>
                  <div className={`p-7 group hover:bg-smoke transition-colors duration-300 ${tool.highlight ? 'bg-steel' : 'bg-ink'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-4 h-4 ${tool.highlight ? 'text-hot' : 'text-ash'} group-hover:text-hot transition-colors`} />
                      <span className="font-display font-bold text-base uppercase tracking-tight text-paper group-hover:text-hot transition-colors">
                        {tool.name}
                      </span>
                      {tool.highlight && (
                        <span className="ml-auto font-mono text-[8px] text-hot border border-hot/30 px-1.5 py-0.5 tracking-widest">CORE</span>
                      )}
                    </div>
                    {tool.desc && (
                      <p className="font-mono text-[10px] text-ash leading-relaxed">{tool.desc}</p>
                    )}
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-smoke py-20 px-6 md:px-10 relative overflow-hidden">
        <ParticleCanvas intensity="low" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <RevealItem className="ruled-top pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tighter mb-2">
                Want to <span className="text-hot">Collaborate?</span>
              </h2>
              <p className="font-mono text-[10px] text-ash">Let's build something people can't ignore.</p>
            </div>
            <Link
              to="/contact"
              className="group flex items-center gap-3 bg-hot text-ink px-10 py-5 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200 flex-shrink-0"
            >
              Get In Touch
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealItem>
        </div>
      </section>
    </main>
  );
}
