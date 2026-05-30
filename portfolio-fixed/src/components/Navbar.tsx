import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Work',    path: '/projects' },
    { name: 'About',   path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-ink/95 backdrop-blur-md border-b border-wire'
            : 'bg-transparent'
        )}
      >
        <div className="flex justify-between items-center px-6 md:px-10 h-16 max-w-[1600px] mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-paper/20 group-hover:border-hot transition-colors duration-200 flex-shrink-0">
              <img src="/assets/pfp.png" alt="Khalex" className="w-full h-full object-cover object-top" />
            </div>
            <span className="font-display font-extrabold text-sm tracking-[0.28em] uppercase text-paper">
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
                  'relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200',
                  location.pathname === link.path
                    ? 'text-hot'
                    : 'text-ash hover:text-paper'
                )}
              >
                <span className="text-wire mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-hot"
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
              className="hidden md:flex items-center border border-wire hover:border-hot text-ash hover:text-hot px-5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-end gap-1.5 p-1 w-8 h-8"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={cn('h-px bg-paper transition-all duration-300 origin-right', menuOpen ? 'w-5 rotate-[-45deg] translate-y-[5px]' : 'w-5')} />
              <span className={cn('h-px bg-paper transition-all duration-300', menuOpen ? 'w-0 opacity-0' : 'w-3 opacity-100')} />
              <span className={cn('h-px bg-paper transition-all duration-300 origin-right', menuOpen ? 'w-5 rotate-[45deg] -translate-y-[5px]' : 'w-5')} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col pt-16 md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-8 py-14 gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group flex items-center gap-4 py-4 ruled-bottom last:border-0"
                >
                  <span className="font-mono text-xs text-wire tracking-widest w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn(
                    'font-display font-extrabold text-4xl uppercase tracking-tighter transition-colors',
                    location.pathname === link.path ? 'text-hot' : 'text-paper/80 group-hover:text-hot'
                  )}>
                    {link.name}
                  </span>
                </Link>
              ))}
              <a
                href="https://t.me/khalex3_0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 self-start bg-hot text-ink px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-paper transition-colors"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
