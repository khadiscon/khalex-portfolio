import { Link } from 'react-router-dom';

function AvatarPlaceholder() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="32" height="32" fill="#1f1f21"/>
      <circle cx="16" cy="13" r="5.5" fill="#b89fff" opacity="0.8"/>
      <ellipse cx="16" cy="27" rx="9" ry="6" fill="#b89fff" opacity="0.5"/>
    </svg>
  );
}

const socials = [
  {
    name: 'Twitter / X',
    href: 'https://x.com/khalex3_0',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.734-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/khalex3_0',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  },
  {
    name: 'Gmail',
    href: 'mailto:khadisconkhadiscon@gmail.com',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.147C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-neutral-800/20 bg-neutral-950">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
            <AvatarPlaceholder />
          </div>
          <div className="text-lg font-bold text-white font-headline uppercase tracking-widest">
            Khalex
          </div>
        </div>
        
        <div className="flex gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={social.name}
              className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-neutral-500 hover:text-secondary transition-colors opacity-80 hover:opacity-100"
            >
              {social.icon}
              <span className="hidden sm:block">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="font-body text-xs uppercase tracking-widest text-neutral-500 text-center md:text-right">
          © 2025 Khalex. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
