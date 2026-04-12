import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Zap, Box, Layers, Film, Cpu, Monitor, Clock } from 'lucide-react';
import CloudinaryVideo from '../components/CloudinaryVideo';

function AvatarPlaceholder() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="64" height="64" fill="#1f1f21"/>
      <circle cx="32" cy="26" r="14" fill="#b89fff" opacity="0.8"/>
      <ellipse cx="32" cy="56" rx="20" ry="14" fill="#b89fff" opacity="0.5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────
// CLOUDINARY SETUP
// For each project, set videoUrl to your Cloudinary video URL:
//   'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4'
//
// Cloudinary auto-generates a thumbnail from any video URL by swapping
// /video/upload/ → /video/upload/so_0/ and the extension to .jpg.
// If you have a custom poster image, set posterUrl too.
// Leave videoUrl as undefined to keep the static image layout.
// ─────────────────────────────────────────────────

const allProjects: Record<string, {
  title: string;
  category: string;
  year: string;
  role: string;
  tools: string[];
  heroImg: string;
  videoUrl?: string;
  posterUrl?: string;
  challenge: string;
  process: { title: string; icon: any; desc: string }[];
  results: string;
  nextId: string;
  nextTitle: string;
}> = {
  'cyberpunk-neon-noir': {
    title: 'CYBERPUNK NEON NOIR',
    category: 'Featured / Commercial',
    year: '2024',
    role: 'Creative Director / Motion Designer',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndl8J6tzbCZKz_8v9nPOoNkLKLeuLZdwbG7bGNfjdISmzTsxy9SzHGpyqpPSwF28rXenPs951C3jSXtjnGB6ySOSIleJRaE0GgUPY6qF5Ci5-IyNwNg6gsc-DVaBQHYUa54IFHrK-AqFrINZk9MSmsPVPoCqxfNcEpHPXQdoJcj7_lOQfJilp22ZB7NhfbwozDCM9GcPB7ctFd1gjUB34GrjkIoVtfwfjiHdI7JVomnlaqWQM5CEiMYBtS_4MehRE_RqZ6E6qTxg',
    videoUrl: undefined, // e.g. 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/cyberpunk_neon_noir.mp4'
    posterUrl: undefined,
    challenge: 'A high-stakes commercial project demanding a dark, neon-drenched visual identity. The challenge was to balance cinematic tension with brand clarity, producing a piece that felt both visceral and polished.',
    process: [
      { title: 'Concept', icon: Zap, desc: 'Deep dive into cyberpunk aesthetics and neon color theory.' },
      { title: 'Editing', icon: Film, desc: 'Precision cuts synced to custom sound design and score.' },
      { title: 'Grade', icon: Monitor, desc: 'Signature cyan/magenta duotone color grading pipeline.' }
    ],
    results: 'The spot exceeded delivery benchmarks and set a new aesthetic standard for the brand\'s motion library.',
    nextId: 'glitch-protocol',
    nextTitle: 'GLITCH PROTOCOL'
  },
  'glitch-protocol': {
    title: 'GLITCH PROTOCOL',
    category: 'Motion Graphics',
    year: '2024',
    role: 'Motion Designer / Creative Lead',
    tools: ['After Effects', 'Cinema 4D', 'Illustrator'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7OpRb1bi4w4uDLKdIMwo3u_KC2MUbFRgsWfxJEQ6_wlH8C4hJxsR0QGc2h-Niuy6DShyQxc-KdA0JWSPNtwrDF5ifFDT62RCImk82LSo6uXQoQwfcBccEfwUFnv6jOBuhG4D_9mF86xtQi0Wakist8VoYqVsqLUS7Wu1puL9Ja12KwNWQF-GQRa9KczwoOe0nyOyYa-bZFF880BFFEqsPFQxSOq4Fwvk8mURrzoTvLfiEt0agshZENh6aftTyOhK1Q5yMPLHjAl4',
    videoUrl: undefined,
    posterUrl: undefined,
    challenge: 'Create a glitch-art motion system that felt controlled and intentional, not chaotic. Every distortion had to serve the narrative rhythm rather than distract from it.',
    process: [
      { title: 'System', icon: Cpu, desc: 'Developed a reusable glitch expression library in After Effects.' },
      { title: 'Timing', icon: Clock, desc: 'Frame-by-frame sync of distortion events to audio transients.' },
      { title: 'Render', icon: Box, desc: 'Multi-pass Cinema 4D renders composited for maximum fidelity.' }
    ],
    results: 'Featured across digital platforms, the piece became a reference work for glitch aesthetics in the motion design community.',
    nextId: 'silent-echoes',
    nextTitle: 'SILENT ECHOES'
  },
  'silent-echoes': {
    title: 'SILENT ECHOES',
    category: 'Short Film',
    year: '2023',
    role: 'Director / Editor',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFT-Rpvn62wPkETLJY0Tvz7flZHk213m-arbqEnJZtwIkAl6CTatUEINCGqgRsrSICi0bb2tnMwCBXCiUn1pei2RzRT7k0TDQTj4DR1BoAp_TalBBz9NwsExbI0Q8GsSbRAkdjPAMQwHo-k19t32p1_Vty7kxixZUs90IIyMr9WcoZDKZqpLeGMqsq4MqRmH0x2s4aQpSKfS2dg5jI_bLlavd0u4HATe9FZxGMU659gYkUSuT4SHi2sv-3D9Op0NlYrn94QVanczM',
    videoUrl: undefined,
    posterUrl: undefined,
    challenge: 'A dialogue-free short film relying entirely on visual rhythm and sound design to carry an emotional arc. Every edit had to speak louder than words.',
    process: [
      { title: 'Story', icon: Layers, desc: 'Visual script developed through thumbnail storyboards only.' },
      { title: 'Edit', icon: Film, desc: 'Non-linear assembly with 3 distinct emotional acts.' },
      { title: 'Color', icon: Monitor, desc: 'Muted, desaturated grade with isolated warm highlight pops.' }
    ],
    results: 'Screened at two regional film festivals. Praised for its restraint and emotional authenticity.',
    nextId: 'velocity-x',
    nextTitle: 'VELOCITY X'
  },
  'velocity-x': {
    title: 'VELOCITY X',
    category: 'Commercial / Automotive',
    year: '2023',
    role: 'Lead Editor / Colorist',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABiz9NcrZXgg9QxhYO1ULDm-otBUviDw13sPM9-VPqMvoC0Dea93lk6KW8TBKtaC9Ysi2yuNP20jniqhChReIodFgU60ak6pMryH-ZbXd5RDYQiUg4PGGdpXpXwCszxxZATv-BYaLQYwC1GcEz1BOF4c7CVxKzzvNGReRqKx1aTFXFqAQxkgndg5y-CJD4razxFWV_Ha1lXzaEAnrrrh3BwHFXRT1zMs4ILYqPE9vrwx87dL_IFkTHc89xc-2VijmGAIcOshzWck0',
    videoUrl: undefined,
    posterUrl: undefined,
    challenge: 'Deliver a 60-second automotive spot that conveyed raw speed and mechanical beauty without a single CGI asset — pure in-camera motion and precision editing.',
    process: [
      { title: 'Prep', icon: Zap, desc: 'Pre-vis animatic locked before a single frame was shot.' },
      { title: 'Edit', icon: Film, desc: 'Sub-frame cutting to hit 24fps rhythm on every impact beat.' },
      { title: 'Grade', icon: Monitor, desc: 'High-contrast, cool-steel grade with selective saturation pulls.' }
    ],
    results: 'Delivered on time and under budget. Client reported a 34% increase in test-drive bookings in the first month post-launch.',
    nextId: 'liquid-flow-v02',
    nextTitle: 'LIQUID FLOW V.02'
  },
  'liquid-flow-v02': {
    title: 'LIQUID FLOW V.02',
    category: 'Personal Projects',
    year: '2023',
    role: 'Solo Creative / Motion Designer',
    tools: ['Cinema 4D', 'Octane', 'After Effects'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiQD-CMHSBgRr8Ca_Q-ZG98zs5y0pz0a3kHPuNkA1sKRoeYJZEGyeWvm0z7mtgWYkVzH6-sv_KLtmyQxHavx4zSEk1lRq0rXeAN8R4uU5O5rEk63Wq6_sjqqHq1vzLr3B02UZK7ga9n50hlqT7xqGaz2H8hcJ1Nueru3EsFnzLJsjKUz0GynpV3cUwDyMuie-eoweQ7R7x0vRPpYCNA_OC5Q1xWWxXwd7OwQUf_SxT2kKuLAM1bEHMZERl9TPEihZbrzGOWSwUyJw',
    videoUrl: undefined,
    posterUrl: undefined,
    challenge: 'An exploratory personal project studying fluid simulation at the intersection of organic motion and geometric precision. No brief, no deadline — pure craft.',
    process: [
      { title: 'Sim', icon: Box, desc: 'X-Particles fluid simulation with custom turbulence fields.' },
      { title: 'Light', icon: Zap, desc: 'HDRI-driven Octane lighting with caustic ray tracing enabled.' },
      { title: 'Post', icon: Layers, desc: 'Chromatic aberration and grain layered in post for warmth.' }
    ],
    results: 'Shared on social to 40K+ organic impressions. Led to two unsolicited client inquiries for similar aesthetic work.',
    nextId: 'the-analog-archive',
    nextTitle: 'THE ANALOG ARCHIVE'
  },
  'the-analog-archive': {
    title: 'THE ANALOG ARCHIVE',
    category: 'Documentary',
    year: '2022',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    heroImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMFnoyNTN8YiOk2ikgUxxu8TPUP-hmPFQm9enKNKy8aJFgAw5Hz3kJWZ4U2qIpTT1PUX-VahAMACy0W6ncFFiUkePnUpBZcgyTui98kdrqHNSswPevlCYu66NiVV1xhqV4Rh6toYm_JV2M8JxV1kGFzcHTlgcYmMahiGrDtkpLt0JtfIcHwM4tMps9LeUF3_XTxV64gPkK3UmrZBJMbM-HVZX2qlZqZtC1RvkI4S-ako8fGlA1WsnuFoVMG6qj4YOW6d-lsJNoXdw',
    videoUrl: undefined,
    posterUrl: undefined,
    challenge: 'Preserving the texture and warmth of analogue film while assembling a feature-length documentary from archival footage spanning five decades.',
    process: [
      { title: 'Archive', icon: Layers, desc: 'Digitised and catalogued 200+ hours of super-8 and 16mm footage.' },
      { title: 'Structure', icon: Film, desc: 'Three-act narrative structure built from interview transcripts.' },
      { title: 'Grade', icon: Monitor, desc: 'Film emulation grade preserving grain and gate weave artefacts.' }
    ],
    results: 'Premiered at a regional documentary festival. Now in distribution across three streaming platforms.',
    nextId: 'cyberpunk-neon-noir',
    nextTitle: 'CYBERPUNK NEON NOIR'
  }
};

const fallbackProject = allProjects['cyberpunk-neon-noir'];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = (id && allProjects[id]) ? allProjects[id] : fallbackProject;

  // Derive a Cloudinary auto-poster from the video URL if no custom poster is set
  const autoPoster = project.videoUrl
    ? project.videoUrl.replace('/video/upload/', '/video/upload/so_0,w_1280,q_auto/').replace(/\.(mp4|mov|webm)$/, '.jpg')
    : undefined;
  const poster = project.posterUrl ?? autoPoster ?? project.heroImg;

  return (
    <main className="shutter-entrance">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src={project.heroImg} 
            alt={project.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-8 md:pl-28 w-full max-w-7xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-xs mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" />
            Back to Framework
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-4"
          >
            {project.title}
          </motion.h1>
          <div className="flex flex-wrap gap-6 items-center">
            <span className="text-secondary font-headline font-bold uppercase tracking-[0.3em] text-sm">{project.category}</span>
            <div className="w-12 h-[1px] bg-outline-variant"></div>
            <span className="text-on-surface-variant font-body text-xs uppercase tracking-widest">{project.year}</span>
          </div>
        </div>
      </section>

      {/* Project Info Grid */}
      <section className="py-24 px-8 md:px-28 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center gap-6 p-6 bg-surface-low rounded-md border border-outline-variant/10">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                <AvatarPlaceholder />
              </div>
              <div>
                <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-1">Directed by</h3>
                <p className="text-lg font-headline font-bold text-white">Khalex</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-4">The Role</h3>
              <p className="text-xl font-headline font-bold text-white">{project.role}</p>
            </div>
            <div>
              <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-4">Technical Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tools.map(tool => (
                  <span key={tool} className="px-4 py-2 bg-surface-low border border-outline-variant/20 rounded-sm text-xs font-headline font-bold tracking-widest uppercase">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-6">The Challenge</h3>
            <p className="text-2xl md:text-3xl font-body text-on-surface-variant leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-20 bg-surface-low">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary slot — video player if videoUrl is set, otherwise static image */}
            <div className="rounded-md overflow-hidden aspect-video bg-black">
              {project.videoUrl ? (
                <CloudinaryVideo
                  src={project.videoUrl}
                  poster={poster}
                  title={project.title}
                  className="w-full h-full rounded-md"
                />
              ) : (
                <div className="relative w-full h-full group">
                  <img 
                    src={project.heroImg}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}
            </div>

            {/* Secondary slot — static image */}
            <div className="rounded-md overflow-hidden aspect-video bg-black">
              <img 
                src={project.heroImg}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                alt={project.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Creative Process Bento */}
      <section className="py-32 px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-4xl font-black mb-16 tracking-tight">The Creative <span className="text-secondary">Process</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.process.map((step) => (
              <div key={step.title} className="bg-surface-low p-10 rounded-md border-t-2 border-primary/20">
                <div className="text-primary mb-6">
                  <step.icon className="w-10 h-10" />
                </div>
                <h4 className="font-headline font-bold text-xl mb-4 uppercase tracking-widest">{step.title}</h4>
                <p className="text-on-surface-variant font-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-32 bg-surface-high">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-secondary mb-8">The Results</h3>
          <p className="text-3xl md:text-4xl font-headline font-bold text-white leading-tight mb-12 italic">
            "{project.results}"
          </p>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-20 border-t border-outline-variant/10">
        <Link to={`/projects/${project.nextId}`} className="group block text-center py-20 hover:bg-white/5 transition-colors">
          <span className="text-on-surface-variant font-headline text-sm uppercase tracking-[0.5em] mb-4 block">Next Artifact</span>
          <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter group-hover:text-primary transition-colors">{project.nextTitle}</h2>
        </Link>
      </section>
    </main>
  );
}
