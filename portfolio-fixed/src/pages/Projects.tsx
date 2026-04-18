import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CloudinaryVideo from '../components/CloudinaryVideo';

// ─────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR CLOUDINARY VIDEOS
// Set videoUrl on any project to play it inline on the card.
// Format: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4'
// The img field is used as the poster/thumbnail.
// Leave videoUrl as undefined to keep it as an image card.
// ─────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'cyberpunk-neon-noir',
    title: 'CYBERPUNK NEON NOIR',
    category: 'Commercials',
    img: '/assets/projects/cyberpunk-neon-noir.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[21/9]',
  },
  {
    id: 'glitch-protocol',
    title: 'GLITCH PROTOCOL',
    category: 'Motion Graphics',
    img: '/assets/projects/glitch-protocol.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-square',
  },
  {
    id: 'silent-echoes',
    title: 'SILENT ECHOES',
    category: 'Short Films',
    img: '/assets/projects/silent-echoes.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'april-reel-2026',
    title: 'APRIL REEL 2026',
    category: 'Commercials',
    img: '/assets/projects/april-reel-2026.png',
    videoUrl: 'https://res.cloudinary.com/dqbzoeysr/video/upload/3_April_2026_2_wanekk.mp4' as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'liquid-flow-v02',
    title: 'LIQUID FLOW V.02',
    category: 'Personal Projects',
    img: '/assets/projects/liquid-flow-v02.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 'the-analog-archive',
    title: 'THE ANALOG ARCHIVE',
    category: 'Short Films',
    img: '/assets/projects/analog-archive.png',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video',
  },
];

const filters = ['All Work', 'Motion Graphics', 'Commercials', 'Short Films', 'Personal Projects'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Work');

  const filtered =
    activeFilter === 'All Work' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <main className="pt-32 pb-20 px-8 lg:pl-28 lg:pr-16 shutter-entrance">
      <header className="mb-16 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
        >
          CURATED<br />
          <span className="text-primary">FRAMEWORK</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant text-lg max-w-2xl mb-12"
        >
          Selected motion work, brand content, and visual projects — built to stop the scroll and move audiences.
        </motion.p>

        <div className="flex flex-wrap gap-4 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-xs uppercase tracking-widest font-bold rounded-sm transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-black'
                  : 'border border-outline-variant/20 text-on-surface-variant hover:text-secondary hover:border-secondary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {filtered.map((project) =>
          project.videoUrl ? (
            // ── VIDEO CARD — plays inline ──
            <div
              key={project.id}
              className={`${project.span} group relative overflow-hidden rounded-md bg-surface-low ${project.aspect}`}
            >
              <CloudinaryVideo
                src={project.videoUrl}
                poster={project.img}
                title={project.title}
                autoPlay
                loop
                className="w-full h-full"
              />
              {/* Title overlay — sits above video but below controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-12 pointer-events-none">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ) : (
            // ── IMAGE CARD — navigates to detail page ──
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`${project.span} group relative overflow-hidden rounded-md bg-surface-low ${project.aspect}`}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                src={project.img}
                alt={project.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-10 h-10 text-white fill-current" />
              </div>
            </Link>
          )
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 text-on-surface-variant font-headline text-xl uppercase tracking-widest">
          No projects in this category yet.
        </div>
      )}

      <div className="mt-20 flex justify-center">
        <button className="group flex items-center gap-4 text-on-surface-variant hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-[0.5em] font-bold">Discover More Works</span>
          <span className="w-12 h-[1px] bg-outline-variant group-hover:bg-primary transition-all duration-300" />
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
