import { motion } from 'motion/react';
import { Download, Play, Zap, Film, Box, Brush, PenTool, Waves, Music, Code, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

function HeadshotPlaceholder() {
  return (
    <img
      src="/assets/pfp.png"
      alt="Khalex"
      className="w-full h-full object-cover object-top"
    />
  );
}

export default function About() {
  return (
    <main className="pt-32 min-h-screen bg-mesh overflow-hidden shutter-entrance">
      {/* Hero Section / Narrative */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Headshot Column */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative overflow-hidden rounded-md bg-surface-low aspect-[4/5]">
              <HeadshotPlaceholder />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block">
              <div className="bg-surface-high p-6 rounded-md border border-outline-variant/10 backdrop-blur-md">
                <span className="text-primary font-headline text-4xl font-black block leading-none">4+</span>
                <span className="text-on-surface-variant text-xs uppercase tracking-[0.2em] font-body">Years Creating</span>
              </div>
            </div>
          </div>

          {/* Story Column */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            <span className="text-secondary font-body text-xs uppercase tracking-[0.4em] mb-4 block">The Story</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
              Motion Designer. <span className="text-primary text-glow-primary italic">Video</span> Editor. Storyteller.
            </h1>
            <div className="space-y-6 max-w-2xl">
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                I'm Khalex — a Nigeria-based motion designer and video editor who builds visual content that actually works. From cinematic brand films and motion graphics to fast-turnaround social content, I bring ideas to life through deliberate craft and sharp execution.
              </p>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                I run a daily YouTube channel, work with brands and creators across industries, and am building a full-service video editing agency. My work sits at the intersection of storytelling, design, and execution — content that doesn't just look good, it performs.
              </p>
              <div className="pt-8 flex flex-wrap gap-4">
                <button
                  disabled
                  className="inline-flex items-center gap-3 bg-white/20 text-white/40 px-8 py-4 rounded-sm font-headline font-bold uppercase tracking-widest text-sm cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
                <a
                  href="/"
                  className="inline-flex items-center gap-3 border border-outline-variant/30 px-8 py-4 rounded-sm font-headline font-bold uppercase tracking-widest text-sm hover:border-secondary hover:text-secondary transition-all"
                >
                  <Play className="w-5 h-5" />
                  View Reel
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Arsenal */}
      <section className="bg-surface-low py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-white mb-2">Technical Arsenal</h2>
            <p className="text-on-surface-variant font-body">The tools I use daily to produce content that stands out.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="md:col-span-2 lg:col-span-2 bg-surface-high p-8 rounded-md flex flex-col justify-between aspect-square md:aspect-auto group hover:bg-surface-highest transition-colors">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-sm">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">After Effects</h3>
                <p className="text-on-surface-variant text-sm font-body">Motion graphics, VFX compositing, and dynamic typography for brand and Web3 content.</p>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-2 bg-surface-high p-8 rounded-md flex flex-col justify-between group hover:bg-surface-highest transition-colors">
              <div className="bg-secondary/10 w-12 h-12 flex items-center justify-center rounded-sm">
                <Film className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Premiere Pro</h3>
                <p className="text-on-surface-variant text-sm font-body">Video editing, color grading, and fast-turnaround content production.</p>
              </div>
            </div>
            <div className="md:col-span-4 lg:col-span-2 bg-surface-high p-8 rounded-md flex flex-col justify-between aspect-square md:aspect-auto group hover:bg-surface-highest transition-colors border-2 border-primary/20">
              <div className="bg-primary/20 w-12 h-12 flex items-center justify-center rounded-sm">
                <Box className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Cinema 4D</h3>
                <p className="text-on-surface-variant text-sm font-body">Cinematic visuals, 3D elements, and high-fidelity renders for premium content.</p>
              </div>
            </div>
            {[
              { name: 'Photoshop', icon: Brush },
              { name: 'Illustrator', icon: PenTool },
              { name: 'DaVinci', icon: Waves },
              { name: 'Audition', icon: Music },
              { name: 'Lottie', icon: Code },
              { name: 'Expressions', icon: Terminal }
            ].map((tool) => (
              <div key={tool.name} className="bg-surface-highest p-6 rounded-md flex items-center gap-4">
                <tool.icon className="w-5 h-5 text-on-surface-variant" />
                <span className="font-headline font-bold text-sm tracking-widest uppercase">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-white sticky top-40">Timeline of <br/><span className="text-secondary italic">My Journey</span></h2>
            </div>
            <div className="md:w-2/3 space-y-16">
              {[
                { date: '2023 — Present', role: 'Motion Designer & Content Strategist', desc: 'Creating motion graphics, brand videos, and social content for clients across industries. Building a video editing agency while growing a personal brand across YouTube and social platforms.', color: 'bg-primary' },
                { date: '2021 — 2023', role: 'Freelance Video Editor & Motion Designer', desc: 'Built a client base producing motion graphics, brand videos, and cinematic content for creators and businesses across Africa and globally.', color: 'bg-secondary' },
                { date: '2020 — 2021', role: 'Self-Taught Motion Designer', desc: 'Started with DaVinci Resolve and After Effects, learning the craft through obsessive practice, tutorials, and real-world client work.', color: 'bg-outline-variant' }
              ].map((item) => (
                <div key={item.date} className="relative pl-12 border-l border-outline-variant/20">
                  <div className={cn("absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full", item.color)}></div>
                  <span className={cn("font-headline font-bold tracking-widest uppercase text-sm", item.color.replace('bg-', 'text-'))}>{item.date}</span>
                  <h4 className="text-2xl font-bold text-white mt-2 mb-4">{item.role}</h4>
                  <p className="text-on-surface-variant font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
