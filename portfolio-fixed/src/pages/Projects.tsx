import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const projects = [
  {
    id: 'cyberpunk-neon-noir',
    num: '001',
    title: 'Cyberpunk Neon Noir',
    category: 'Commercials',
    img: '/assets/projects/cyberpunk-neon-noir.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[21/9]',
  },
  {
    id: 'glitch-protocol',
    num: '002',
    title: 'Glitch Protocol',
    category: 'Motion Graphics',
    img: '/assets/projects/glitch-protocol.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-square',
  },
  {
    id: 'silent-echoes',
    num: '003',
    title: 'Silent Echoes',
    category: 'Short Films',
    img: '/assets/projects/silent-echoes.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'april-reel-2026',
    num: '004',
    title: 'April Reel 2026',
    category: 'Commercials',
    img: undefined,
    videoUrl: 'https://res.cloudinary.com/dqbzoeysr/video/upload/3_April_2026_2_wanekk.mp4' as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'liquid-flow-v02',
    num: '005',
    title: 'Liquid Flow V.02',
    category: 'Personal Projects',
    img: '/assets/projects/liquid-flow-v02.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 'the-analog-archive',
    num: '006',
    title: 'The Analog Archive',
    category: 'Short Films',
    img: '/assets/projects/analog-archive.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video',
  },
];

const filters = ['All', 'Motion Graphics', 'Commercials', 'Short Films', 'Personal Projects'];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="pt-28 pb-20 px-6 md:px-10 page-enter">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">Work</span>
            <span className="w-5 h-px bg-wire" />
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Curated<br />
            <span className="text-hot">Framework</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="font-mono text-[10px] text-ash max-w-md leading-relaxed mb-10"
          >
            Selected motion work, brand content, and visual projects built to stop the scroll and move audiences.
          </motion.p>

          {/* Filter tabs */}
          <div className="ruled-top pt-5 flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 ${
                  active === f
                    ? 'bg-hot text-ink'
                    : 'text-ash border border-wire hover:border-paper/30 hover:text-paper'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {filtered.map((project) =>
            project.videoUrl ? (
              /* ── VIDEO CARD: same Link wrapper as image cards, native video as bg ── */
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`${project.span} group relative overflow-hidden bg-smoke ${project.aspect} block`}
              >
                <video
                  src={project.videoUrl}
                  poster={project.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Dark overlay on hover — identical to image cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Index number */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-wire/70 tracking-widest">
                  {project.num}
                </div>
                {/* Details: slide up on hover — identical to image cards */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-paper">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ) : (
              /* ── IMAGE CARD ── */
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`${project.span} group relative overflow-hidden bg-smoke ${project.aspect}`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  src={project.img}
                  alt={project.title}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Index number */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-wire/70 tracking-widest">
                  {project.num}
                </div>
                {/* Details: slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-mono text-[10px] text-hot uppercase tracking-[0.3em] block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-paper">
                    {project.title}
                  </h3>
                </div>
              </Link>
            )
          )}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32 font-mono text-[10px] text-ash uppercase tracking-widest">
            No projects in this category yet.
          </div>
        )}

        {/* Footer row */}
        <div className="mt-14 ruled-top pt-6 flex justify-between items-center">
          <span className="font-mono text-[10px] text-wire uppercase tracking-widest">
            Showing {filtered.length} of {projects.length}
          </span>
          <button className="group flex items-center gap-3 font-mono text-[10px] text-ash hover:text-hot uppercase tracking-widest transition-colors">
            More coming soon
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}
