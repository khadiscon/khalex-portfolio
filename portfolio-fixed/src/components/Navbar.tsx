import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

function AvatarPlaceholder() {
  return (
    <img
      src="/assets/pfp.png"
      alt="Khalex"
      className="w-full h-full object-cover object-top"
    />
  );
}

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Reels', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-nav shadow-[0_0_15px_rgba(184,159,255,0.1)] transition-colors duration-300">
        <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
          <Link to="/" className="flex items-center gap-4 group" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary transition-colors">
              <AvatarPlaceholder />
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase font-headline hidden sm:block">
              Khalex
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "font-headline font-bold tracking-tighter transition-colors",
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://t.me/khalex3_0?text=Hi%20Khalex%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black px-6 py-2 rounded-sm font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_15px_#b89fff] transition-all duration-300 active:scale-95"
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 w-full z-40 bg-black/95 border-b border-primary/20 md:hidden"
          >
            <div className="flex flex-col px-8 py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "font-headline font-black text-2xl uppercase tracking-widest transition-colors",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
