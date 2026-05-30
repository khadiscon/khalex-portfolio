const services = [
  'Motion Design', '·', 'Video Editing', '·',
  'Brand Films', '·', 'Social Content', '·',
  'Motion Graphics', '·', 'Visual Storytelling', '·',
];
const marqueeItems = [...services, ...services];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-wire">
      {/* Scrolling ticker */}
      <div className="overflow-hidden py-3.5 border-b border-wire">
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

      {/* Main row */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand */}
          <div>
            <div className="font-display font-extrabold text-base uppercase tracking-[0.3em] text-paper leading-none">
              Khalex
            </div>
            <div className="font-mono text-[10px] text-ash uppercase tracking-widest mt-1">
              Lagos, Nigeria · Available Globally
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 md:gap-8">
            {[
              { name: 'X / Twitter', href: 'https://x.com/khalex3_0' },
              { name: 'Telegram',    href: 'https://t.me/khalex3_0' },
              { name: 'Email',       href: 'mailto:khadisconkhadiscon@gmail.com' },
            ].map((s) => (
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

          {/* Copyright */}
          <div className="font-mono text-[10px] uppercase tracking-widest text-wire">
            © 2026 Khalex
          </div>
        </div>
      </div>
    </footer>
  );
}
