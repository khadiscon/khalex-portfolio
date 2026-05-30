import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Zap, Film, Box, Brush, PenTool, Waves, Music, Code, Terminal } from 'lucide-react';

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

export default function About() {
  return (
    <main className="pt-28 min-h-screen page-enter">
      {/* ── HERO ── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-smoke">
              <img
                src="/assets/pfp.png"
                alt="Khalex"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            {/* Hot badge */}
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
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Motion<br />
              Designer.<br />
              <span className="text-hot italic">Storyteller.</span>
            </motion.h1>

            <div className="space-y-4 max-w-xl">
              <p className="font-mono text-[10px] text-ash leading-relaxed">
                I'm Khalex — a Nigeria-based motion designer and video editor who builds visual content that actually works. From cinematic brand films and motion graphics to fast-turnaround social content, I bring ideas to life through deliberate craft and sharp execution.
              </p>
              <p className="font-mono text-[10px] text-ash leading-relaxed">
                I run a daily YouTube channel, work with brands and creators across industries, and am building a full-service video editing agency. My work sits at the intersection of storytelling, design, and execution — content that doesn't just look good, it performs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 ruled-top pt-7">
              <a
                href="/#showreel"
                className="group flex items-center gap-3 bg-hot text-ink px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200"
              >
                <Play className="w-3.5 h-3.5" />
                Watch Reel
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-3 border border-wire hover:border-hot text-ash hover:text-hot px-8 py-4 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL ARSENAL ── */}
      <section className="bg-smoke py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="ruled-bottom pb-5 mb-12 flex items-baseline gap-5">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">02</span>
            <h2 className="font-display font-extrabold text-4xl uppercase tracking-tighter">
              Technical <span className="text-hot">Arsenal</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {/* Three feature cards */}
            {tools.slice(0, 3).map((tool) => (
              <div
                key={tool.name}
                className={`col-span-2 p-7 flex flex-col gap-5 ${
                  tool.highlight ? 'bg-steel border-l-2 border-hot' : 'bg-steel'
                }`}
              >
                <tool.icon className={`w-5 h-5 ${tool.highlight ? 'text-hot' : 'text-ash'}`} />
                <div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight">{tool.name}</h3>
                  <p className="font-mono text-[10px] text-ash leading-relaxed mt-1.5">{tool.desc}</p>
                </div>
              </div>
            ))}

            {/* Utility tiles */}
            {tools.slice(3).map((tool) => (
              <div key={tool.name} className="bg-iron p-5 flex items-center gap-3 col-span-1">
                <tool.icon className="w-3.5 h-3.5 text-ash flex-shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-fog">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-ink">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="ruled-bottom pb-5 mb-14 flex items-baseline gap-5">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">03</span>
            <h2 className="font-display font-extrabold text-4xl uppercase tracking-tighter">
              Timeline <span className="text-hot italic">of Journey</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {timeline.map((item, i) => (
              <div key={i} className="flex-1 border-l border-wire pl-6 pb-10 md:pb-0 md:pr-8">
                <div className={`w-2 h-2 -ml-[4.5px] mb-5 rounded-full ${item.dot}`} />
                <span className={`font-mono text-[10px] uppercase tracking-widest block mb-3 ${item.accent}`}>
                  {item.date}
                </span>
                <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-3 leading-tight">
                  {item.role}
                </h4>
                <p className="font-mono text-[10px] text-ash leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
