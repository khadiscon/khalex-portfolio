import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import CloudinaryVideo from '../components/CloudinaryVideo';

function scrollToShowreel() {
  document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
}

const featured = [
  {
    id: 'cyberpunk-neon-noir',
    num: '001',
    title: 'Neon Fluidity',
    cat: '3D Motion / Branding',
    img: '/assets/projects/neon-fluidity.png',
  },
  {
    id: 'glitch-protocol',
    num: '002',
    title: 'FUI Design',
    cat: 'Motion Graphics',
    img: '/assets/projects/fui-design.png',
  },
  {
    id: 'silent-echoes',
    num: '003',
    title: 'Glitch FX',
    cat: 'Visual Effects',
    img: '/assets/projects/glitch-fx.png',
  },
  {
    id: 'liquid-flow-v02',
    num: '004',
    title: 'Minimal Motion',
    cat: 'Personal Project',
    img: '/assets/projects/minimal-motion.png',
  },
];

export default function Home() {
  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0">
          <img
            src="/assets/projects/hero-bg.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        </div>

        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-5 h-px bg-hot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-hot">
              Showreel 2025
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 110 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
            >
              Crafting
              <br />
              <span className="text-hot italic">Motion.</span>
            </motion.h1>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45 }}
            className="flex flex-wrap items-center gap-5 mt-10"
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
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ash hover:text-paper transition-colors duration-200"
            >
              <span className="w-8 h-8 border border-wire flex items-center justify-center hover:border-hot transition-colors">
                <ArrowDown className="w-3 h-3" />
              </span>
              Watch Showreel
            </button>
          </motion.div>
        </div>

        {/* Scroll index */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute top-24 right-6 md:right-10 font-mono text-[10px] text-wire tracking-widest"
        >
          01 / 04
        </motion.div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="bg-ink py-28 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="flex items-baseline justify-between ruled-bottom pb-5 mb-14">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[10px] text-ash tracking-widest uppercase">02</span>
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
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Main large card */}
            <Link
              to={`/projects/${featured[0].id}`}
              className="md:col-span-7 group relative overflow-hidden bg-smoke aspect-[16/10]"
            >
              <img
                src={featured[0].img}
                alt={featured[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] text-wire/70 tracking-widest">{featured[0].num}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{featured[0].cat}</span>
                <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-paper">{featured[0].title}</h3>
              </div>
            </Link>

            {/* Right col: stat card + small image */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="bg-steel p-8 flex-1 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-ash uppercase tracking-widest">Studio / About</span>
                <div>
                  <h4 className="font-display font-bold text-xl uppercase tracking-tight mb-2">Directed Intent</h4>
                  <p className="font-mono text-[10px] text-ash leading-relaxed">
                    Every frame is intentional. Visual experiences built to stop the scroll and leave a lasting impression.
                  </p>
                </div>
                <div className="flex gap-8 mt-6">
                  {[['4+', 'Years'], ['50+', 'Projects'], ['∞', 'Frames']].map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display font-extrabold text-2xl text-hot leading-none">{n}</div>
                      <div className="font-mono text-[9px] text-ash uppercase tracking-widest mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to={`/projects/${featured[1].id}`}
                className="group relative overflow-hidden bg-smoke aspect-video"
              >
                <img
                  src={featured[1].img}
                  alt={featured[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{featured[1].cat}</span>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight text-paper">{featured[1].title}</h3>
                </div>
              </Link>
            </div>

            {/* Bottom two */}
            {[featured[2], featured[3]].map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="md:col-span-6 group relative overflow-hidden bg-smoke aspect-video"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 font-mono text-[10px] text-wire/70 tracking-widest">{p.num}</div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">{p.cat}</span>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-paper">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWREEL ── */}
      <section id="showreel" className="bg-smoke py-24 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="ruled-top pt-5 mb-8 flex items-baseline gap-5">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">03</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter">
              Showreel <span className="text-hot">2025</span>
            </h2>
            <span className="font-mono text-[10px] text-ash uppercase tracking-widest">Full Cut</span>
          </div>
          <div className="border border-wire overflow-hidden">
            <CloudinaryVideo
              src="https://res.cloudinary.com/dqbzoeysr/video/upload/17_April_2026_1_midrie.mp4"
              title="Showreel 2025"
              autoPlay
              loop
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink py-28 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="ruled-top pt-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <span className="font-mono text-[10px] text-ash uppercase tracking-widest block mb-4">
                04 — Let's Work
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
              <Link
                to="/contact"
                className="group flex items-center gap-3 bg-hot text-ink px-10 py-5 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200 self-start"
              >
                Start a Project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
