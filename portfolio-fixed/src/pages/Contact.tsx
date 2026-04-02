import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';

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

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
const PROJECT_TYPES = ['Motion Design', 'Video Editing', 'Commercial', 'Other'] as const;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const payload = {
      from_name: data.get('from_name') as string,
      from_email: data.get('from_email') as string,
      project_type: selectedType,
      message: data.get('message') as string,
    };

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Send failed');

      setStatus('success');
      formRef.current.reset();
      setSelectedType('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isSending = status === 'sending';

  return (
    <main className="pt-32 pb-20 px-8 md:px-20 max-w-7xl mx-auto shutter-entrance">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        <div className="lg:col-span-5 space-y-12">
          <header>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-white"
            >
              Let's Sync <span className="text-primary">Frames.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg max-w-md leading-relaxed"
            >
              Available for global projects. Specializing in high-end motion graphics, cinematic editing, and visual storytelling.
            </motion.p>
          </header>

          <div className="space-y-8">
            <div>
              <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-4">Direct Contact</h3>
              <a
                href="mailto:khadisconkhadiscon@gmail.com"
                className="text-2xl md:text-3xl font-headline font-medium hover:text-secondary transition-colors duration-300 break-all"
              >
                khadisconkhadiscon@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-primary mb-4">Follow the Feed</h3>
              <div className="flex flex-wrap gap-8">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-on-surface-variant hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {social.icon}
                    <span className="font-headline font-bold uppercase tracking-widest text-xs group-hover:tracking-[0.2em] transition-all">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block pt-12">
            <div className="w-full aspect-video bg-surface-low rounded-md overflow-hidden relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIfO5MF-f4TQSrTfVkuqTJ0_T5rZXjVhsaFXLQ-MALYBqCfzHyfxLk0n-pxyQQNBQ5pPO4zmR7evSs8meAELROZPh66Z6rA9JqOST1Sb5CEZj2cnotd6UzMdsR8iyVhLrrzsO9HBEylpjUPx0-2LvO5M5hIr_H3dbJ8QrXc_znFeGMF0mgXfHz3XsPQOLslNzDRiWH_d1Wj7euUy1DZ6yF2_POpM4vR2JWrSHMHyuDzI7M1PpIu62bx8UBBkX8MRNUYW1uvS90T5Q"
                alt="Contact visuals"
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 bg-surface-low p-8 md:p-12 rounded-md shadow-2xl"
        >
          <AnimatePresence>
            {(status === 'success' || status === 'error') && (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-3 mb-8 p-4 rounded-sm border text-sm font-headline font-bold uppercase tracking-widest ${
                  status === 'success'
                    ? 'border-green-500/40 bg-green-500/10 text-green-400'
                    : 'border-red-500/40 bg-red-500/10 text-red-400'
                }`}
              >
                {status === 'success'
                  ? <><CheckCircle className="w-5 h-5 shrink-0" /> Transmission received. I'll sync back shortly.</>
                  : <><XCircle className="w-5 h-5 shrink-0" /> Send failed. Try the direct email link instead.</>
                }
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-secondary transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="John Doe"
                  disabled={isSending}
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-white focus:ring-0 focus:border-secondary transition-all placeholder:text-neutral-700 disabled:opacity-40"
                />
              </div>
              <div className="relative group">
                <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-secondary transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="john@example.com"
                  disabled={isSending}
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-white focus:ring-0 focus:border-secondary transition-all placeholder:text-neutral-700 disabled:opacity-40"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-4 block">
                Project Type
              </label>
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    disabled={isSending}
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2 rounded-full border text-xs font-headline font-bold uppercase tracking-widest transition-all disabled:opacity-40 ${
                      selectedType === type
                        ? 'bg-secondary text-black border-secondary'
                        : 'border-outline-variant/30 hover:border-secondary/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-secondary transition-colors">
                Project Brief
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell me about your vision, timeline, and goals..."
                disabled={isSending}
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-white focus:ring-0 focus:border-secondary transition-all placeholder:text-neutral-700 resize-none disabled:opacity-40"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSending}
                className="group flex items-center gap-4 bg-primary text-black px-10 py-5 rounded-sm font-headline font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(184,159,255,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Transmission
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
