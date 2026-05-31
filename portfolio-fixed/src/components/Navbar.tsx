import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const location  = useLocation();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [lastY,    setLastY]      = useState(0);
  const [hidden,   setHidden]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide navbar on scroll-down, show on scroll-up
      if (y > lastY && y > 120) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Work',    path: '/projects' },
    { name: 'About',   path: '/about'    },
    { name: 'Contact', path: '/contact'  },
  ];

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-ink/90 backdrop-blur-md border-b border-wire/60'
            : 'bg-transparent'
        )}
      >
        <div className="flex justify-between items-center px-6 md:px-10 h-16 max-w-[1600px] mx-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-paper/20 group-hover:border-hot transition-colors duration-200 flex-shrink-0">
              <img src="/assets/pfp.png" alt="Khalex" className="w-full h-full object-cover object-top" />
              {/* Hot ring on hover */}
              <div className="absolute inset-0 rounded-full border-2 border-hot scale-0 group-hover:scale-100 transition-transform duration-200 opacity-60" />
            </div>
            <span className="font-display font-extrabold text-sm tracking-[0.28em] uppercase text-paper group-hover:text-hot transition-colors duration-200">
              Khalex
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 py-1',
                  location.pathname === link.path
                    ? 'text-hot'
                    : 'text-ash hover:text-paper'
                )}
              >
                <span className="text-wire/60 mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-hot"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://t.me/khalex3_0?text=Hi%20Khalex%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center border border-wire/80 hover:border-hot text-ash hover:text-hot px-5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-end gap-1.5 p-1 w-8 h-8"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={cn('h-px bg-paper transition-all duration-300 origin-right', menuOpen ? 'w-5 rotate-[-45deg] translate-y-[5px]' : 'w-5')} />
              <span className={cn('h-px bg-paper transition-all duration-300', menuOpen ? 'w-0 opacity-0' : 'w-3 opacity-100')} />
              <span className={cn('h-px bg-paper transition-all duration-300 origin-right', menuOpen ? 'w-5 rotate-[45deg] -translate-y-[5px]' : 'w-5')} />
            </button>
          </div>
        </div>

        {/* Progress bar at top */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-wire/40">
            <div className="h-full w-0 bg-hot" id="scroll-progress" />
          </div>
        )}
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col pt-16 md:hidden overflow-hidden"
          >
            {/* Particles behind mobile menu */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              {/* Inline minimal dots */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-px bg-hot rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.1,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col px-8 py-14 gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group flex items-center gap-4 py-4 ruled-bottom last:border-0"
                >
                  <span className="font-mono text-xs text-wire tracking-widest w-6">{String(i + 1).padStart(2, '0')}</span>
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className={cn(
                      'font-display font-extrabold text-4xl uppercase tracking-tighter transition-colors',
                      location.pathname === link.path ? 'text-hot' : 'text-paper/80 group-hover:text-hot'
                    )}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              <motion.a
                href="https://t.me/khalex3_0"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="mt-10 self-start bg-hot text-ink px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-paper transition-colors"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
