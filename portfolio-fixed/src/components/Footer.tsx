import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const services = [
  'Motion Design', '·', 'Video Editing', '·',
  'Brand Films', '·', 'Social Content', '·',
  'Motion Graphics', '·', 'Visual Storytelling', '·',
];
const marqueeItems = [...services, ...services];

const socials = [
  { name: 'X / Twitter', href: 'https://x.com/khalex3_0' },
  { name: 'Telegram',    href: 'https://t.me/khalex3_0' },
  { name: 'Email',       href: 'mailto:khadisconkhadiscon@gmail.com' },
];

const navLinks = [
  { name: 'Work',    path: '/projects' },
  { name: 'About',   path: '/about'    },
  { name: 'Contact', path: '/contact'  },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-wire relative overflow-hidden">
      {/* Very subtle ambient particles behind footer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <ParticleCanvas intensity="low" />
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden py-3.5 border-b border-wire/60 relative z-10">
        <div className="marquee-track gap-5 flex">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className={
                item === '·'
                  ? 'text-hot text-xs'
                  : 'font-mono text-[10px] uppercase tracking-[0.3em] text-ash'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand block */}
          <div>
            <div className="font-display font-extrabold text-xl uppercase tracking-[0.28em] text-paper leading-none mb-2">
              Khalex
            </div>
            <div className="font-mono text-[10px] text-ash uppercase tracking-widest mb-5">
              Lagos, Nigeria · Available Globally
            </div>
            <p className="font-mono text-[10px] text-wire/80 leading-relaxed max-w-xs">
              Motion designer crafting cinematic brand films, VFX, and visual content that stops the scroll.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="font-mono text-[9px] text-ash uppercase tracking-widest mb-4">Navigation</div>
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  to={l.path}
                  className="font-display font-bold text-base uppercase tracking-tight text-paper/60 hover:text-hot transition-colors duration-200"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact block */}
          <div>
            <div className="font-mono text-[9px] text-ash uppercase tracking-widest mb-4">Get In Touch</div>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-ash hover:text-hot transition-colors duration-200"
                >
                  {s.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5">
              <div className="w-1.5 h-1.5 rounded-full bg-hot animate-pulse" />
              <span className="font-mono text-[9px] text-hot uppercase tracking-widest">Available for Projects</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ruled-top pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-wire">
            © 2026 Khalex — All rights reserved
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-wire/60">
            Built with motion, intent & obsession
          </span>
        </div>
      </div>
    </footer>
  );
}
