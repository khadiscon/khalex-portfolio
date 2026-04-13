import { motion } from 'motion/react';
import { Play, ArrowRight, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CloudinaryVideo from '../components/CloudinaryVideo';

// ─────────────────────────────────────────────────
// CLOUDINARY SETUP
// Replace YOUR_CLOUD_NAME with your Cloudinary cloud name.
// For each project that has a video, set videoUrl to the
// full Cloudinary video URL, e.g.:
//   'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4'
// Leave videoUrl as undefined for image-only projects.
// ─────────────────────────────────────────────────

const projects = [
  {
    id: 'cyberpunk-neon-noir',
    title: 'CYBERPUNK NEON NOIR',
    category: 'Commercials',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndl8J6tzbCZKz_8v9nPOoNkLKLeuLZdwbG7bGNfjdISmzTsxy9SzHGpyqpPSwF28rXenPs951C3jSXtjnGB6ySOSIleJRaE0GgUPY6qF5Ci5-IyNwNg6gsc-DVaBQHYUa54IFHrK-AqFrINZk9MSmsPVPoCqxfNcEpHPXQdoJcj7_lOQfJilp22ZB7NhfbwozDCM9GcPB7ctFd1gjUB34GrjkIoVtfwfjiHdI7JVomnlaqWQM5CEiMYBtS_4MehRE_RqZ6E6qTxg',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[21/9]'
  },
  {
    id: 'glitch-protocol',
    title: 'GLITCH PROTOCOL',
    category: 'Motion Graphics',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7OpRb1bi4w4uDLKdIMwo3u_KC2MUbFRgsWfxJEQ6_wlH8C4hJxsR0QGc2h-Niuy6DShyQxc-KdA0JWSPNtwrDF5ifFDT62RCImk82LSo6uXQoQwfcBccEfwUFnv6jOBuhG4D_9mF86xtQi0Wakist8VoYqVsqLUS7Wu1puL9Ja12KwNWQF-GQRa9KczwoOe0nyOyYa-bZFF880BFFEqsPFQxSOq4Fwvk8mURrzoTvLfiEt0agshZENh6aftTyOhK1Q5yMPLHjAl4',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-square'
  },
  {
    id: 'silent-echoes',
    title: 'SILENT ECHOES',
    category: 'Short Films',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFT-Rpvn62wPkETLJY0Tvz7flZHk213m-arbqEnJZtwIkAl6CTatUEINCGqgRsrSICi0bb2tnMwCBXCiUn1pei2RzRT7k0TDQTj4DR1BoAp_TalBBz9NwsExbI0Q8GsSbRAkdjPAMQwHo-k19t32p1_Vty7kxixZUs90IIyMr9WcoZDKZqpLeGMqsq4MqRmH0x2s4aQpSKfS2dg5jI_bLlavd0u4HATe9FZxGMU659gYkUSuT4SHi2sv-3D9Op0NlYrn94QVanczM',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'april-reel-2026',
    title: 'APRIL REEL 2026',
    category: 'Commercials',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABiz9NcrZXgg9QxhYO1ULDm-otBUviDw13sPM9-VPqMvoC0Dea93lk6KW8TBKtaC9Ysi2yuNP20jniqhChReIodFgU60ak6pMryH-ZbXd5RDYQiUg4PGGdpXpXwCszxxZATv-BYaLQYwC1GcEz1BOF4c7CVxKzzvNGReRqKx1aTFXFqAQxkgndg5y-CJD4razxFWV_Ha1lXzaEAnrrrh3BwHFXRT1zMs4ILYqPE9vrwx87dL_IFkTHc89xc-2VijmGAIcOshzWck0',
    videoUrl: 'https://res.cloudinary.com/dqbzoeysr/video/upload/3_April_2026_2_wanekk.mp4' as string | undefined,
    span: 'md:col-span-8',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'liquid-flow-v02',
    title: 'LIQUID FLOW V.02',
    category: 'Personal Projects',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiQD-CMHSBgRr8Ca_Q-ZG98zs5y0pz0a3kHPuNkA1sKRoeYJZEGyeWvm0z7mtgWYkVzH6-sv_KLtmyQxHavx4zSEk1lRq0rXeAN8R4uU5O5rEk63Wq6_sjqqHq1vzLr3B02UZK7ga9n50hlqT7xqGaz2H8hcJ1Nueru3EsFnzLJsjKUz0GynpV3cUwDyMuie-eoweQ7R7x0vRPpYCNA_OC5Q1xWWxXwd7OwQUf_SxT2kKuLAM1bEHMZERl9TPEihZbrzGOWSwUyJw',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video'
  },
  {
    id: 'the-analog-archive',
    title: 'THE ANALOG ARCHIVE',
    category: 'Short Films',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMFnoyNTN8YiOk2ikgUxxu8TPUP-hmPFQm9enKNKy8aJFgAw5Hz3kJWZ4U2qIpTT1PUX-VahAMACy0W6ncFFiUkePnUpBZcgyTui98kdrqHNSswPevlCYu66NiVV1xhqV4Rh6toYm_JV2M8JxV1kGFzcHTlgcYmMahiGrDtkpLt0JtfIcHwM4tMps9LeUF3_XTxV64gPkK3UmrZBJMbM-HVZX2qlZqZtC1RvkI4S-ako8fGlA1WsnuFoVMG6qj4YOW6d-lsJNoXdw',
    videoUrl: undefined as string | undefined,
    span: 'md:col-span-6',
    aspect: 'aspect-video'
  }
];

const filters = ['All Work', 'Motion Graphics', 'Commercials', 'Short Films', 'Personal Projects'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Work');

  const filtered = activeFilter === 'All Work'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="pt-32 pb-20 px-8 lg:pl-28 lg:pr-16 shutter-entrance">
      <header className="mb-16 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
        >
          CURATED<br/><span className="text-primary">FRAMEWORK</span>
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
        {filtered.map((project) => (
          project.videoUrl ? (
            // Video card — plays inline, no navigation
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
              <div className="absolute bottom-6 left-6 pointer-events-none">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">{project.category}</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
              </div>
              <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-1.5 bg-primary/90 text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-sm">
                <Film className="w-3 h-3" />
                Video
              </div>
            </div>
          ) : (
            // Image card — navigates to detail page
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
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">{project.category}</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-10 h-10 text-white fill-current" />
              </div>
            </Link>
          )
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 text-on-surface-variant font-headline text-xl uppercase tracking-widest">
          No projects in this category yet.
        </div>
      )}

      <div className="mt-20 flex justify-center">
        <button className="group flex items-center gap-4 text-on-surface-variant hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-[0.5em] font-bold">Discover More Works</span>
          <span className="w-12 h-[1px] bg-outline-variant group-hover:bg-primary transition-all duration-300"></span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
