import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Zap, Film, Box, Layers, Monitor, Play } from 'lucide-react';
import CloudinaryVideo from '../components/CloudinaryVideo';

// ── Project data ──────────────────────────────────────────────────────────────
const allProjects: Record<string, {
  title: string; category: string; year: string; role: string; tools: string[];
  heroImg?: string; images?: string[]; videoUrl?: string;
  challenge: string;
  process: { title: string; icon: typeof Zap; desc: string }[];
  results: string;
  nextId: string; nextTitle: string;
}> = {
  'cyberpunk-neon-noir': {
    title: 'Cyberpunk Neon Noir',
    category: 'Commercials',
    year: '2024',
    role: 'Director / Motion Designer',
    tools: ['After Effects', 'Cinema 4D', 'Octane Render', 'Premiere Pro'],
    heroImg: '/assets/projects/cyberpunk-neon-noir.png',
    images: ['/assets/projects/cyberpunk-neon-noir.png'],
    videoUrl: undefined,
    challenge: 'Concept-to-final motion piece capturing a neon-drenched, high-contrast aesthetic built for a futuristic brand launch. Every frame needed to feel like a frame from a film — not a social post.',
    process: [
      { title: 'Concept', icon: Box,     desc: 'Moodboard-driven direction pulling from cyberpunk cinema, brutalist typography, and neon photography.' },
      { title: 'Build',   icon: Zap,     desc: 'Cinema 4D base geometry with Octane lighting — layered neon glow passes rendered in separate AOVs.' },
      { title: 'Post',    icon: Layers,  desc: 'AE compositing with lens flares, chromatic aberration, film grain, and tempo-synced cuts.' },
    ],
    results: 'Delivered in 3 days. Client extended scope to a full 3-piece motion campaign after viewing the first edit.',
    nextId: 'glitch-protocol',
    nextTitle: 'Glitch Protocol',
  },
  'glitch-protocol': {
    title: 'Glitch Protocol',
    category: 'Motion Graphics',
    year: '2024',
    role: 'Motion Designer / Editor',
    tools: ['After Effects', 'Premiere Pro', 'Audition'],
    heroImg: '/assets/projects/glitch-protocol.png',
    images: ['/assets/projects/glitch-protocol.png'],
    videoUrl: undefined,
    challenge: 'Creating a visual language for a tech brand built entirely around controlled distortion — glitch, pixel-shift, and signal decay turned into intentional design elements rather than noise.',
    process: [
      { title: 'Language', icon: Layers, desc: 'Defined a glitch dictionary: RGB splits, scan lines, block displacement, and signal loss sequences.' },
      { title: 'Rhythm',   icon: Zap,   desc: 'Beat-synced glitch triggers keyed to the audio track for a punchy, percussive feel.' },
      { title: 'Render',   icon: Film,  desc: 'Exported multi-format — 16:9, 9:16, and 1:1 — for full platform coverage.' },
    ],
    results: 'Used as the brand\'s main reveal video at their product launch event. Achieved 200K+ organic views in the first week.',
    nextId: 'silent-echoes',
    nextTitle: 'Silent Echoes',
  },
  'silent-echoes': {
    title: 'Silent Echoes',
    category: 'Short Films',
    year: '2023',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Audition'],
    heroImg: '/assets/projects/silent-echoes.png',
    images: ['/assets/projects/silent-echoes.png'],
    videoUrl: undefined,
    challenge: 'A self-directed short exploring the emotional weight of silence. The challenge was building tension and atmosphere purely through visual rhythm and sound design — no dialogue, no exposition.',
    process: [
      { title: 'Edit',   icon: Film,    desc: 'Non-linear timeline structure designed to mirror the fractured mental state of the subject.' },
      { title: 'Grade',  icon: Monitor, desc: 'Desaturated teal-and-orange grade with heavy vignetting and soft contrast curves.' },
      { title: 'Sound',  icon: Layers,  desc: 'Custom sound design — ambient layering, reversed foley, and atonal drone beds built in Audition.' },
    ],
    results: 'Selected for a regional short film showcase. Opened two DM conversations from directors looking for editor-collaborators.',
    nextId: 'april-reel-2026',
    nextTitle: 'April Reel 2026',
  },
  'april-reel-2026': {
    title: 'April Reel 2026',
    category: 'Commercials',
    year: '2026',
    role: 'Director / Editor',
    tools: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
    heroImg: undefined,
    images: [],
    videoUrl: 'https://res.cloudinary.com/dqbzoeysr/video/upload/3_April_2026_2_wanekk.mp4',
    challenge: 'Monthly showreel cut for April 2026 — condensing a month of client work, personal experiments, and motion samples into a punchy 90-second reel that sells the range without losing focus.',
    process: [
      { title: 'Select', icon: Layers, desc: 'Curated from 30+ clips — only frames that showed technique, variety, or raw quality made the cut.' },
      { title: 'Pace',   icon: Zap,   desc: 'Tempo-mapped edit: fast cuts in the intro, sustained shots mid-reel, hard-close at the end.' },
      { title: 'Sound',  icon: Film,  desc: 'Licensed track selected for energy curve — builds into the drop, fades hard on the logo lock-up.' },
    ],
    results: 'Shared to X (@khalex3_0) and Telegram. Generated 3 inbound client conversations within 72 hours of posting.',
    nextId: 'liquid-flow-v02',
    nextTitle: 'Liquid Flow V.02',
  },
  'liquid-flow-v02': {
    title: 'Liquid Flow V.02',
    category: 'Personal Projects',
    year: '2023',
    role: 'Solo Creative / Motion Designer',
    tools: ['Cinema 4D', 'Octane', 'After Effects'],
    heroImg: '/assets/projects/liquid-flow-v02.png',
    images: ['/assets/projects/liquid-flow-v02.png'],
    videoUrl: undefined,
    challenge: 'Pure exploration — fluid simulation studying organic motion against geometric precision. No client brief, no deadline. Just craft and curiosity, pushed as far as the hardware allowed.',
    process: [
      { title: 'Sim',   icon: Box,    desc: 'X-Particles fluid simulation with custom turbulence fields and collision geometry.' },
      { title: 'Light', icon: Zap,    desc: 'HDRI-driven Octane lighting with caustic ray tracing and multi-pass rendering.' },
      { title: 'Post',  icon: Layers, desc: 'Chromatic aberration, film grain, and subtle lens bloom layered in AE post.' },
    ],
    results: 'Shared on socials — 40K+ organic impressions. Two unsolicited client inquiries for similar aesthetic work within the week.',
    nextId: 'the-analog-archive',
    nextTitle: 'The Analog Archive',
  },
  'the-analog-archive': {
    title: 'The Analog Archive',
    category: 'Short Films',
    year: '2022',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    heroImg: '/assets/projects/analog-archive.png',
    images: ['/assets/projects/analog-archive.png'],
    videoUrl: undefined,
    challenge: 'Preserving the warmth and texture of analogue film while assembling a documentary from archival footage spanning five decades — maintaining authenticity without losing visual cohesion.',
    process: [
      { title: 'Archive',   icon: Layers,  desc: 'Catalogued and digitised 200+ hours of super-8 and 16mm footage from multiple sources.' },
      { title: 'Structure', icon: Film,    desc: 'Three-act narrative built from interview transcripts and archival photograph sequencing.' },
      { title: 'Grade',     icon: Monitor, desc: 'Film emulation grade preserving gate weave, grain, and natural colour decay.' },
    ],
    results: 'Premiered at a regional documentary festival. Now distributed across three streaming platforms.',
    nextId: 'cyberpunk-neon-noir',
    nextTitle: 'Cyberpunk Neon Noir',
  },
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = (id && allProjects[id]) ? allProjects[id] : allProjects['cyberpunk-neon-noir'];

  const hasVideo = !!project.videoUrl;
  const hasImages = project.images && project.images.length > 0;

  return (
    <main className="page-enter">
      {/* ── HERO ── */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          {hasVideo ? (
            <video
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : project.heroImg ? (
            <img
              className="w-full h-full object-cover"
              src={project.heroImg}
              alt={project.title}
            />
          ) : (
            <div className="w-full h-full bg-steel" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        </div>

        <div className="relative z-10 px-6 md:px-10 w-full max-w-[1600px] mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-ash hover:text-hot uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Work
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-hot" />
            <span className="font-mono text-[10px] text-hot uppercase tracking-[0.35em]">
              {project.category} — {project.year}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* ── META ── */}
      <section className="py-20 px-6 md:px-10 bg-ink">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-steel p-6 border-l-2 border-hot">
              <div className="font-mono text-[9px] text-hot uppercase tracking-[0.35em] mb-2">Directed by</div>
              <div className="font-display font-bold text-xl uppercase">Khalex</div>
              <div className="font-mono text-[9px] text-ash mt-1">{project.role}</div>
            </div>

            <div>
              <div className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] mb-3">Technical Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-wire px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-fog"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Challenge text */}
          <div className="lg:col-span-8">
            <div className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] mb-5">The Challenge</div>
            <p className="font-display font-bold text-2xl md:text-3xl text-paper/90 leading-snug">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* ── VISUAL SHOWCASE ── */}
      <section className="bg-smoke py-16 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto space-y-3">
          {/* Video if available */}
          {hasVideo && (
            <div className="w-full overflow-hidden border border-wire">
              <CloudinaryVideo
                src={project.videoUrl!}
                poster={project.heroImg}
                title={project.title}
                autoPlay
                loop
                className="aspect-[16/9] w-full"
              />
            </div>
          )}

          {/* Image gallery */}
          {hasImages && (
            <div className={`grid gap-3 ${project.images!.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {project.images!.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden bg-steel group"
                >
                  <img
                    src={img}
                    alt={`${project.title} — frame ${i + 1}`}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ aspectRatio: i === 0 && project.images!.length === 1 ? '16/9' : '4/3' }}
                  />
                  {/* No description on image cards — as requested */}
                </div>
              ))}
            </div>
          )}

          {/* Fallback if neither */}
          {!hasVideo && !hasImages && (
            <div className="aspect-video w-full bg-steel flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-wire">
                <Play className="w-8 h-8" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Visual coming soon</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CREATIVE PROCESS ── */}
      <section className="py-28 px-6 md:px-10 bg-ink">
        <div className="max-w-[1600px] mx-auto">
          <div className="ruled-bottom pb-5 mb-14 flex items-baseline gap-5">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">Process</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tighter">
              How It <span className="text-hot italic">Happened</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.process.map((step, i) => (
              <div key={step.title} className="bg-steel p-8 border-t-2 border-wire hover:border-hot transition-colors duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <step.icon className="w-5 h-5 text-ash group-hover:text-hot transition-colors" />
                  <span className="font-mono text-[10px] text-wire tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="font-display font-bold text-xl uppercase tracking-tight mb-3">{step.title}</h4>
                <p className="font-mono text-[10px] text-ash leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-28 bg-smoke px-6 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[9px] text-hot uppercase tracking-[0.35em] mb-6">The Results</div>
          <p className="font-display font-extrabold text-2xl md:text-4xl text-paper leading-snug">
            "{project.results}"
          </p>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <Link
        to={`/projects/${project.nextId}`}
        className="group flex flex-col items-center justify-center py-24 border-t border-wire bg-ink hover:bg-smoke transition-colors duration-300"
      >
        <span className="font-mono text-[10px] text-ash uppercase tracking-widest mb-3">Next Project</span>
        <h2
          className="font-display font-extrabold uppercase tracking-tighter text-paper group-hover:text-hot transition-colors duration-300 text-center"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
        >
          {project.nextTitle}
        </h2>
        <div className="mt-6 w-8 h-8 border border-wire group-hover:border-hot flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-ash group-hover:text-hot transition-colors group-hover:translate-x-0.5 duration-200" />
        </div>
      </Link>
    </main>
  );
}
