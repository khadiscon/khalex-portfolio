import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CloudinaryVideo from '../components/CloudinaryVideo';

export default function Home() {
  return (
    <div className="shutter-entrance">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwX6lPeUsaP66Zt02sw9P8DXqW9NgCoQlwY50cpYGSXwcQAd9bw2cbY7p14c8gmZNPD4oQaTwOLvLutixxA3WzC01YGkBRBbO13-21cvK_oGdvwc6sSgIkJfkmBFk0TN6LCfiCQ0rrIRlqj9PpoNXh_BfXZaBAb7w0QaJUCnhYDCjO4XTYkRCD8qGFMzS32AMo1m0tTFzMN56gjiss-o6oBRwBOCyzXAO-FdqKV5IdnmJcL52qwDlyghOqMrjnL5L7rSVz33y9gws" 
            alt="Cinematic motion graphics workspace"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 cinematic-gradient z-20"></div>
        </div>
        
        <div className="relative z-30 px-8 md:pl-28 w-full max-w-7xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-headline text-secondary tracking-[0.3em] uppercase mb-4 text-sm font-bold"
          >
            Showreel 2025
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-4xl"
          >
            Crafting <span className="text-primary">Motion.</span><br/>Building Worlds.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <Link to="/projects" className="bg-primary text-black px-10 py-4 rounded-sm font-bold text-lg flex items-center gap-3 transition-all hover:shadow-[0_0_20px_#b89fff]">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all">
                <Play className="w-6 h-6 text-white group-hover:text-black fill-current" />
              </div>
              <span className="font-headline font-bold uppercase tracking-widest text-sm">Play Showreel</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="bg-background py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="font-headline text-5xl font-black tracking-tight">Featured <span className="text-secondary">Artifacts</span></h2>
            <p className="font-body text-on-surface-variant max-w-md leading-relaxed">
              A curated selection of motion work and visual stories built for brands, creators, and campaigns that demand attention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Feature */}
            <Link to="/projects/neon-fragments" className="md:col-span-8 group relative overflow-hidden rounded-md bg-surface-low aspect-video">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-emaU8krLKDNQY22di4ALZXJSVJONsmj_xXSIEjuoZlod7hRZr_hLy9GCS4o6yfFV9oAes4Pwhp0DUjS1SwMXnDrAwXZDvRq6v_I8SXE2snotIjnCnC4kHs6GYCCdzEmjQ5v5zbompuljKH_DRkIzMvOK3qC2KoGlTIk3jz11vF3LBDT5BsACaWYV10d4iU3ws2nhdWa26OxTdCerKn6uENp-AFB0jK0WbjyCWdb-gy8IkveMBHgR77H1ySlObvxCJ8LyPQLqQwg" 
                alt="Neon Fluidity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <span className="text-secondary font-headline text-sm font-bold tracking-widest uppercase mb-2">3D Motion / Branding</span>
                <h3 className="text-3xl font-headline font-black mb-4">NEON FLUIDITY</h3>
                <div className="flex gap-4">
                  <span className="text-xs font-body uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">Cinema 4D</span>
                  <span className="text-xs font-body uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">Octane</span>
                </div>
              </div>
            </Link>

            {/* Side Info */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-surface-high p-8 flex-1 rounded-md border-l-2 border-primary/30">
                <div className="text-primary mb-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-headline font-bold text-xl mb-2 uppercase">Directed Intent</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Every frame is intentional. I build visual experiences that stop the scroll and leave a lasting impression.</p>
              </div>
              <div className="bg-surface-low p-8 flex-1 rounded-md relative overflow-hidden">
                <h4 className="font-headline font-bold text-xl mb-2 uppercase">Work Process</h4>
                <ul className="text-sm font-body space-y-3 text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Concept & Strategy</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Motion Production</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Distribution & Growth</li>
                </ul>
              </div>
            </div>

            {/* Small Tiles */}
            {[
              { title: 'FUI DESIGN', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUPVSwyLRqSxbldYBaE02SKja_SY0zwcAphw9PIIT7DUo1XXOEc9zMfznkqC3GAl6CoUQIOus--ew1E9bUqXbcwfPGTiVgpCRYug1NXKONlD_-7yGQIbNJAiwFeV1rMMk_cUifna25ZH3VHtFQfILVCJR5ORvltfaVIORcSxHYKs5sgBJqtfK9sBG2Wg4qPi7xzXGMkFJUBDsb91vJvJjN9_E4FizDFtDXPMujOcNs3weq4HSf7ztj7a7vzMohY26frYCptZfHusA' },
              { title: 'GLITCH FX', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL-BR8Hw-hVj11J7fkRcUxCB_92m725uTMb6Mk-uVeDekTs7ic_lYeBHDPIt0yA19OlVyrBH-ju9eX0IysiCxVwJLwga5IFEY21OzrGNM-EYY12BbzyekKGmMdk4cBRDyUZHxLNWlwZSxiVQHKRRaH2tLtYXXhIbcgN6CRRPPV-xYXZUn2wO7y4SCwNGRtdpJW8Dh4XHojPpGUQh45Ow4mwMUrkNbBba7U6Gob9rPPEY8yBL9Ziohmw4AmY2rSTYV9qpJ09hslo8Q' },
              { title: 'MINIMAL MOTION', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAspBMvPGId9VvcHVPsIu-SSo5NtGlUvfNJdSNdEt3wS8qTLBEDgzErId5qWMRknNX0cq4EReJ6C8qugBhh5sfn-uGMUGOxAacYDz9cVS6Ex3uizqZAvtR5bOb4PzkGRcpf1JBq6LukLkxvraeJnUN4SiLNf4iEbUg9HZiN9m2mv6yK7pQ6en-TQ1fphTLzyOrc_gxwd7O1ery-sRJrIhfW-72k4QWKfjp0V3WA0RR6j_t90snVwpZpw5dXkTnIFA4BwflYIjoMCyE' }
            ].map((tile) => (
              <div key={tile.title} className="md:col-span-4 group relative overflow-hidden rounded-md bg-surface-low aspect-square">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={tile.img} 
                  alt={tile.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-headline font-bold border border-white/30 px-4 py-2 backdrop-blur-sm">{tile.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reel Section */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="bg-surface-highest p-4 rounded-xl shadow-2xl overflow-hidden">
            <CloudinaryVideo
              src="https://res.cloudinary.com/dqbzoeysr/video/upload/4_5996771426168741059_zbkrqy.mp4"
              title="Showreel 2025"
              autoPlay
              loop
              className="aspect-video rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute -left-20 top-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-8 text-center relative z-10">
          <h2 className="font-headline text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Ready to <span className="text-secondary">Stand Out?</span></h2>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
            Whether you need a cinematic brand film, motion graphics, or a full video campaign — let's build something people can't ignore.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-primary text-black px-12 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:shadow-[0_0_30px_#b89fff] transition-all">Start a Project</Link>
            <button className="border border-outline-variant/30 px-12 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-white/5 transition-colors">Download Resume</button>
          </div>
        </div>
      </section>
    </div>
  );
}
