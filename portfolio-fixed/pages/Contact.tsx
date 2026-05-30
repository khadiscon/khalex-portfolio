import { motion, useInView } from 'motion/react';
import { useState, useRef } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';

type Status = 'idle' | 'sending' | 'success' | 'error';

function RevealItem({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const info = [
  { label: 'Email',    value: 'khadisconkhadiscon@gmail.com', href: 'mailto:khadisconkhadiscon@gmail.com' },
  { label: 'Telegram', value: '@khalex3_0',                   href: 'https://t.me/khalex3_0' },
  { label: 'Twitter',  value: '@khalex3_0',                   href: 'https://x.com/khalex3_0' },
  { label: 'Based',    value: 'Lagos, Nigeria',               href: null },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', budget: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(v => ({ ...v, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full bg-transparent border-b border-wire focus:border-hot outline-none font-mono text-[10px] text-paper placeholder-ash py-3.5 transition-colors duration-200';

  return (
    <main className="pt-28 pb-24 min-h-screen page-enter relative overflow-x-hidden">
      <ParticleCanvas intensity="low" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-hot" />
            <span className="font-mono text-[10px] text-hot uppercase tracking-[0.35em]">Get In Touch</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Let's Build<br />
            <span className="text-hot italic">Something.</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Form */}
          <RevealItem className="lg:col-span-7">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-5 py-16"
              >
                <CheckCircle className="w-10 h-10 text-hot" />
                <h3 className="font-display font-bold text-3xl uppercase tracking-tighter text-paper">Message Sent.</h3>
                <p className="font-mono text-[10px] text-ash leading-relaxed max-w-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours. In the meantime, feel free to check out my latest work.
                </p>
                <button
                  onClick={() => { setForm({ name: '', email: '', budget: '', message: '' }); setStatus('idle'); }}
                  className="font-mono text-[10px] text-hot hover:text-paper uppercase tracking-widest transition-colors border-b border-hot/40 hover:border-paper/40 pb-0.5"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[9px] text-ash uppercase tracking-widest block mb-1">Name *</label>
                    <input
                      className={field}
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-ash uppercase tracking-widest block mb-1">Email *</label>
                    <input
                      className={field}
                      type="email"
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-ash uppercase tracking-widest block mb-1">Budget Range</label>
                  <select className={field} value={form.budget} onChange={set('budget')}>
                    <option value="" className="bg-ink">Select a range</option>
                    <option value="<500"     className="bg-ink">Under $500</option>
                    <option value="500-1500" className="bg-ink">$500 – $1,500</option>
                    <option value="1500-5k"  className="bg-ink">$1,500 – $5,000</option>
                    <option value="5k+"      className="bg-ink">$5,000+</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-ash uppercase tracking-widest block mb-1">Message *</label>
                  <textarea
                    className={`${field} resize-none min-h-[140px]`}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-[10px] text-hot/80">Something went wrong. Please try again or reach out directly via Telegram.</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className="group flex items-center gap-3 bg-hot text-ink px-10 py-5 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200 self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </RevealItem>

          {/* Contact Info */}
          <RevealItem className="lg:col-span-5" delay={0.1}>
            <div className="flex flex-col gap-0 ruled-top">
              {info.map((item, i) => (
                <RevealItem key={item.label} delay={0.1 + i * 0.07} className="py-6 ruled-bottom">
                  <div className="font-mono text-[9px] text-ash uppercase tracking-widest mb-1">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-display font-bold text-lg uppercase tracking-tight text-paper hover:text-hot transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-display font-bold text-lg uppercase tracking-tight text-paper">{item.value}</span>
                  )}
                </RevealItem>
              ))}

              {/* Availability badge */}
              <RevealItem delay={0.4} className="mt-8 p-6 bg-smoke border border-wire/40">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-hot animate-pulse" />
                  <span className="font-mono text-[9px] text-hot uppercase tracking-widest">Available for Projects</span>
                </div>
                <p className="font-mono text-[10px] text-ash leading-relaxed">
                  Currently accepting new clients for Q3 2025. Response time within 24 hours.
                </p>
              </RevealItem>
            </div>
          </RevealItem>
        </div>
      </div>
    </main>
  );
}
